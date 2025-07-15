import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import {
  decryptPrivateKey,
  encryptPrivateKey,
  generateId,
} from 'src/utils/helper';
import { ErrorsCodes, ErrorsMap } from '@common/constants/respond-errors';
import {
  CreateUserByAdminDto,
  CreateUserDto,
  CreateUserWithTwitterDto,
} from './dto/request/create-user.dto';
import {
  InternalUserResponseDto,
  LoginUserResponseDto,
  TransferTokenDto,
  TransferTokenResponseDto,
  UserListResponseDto,
  UserResponseDto,
} from './dto/response/user-response.dto';
import { RequestUserQuery } from './dto/request/query-user.dto';
import { Role } from '@common/constants/enum';
import { User, Wallet } from './entities/user.entity';
import {
  Account,
  AccountAddress,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import {
  TokenBalanceResponseDto,
  TokenBalancesResponseDto,
} from './dto/response/user-response.dto';

const config = new AptosConfig({
  network: Network.MAINNET,
});
const aptos = new Aptos(config);

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User) private userRep: MongoRepository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  async countDocuments(): Promise<number> {
    const count = await this.userRep.count();
    return count;
  }

  async findAll() {
    const user = await this.userRep.find();
    return user;
  }

  async findAllUsers(query: RequestUserQuery): Promise<UserListResponseDto> {
    const skip = query.page * query.limit;
    // query conditions
    const whereConditions: any = {};

    if (query.username) {
      whereConditions.username = query.username;
    }

    const aggregationPipeline = [
      {
        $match: whereConditions,
      },
      {
        $project: {
          _id: 0,
          password: 0,
          'wallet.privateKey': 0,
        },
      },
      { $skip: skip > 0 ? skip : 0 },
      { $limit: query.limit },
    ];

    const [users, totalCount] = await Promise.all([
      this.userRep.aggregate(aggregationPipeline).toArray(),
      this.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalCount / query.limit);
    return {
      users: users,
      page: query.page,
      pageSize: users.length,
      totalPages: totalPages,
      totalItems: totalCount,
    };
  }

  async findByTwitterId(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRep.findOne({
        where: {
          userId: id,
        },
      });
      return user;
    } catch (err) {
      console.log('err:', err);
      throw err;
    }
  }

  async findByUserId(userId: string): Promise<UserResponseDto> {
    const user = await this.userRep.findOne({
      where: {
        userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    try {
      const { password, _id, ...userData } = user;
      delete userData.wallet.privateKey;
      return userData;
    } catch (err) {
      console.log('err:', err);
    }
  }

  async findProfileByUsername(username: string) {
    const user = await this.userRep.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found.`);
    }
    const { password, _id, ...userData } = user;
    delete userData.wallet.privateKey;
    return userData;
  }

  async findInternalByUsername(
    username: string,
  ): Promise<InternalUserResponseDto> {
    const user = await this.userRep.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  async createUser(request: CreateUserByAdminDto): Promise<UserResponseDto> {
    const { username, email, password, role } = request;
    const users = await this.userRep.find({
      where: {
        username: username,
        email: email,
      },
    });
    if (!users || users.length == 0) {
      const userId = generateId();
      const wallet = this.generateNewWallet();
      const encryptKey = encryptPrivateKey(wallet.privateKey);
      const userCreated = {
        userId: userId,
        username,
        email: email,
        role: role || Role.User,
        password,
        wallet: {
          address: wallet.address,
          privateKey: encryptKey,
        },
      };
      const saveUser = this.userRep.create(userCreated);
      await this.userRep.save(saveUser);
      delete saveUser.password;
      delete saveUser._id;
      delete saveUser.wallet.privateKey;
      return saveUser;
    } else {
      console.log('User has been created!');
      throw new BadRequestException(ErrorsMap[ErrorsCodes.ALREADY_EXISTS]);
    }
  }

  async createUserWithTwitter(
    request: CreateUserWithTwitterDto,
  ): Promise<UserResponseDto> {
    const { id, username, password } = request;

    const image = request?.image.replace('normal', '400x400');

    const wallet = this.generateNewWallet();
    const encryptKey = encryptPrivateKey(wallet.privateKey);
    const userCreated = {
      userId: id,
      username,
      password,
      fullName: request?.displayName,
      avatar: image,
      role: Role.User,
      wallet: {
        address: wallet.address,
        privateKey: encryptKey,
      },
    };
    const saveUser = this.userRep.create(userCreated);

    await this.userRep.save(saveUser);

    delete saveUser.password;
    delete saveUser._id;
    delete saveUser.wallet.privateKey;
    return saveUser;
  }
  generateNewWallet() {
    const account = Account.generate();
    let address = account.accountAddress.toString();

    return {
      privateKey: account.privateKey.toString(),
      address,
    };
  }

  async getTokenBalances(username: string): Promise<TokenBalancesResponseDto> {
    const user = await this.userRep.findOne({
      where: {
        username,
      },
    });

    let coinsData = (
      await aptos.getAccountCoinsData({
        accountAddress: user?.wallet?.address,
      })
    ).filter((t) => t.amount > 0);

    const tokenBalances = coinsData.map((coin) => {
      const tokenBalance: TokenBalanceResponseDto = {
        address: coin?.asset_type,
        name: coin?.metadata?.name,
        symbol: coin?.metadata?.symbol,
        decimals: coin?.metadata?.decimals,
        rawAmount: coin?.amount,
      };
      return tokenBalance;
    });

    return { balances: tokenBalances };
  }

  async transferToken(
    username: string,
    request: TransferTokenDto,
  ): Promise<TransferTokenResponseDto> {
    try {
      const user = await this.userRep.findOne({
        where: {
          username,
        },
      });
      
      const privateKeyBytes = new Ed25519PrivateKey(
        decryptPrivateKey(user?.wallet?.privateKey),
      );
      const account = Account.fromPrivateKey({ privateKey: privateKeyBytes });
      let txn: SimpleTransaction;
      if (request.tokenAddress == '0x1::aptos_coin::AptosCoin') {
        txn = await aptos.transaction.build.simple({
          sender: account.accountAddress,
          data: {
            function: '0x1::aptos_account::transfer_coins',
            typeArguments: [request.tokenAddress],
            functionArguments: [request.receiver, request.amount],
          },
          options: {
            gasUnitPrice: 100,
            maxGasAmount: 10000,
          },
        });
      } else {
        txn = await aptos.transferFungibleAsset({
          sender: account,
          fungibleAssetMetadataAddress: request.tokenAddress,
          recipient: request.receiver,
          amount: request.amount,
          options: {
            gasUnitPrice: 100,
            maxGasAmount: 10000,
          },
        });
      }
      // Build transaction

      const pending = await aptos.signAndSubmitTransaction({
        signer: account,
        transaction: txn,
      });

      // Chờ confirm
      await aptos.waitForTransaction({ transactionHash: pending.hash });

      return { transactionHash: pending.hash };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
