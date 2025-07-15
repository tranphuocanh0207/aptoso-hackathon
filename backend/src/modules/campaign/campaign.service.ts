import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import {
  Campaign,
  CampaignParticipation,
  CampaignStatus,
} from './entities/campaign.entity';

import {
  aptToRaw,
  decryptPrivateKey,
  extractUsernameFromXUrl,
  generateId,
} from 'src/utils/helper';
import {
  CampaignResponseDto,
  CampaignsListResponseDto,
} from './dto/response/campaign-response.dto';
import { CreateCampaignDto } from './dto/request/create-campaign.dto';
import {
  RequestCampaignParticipationQuery,
  RequestCampaignQuery,
} from './dto/request/query-campaign.dto';
import {
  UpdateCampaignDto,
  UpdateCampaignParticipationDto,
} from './dto/request/update-campaign.dto';
import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import { UserModule } from '../user/route.module';
import { User } from '../user/entities/user.entity';

const config = new AptosConfig({
  network: Network.MAINNET,
});
const aptos = new Aptos(config);

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: MongoRepository<Campaign>,

    @InjectRepository(CampaignParticipation)
    private participationRepo: MongoRepository<CampaignParticipation>,

    @InjectRepository(User)
    private userRepo: MongoRepository<User>,
  ) {}

  async createCampaign(
    userId: string,
    request: CreateCampaignDto,
  ): Promise<CampaignResponseDto> {
    const campaignId = generateId();
    const campaign = await this.campaignRepo.create({
      ...request,
      campaignId,
      status: CampaignStatus.PENDING,
      createdByUserId: userId,
    });
    await this.campaignRepo.save(campaign);
    const { _id, ...data } = campaign;
    return data;
  }

  async countDocuments(): Promise<number> {
    const count = await this.campaignRepo.count();
    return count;
  }

  async getCampaigns(
    query: RequestCampaignQuery,
  ): Promise<CampaignsListResponseDto> {
    const skip = query.page * query.limit;
    // query conditions
    const whereConditions: any = {};

    if (query.status) {
      whereConditions.status = query.status;
    }

    if (query.type) {
      whereConditions.type = query.type;
    }

    const aggregationPipeline = [
      {
        $match: whereConditions,
      },
      {
        $project: {
          _id: 0,
          password: 0,
        },
      },
      { $skip: skip > 0 ? skip : 0 },
      { $limit: query.limit },
    ];

    const [campaigns, totalCount, campaignsOverview] = await Promise.all([
      this.campaignRepo.aggregate(aggregationPipeline).toArray(),
      this.countDocuments(),
      this.campaignRepo.find(),
    ]);

    const totalPages = Math.ceil(totalCount / query.limit);

    const totalCampaign = campaignsOverview.length;
    const totalReward = campaignsOverview.reduce(
      (sum, c) => sum + (c.totalTokenReward || 0),
      0,
    );
    const totalUserJoined = campaignsOverview.reduce(
      (sum, c) => sum + (c.totalJoined || 0),
      0,
    );

    return {
      campaigns: campaigns,
      overview: {
        totalCampaign,
        totalReward,
        totalUserJoined,
      },
      page: query.page,
      pageSize: campaigns.length,
      totalPages: totalPages,
      totalItems: totalCount,
    };
  }

  async updateCampaign(id: string, dto: UpdateCampaignDto): Promise<Campaign> {
    const campaign = await this.campaignRepo.findOneBy({ id });
    if (!campaign) throw new NotFoundException('Campaign not found');

    Object.assign(campaign, dto);
    return this.campaignRepo.save(campaign);
  }

  async updateParticipation(
    userId: string,
    request: UpdateCampaignParticipationDto,
  ) {
    const campaign = await this.campaignRepo.findOneBy({
      campaignId: request.campaignId,
    });
    if (!campaign) throw new NotFoundException('Campaign not found');

    let participation = await this.participationRepo.findOneBy({
      userId,
      campaignId: request.campaignId,
    });
    if (!participation) {
      participation = this.participationRepo.create({
        userId,
        campaignId: request.campaignId,
        completedAction: request?.completedAction || [],
        completedAt: request?.completedAt,
        reward: request?.reward,
        isClaimed: request?.isClaimed || false,
        txHash: request?.txHash,
      });
      campaign.totalJoined += 1;
      await this.campaignRepo.save(campaign);
    } else {
      // update participation
      participation.completedAction =
        request.completedAction ?? participation.completedAction;
      participation.completedAt =
        request.completedAt ?? participation.completedAt;
      participation.reward = request.reward ?? participation.reward;
      participation.isClaimed = request.isClaimed ?? participation.isClaimed;
      participation.txHash = request.txHash ?? participation.txHash;
    }

    if (participation.completedAt) {
      // Update campaign
      campaign.totalCompleted += 1;
      campaign.totalTokenDistributed += campaign.rewardPerUser;
      await this.campaignRepo.save(campaign);
    }

    await this.participationRepo.save(participation);

    const { _id, ...returnData } = participation;
    return returnData;
  }

  async getCampaignParticipationByCampaignId(
    userId: string,
    campaignId: string,
  ): Promise<any> {
    try {
      const campaign = await this.campaignRepo.findOneBy({
        campaignId: campaignId,
      });
      if (!campaign) throw new NotFoundException('Campaign not found');

      let participation = await this.participationRepo.findOneBy({
        userId,
        campaignId: campaignId,
      });

      return {
        campaignId,
        title: campaign.title,
        description: campaign.description,
        status: campaign.status,
        type: campaign.type,
        actions: campaign.actions,
        keywords: campaign.keywords,
        commentText: campaign.commentText,
        userActions: participation?.completedAction || [],
        userClaimed: participation?.isClaimed || false,
        userCompletedAt: participation?.completedAt || null,
        rewardPerUser: campaign.rewardPerUser,
        maxParticipants: campaign.maxParticipants,
        totalTokenReward: campaign.totalTokenReward,
        userJoined: campaign.totalJoined,
        rewardLeft:
          campaign.totalTokenReward -
          campaign.totalJoined * campaign.rewardPerUser,
      };
    } catch (err) {
      console.log('err:', err);
      throw new InternalServerErrorException('Error while fetching campaigns');
    }
  }

  async getAllCampaignParticipation(userId: string, status): Promise<any> {
    try {
      let whereConditions = {};
      if (status) whereConditions = { status };
      const campaigns = await this.campaignRepo.find({
        where: whereConditions,
      });

      const [participations, campaignsOverview] = await Promise.all([
        this.participationRepo.find({
          where: { userId },
        }),
        this.campaignRepo.find(),
      ]);

      const participationMap = new Map(
        participations.map((p) => [p.campaignId, p]),
      );

      const rs = campaigns.map((campaign) => {
        const participation = participationMap.get(campaign.campaignId);
        return {
          campaignId: campaign.campaignId,
          title: campaign.title,
          description: campaign.description,
          link: campaign.link,
          userName: extractUsernameFromXUrl(campaign.link),
          type: campaign.type,
          keywords: campaign.keywords,
          commentText: campaign.commentText,
          status: campaign.status,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          actions: campaign.actions,
          userActions: participation?.completedAction || [],
          userClaimed: participation?.isClaimed || false,
          userCompletedAt: participation?.completedAt || null,
          rewardPerUser: campaign.rewardPerUser,
          maxParticipants: campaign.maxParticipants,
          totalTokenReward: campaign.totalTokenReward,
          userJoined: campaign.totalJoined,
          rewardLeft:
            campaign.totalTokenReward -
            campaign.totalJoined * campaign.rewardPerUser,
        };
      });

      const totalCampaign = campaignsOverview.length;
      const totalReward = campaignsOverview.reduce(
        (sum, c) => sum + (c.totalTokenReward || 0),
        0,
      );
      const totalUserJoined = campaignsOverview.reduce(
        (sum, c) => sum + (c.totalJoined || 0),
        0,
      );
      return {
        campaigns: rs,
        overview: {
          totalCampaign,
          totalReward,
          totalUserJoined,
        },
      };
    } catch (err) {
      console.log('err:', err);
      throw new InternalServerErrorException('Error while fetching campaigns');
    }
  }

  async getCampaignParticipation(query: RequestCampaignParticipationQuery) {
    const skip = query.page * query.limit;
    // query conditions
    const whereConditions: any = {};

    if (query.userId) {
      whereConditions.userId = query.userId;
    }

    if (query.campaignId) {
      whereConditions.campaignId = query.campaignId;
    }

    if (query.isClaimed) {
      whereConditions.isClaimed = query.isClaimed;
    }

    const aggregationPipeline = [
      {
        $match: whereConditions,
      },
      {
        $project: {
          _id: 0,
          password: 0,
        },
      },
      { $skip: skip > 0 ? skip : 0 },
      { $limit: query.limit },
    ];

    const [participation, totalCount] = await Promise.all([
      this.participationRepo.aggregate(aggregationPipeline).toArray(),
      this.campaignRepo.count(),
    ]);

    const totalPages = Math.ceil(totalCount / query.limit);
    return {
      participation: participation,
      page: query.page,
      pageSize: participation.length,
      totalPages: totalPages,
      totalItems: totalCount,
    };
  }

  async depositReward(userId: string, campaignId: string) {
    try {
      console.log({ userId, campaignId });
      const [user, campaign] = await Promise.all([
        this.userRepo.findOne({
          where: {
            userId: userId,
          },
        }),
        this.campaignRepo.findOneBy({
          campaignId: campaignId,
        }),
      ]);
      if (!campaign) throw new NotFoundException('Not found campaign');
      if (campaign?.createdByUserId != userId)
        throw new BadRequestException('Not the campaign owner');
      if (campaign?.depositReward)
        throw new BadRequestException('The campaign has deposited');

      const aptBalance = await aptos.getAccountAPTAmount({
        accountAddress: user?.wallet?.address,
      });
      let tokenBalance = aptBalance,
        decimals = 8;

      if (campaign.tokenRewardAddress != '0x1::aptos_coin::AptosCoin') {
        const fungibleAssetBalances =
          await aptos.getCurrentFungibleAssetBalances({
            options: {
              where: {
                owner_address: { _eq: user?.wallet?.address.toString() },
                asset_type: { _eq: campaign.tokenRewardAddress.toString() },
              },
            },
          });
        tokenBalance = fungibleAssetBalances[0]?.amount ?? 0;
        const metadata = await aptos.getFungibleAssetMetadata({
          options: {
            where: {
              asset_type: { _eq: campaign.tokenRewardAddress.toString() },
            },
          },
        });
        decimals = metadata?.[0].decimals;
      }
      // const rawRewardAmount = aptToRaw(campaign.totalTokenReward, decimals);
      const rawRewardAmount = 2;
      if (tokenBalance < rawRewardAmount)
        throw new BadRequestException('Not enough balance token to deposit');

      const privateKeyBytes = new Ed25519PrivateKey(
        decryptPrivateKey(user?.wallet?.privateKey),
      );
      const account = Account.fromPrivateKey({ privateKey: privateKeyBytes });
      let txn: SimpleTransaction;
      const adminWallet =
        (process.env.ADMIN_WALLET as string) ||
        '0xe0a8e5c931d1728ad7fb3659b9bc817f916845c0cb2ee18d25739626e5403be1';
      if (campaign.tokenRewardAddress == '0x1::aptos_coin::AptosCoin') {
        txn = await aptos.transaction.build.simple({
          sender: account.accountAddress,
          data: {
            function: '0x1::aptos_account::transfer_coins',
            typeArguments: [campaign.tokenRewardAddress],
            functionArguments: [adminWallet, rawRewardAmount],
          },
          options: {
            gasUnitPrice: 100,
            maxGasAmount: 10000,
          },
        });
      } else {
        txn = await aptos.transferFungibleAsset({
          sender: account,
          fungibleAssetMetadataAddress: campaign.tokenRewardAddress,
          recipient: adminWallet,
          amount: rawRewardAmount,
          options: {
            gasUnitPrice: 100,
            maxGasAmount: 10000,
          },
        });
      }
      const pending = await aptos.signAndSubmitTransaction({
        signer: account,
        transaction: txn,
      });

      await aptos.waitForTransaction({ transactionHash: pending.hash });

      campaign.depositReward = true;
      await this.campaignRepo.save(campaign);

      return { transactionHash: pending.hash };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error?.message);
    }
  }

  async claimReward(userId: string, campaignId: string) {
    try {
      const [user, campaign] = await Promise.all([
        this.userRepo.findOne({
          where: {
            userId: userId,
          },
        }),
        this.campaignRepo.findOneBy({
          campaignId: campaignId,
        }),
      ]);
      if (!campaign) throw new NotFoundException('Campaign not found');

      let participation = await this.participationRepo.findOneBy({
        userId,
        campaignId: campaignId,
      });

      if (!participation)
        throw new NotFoundException('Participation not found');
      if (!participation.completedAt)
        throw new BadRequestException('Participation is not yet complete');
      if (participation.isClaimed)
        throw new BadRequestException('Participation is claimed');
      const adminWallet = process.env.ADMIN_WALLET as string;
      const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY as string;

      const aptBalance = await aptos.getAccountAPTAmount({
        accountAddress: adminWallet,
      });
      let tokenBalance = aptBalance,
        decimals = 8;

      if (campaign.tokenRewardAddress != '0x1::aptos_coin::AptosCoin') {
        const fungibleAssetBalances =
          await aptos.getCurrentFungibleAssetBalances({
            options: {
              where: {
                owner_address: { _eq: adminWallet.toString() },
                asset_type: { _eq: campaign.tokenRewardAddress.toString() },
              },
            },
          });
        tokenBalance = fungibleAssetBalances[0]?.amount ?? 0;
        const metadata = await aptos.getFungibleAssetMetadata({
          options: {
            where: {
              asset_type: { _eq: campaign.tokenRewardAddress.toString() },
            },
          },
        });
        decimals = metadata?.[0].decimals;
      }

      // const rawRewardAmount = aptToRaw(campaign.totalTokenReward, decimals);
      const rawRewardAmount = 1;
      if (tokenBalance < rawRewardAmount)
        throw new BadRequestException('Not enough balance token to claimed');

      const privateKeyBytes = new Ed25519PrivateKey(adminPrivateKey);
      const account = Account.fromPrivateKey({ privateKey: privateKeyBytes });
      let txn: SimpleTransaction;
      const userAddress = user?.wallet?.address;

      if (campaign.tokenRewardAddress == '0x1::aptos_coin::AptosCoin') {
        txn = await aptos.transaction.build.simple({
          sender: account.accountAddress,
          data: {
            function: '0x1::aptos_account::transfer_coins',
            typeArguments: [campaign.tokenRewardAddress],
            functionArguments: [userAddress, rawRewardAmount],
          },
          options: {
            gasUnitPrice: 100,
            maxGasAmount: 10000,
          },
        });
      } else {
        txn = await aptos.transferFungibleAsset({
          sender: account,
          fungibleAssetMetadataAddress: campaign.tokenRewardAddress,
          recipient: userAddress,
          amount: rawRewardAmount,
          options: {
            gasUnitPrice: 100,
            maxGasAmount: 10000,
          },
        });
      }
      const pending = await aptos.signAndSubmitTransaction({
        signer: account,
        transaction: txn,
      });

      await aptos.waitForTransaction({ transactionHash: pending.hash });

      participation.isClaimed = true;
      await this.participationRepo.save(participation);
      campaign.totalCompleted++;
      campaign.totalTokenDistributed += Number(participation.reward);
      await this.campaignRepo.save(campaign);

      return { transactionHash: pending.hash, reward: participation.reward };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error?.message);
    }
  }
}
