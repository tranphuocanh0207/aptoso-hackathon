import {
  Column,
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/abstract-entity';

export enum CampaignStatus {
  PENDING = 'Pending',
  LIVE = 'Live',
  ENDED = 'Ended',
}

export enum CampaignType {
  POST_QUEST = 'PostQuest',
  FEED_QUEST = 'FeedQuest',
  REVIEW_QUEST = 'ReviewQuest',
}

export enum CampaignAction {
  LIKE = 'Like',
  RETWEET = 'Retweet',
  COMMENT = 'Comment',
  FOLLOW = 'Follow',
}

@Entity('campaigns')
export class Campaign extends AbstractEntity {
  @Column({ unique: true })
  campaignId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: CampaignType,
  })
  type: CampaignType;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.PENDING,
  })
  status: CampaignStatus;

  @Column({
    nullable: true,
    default: [],
  })
  actions: CampaignAction[];

  @Column()
  createdByUserId: string;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: true, default: null })
  keywords?: string;

  @Column({ nullable: true, default: null })
  commentText?: string;

  @Column({ nullable: true, default: 1 })
  numberOfPost?: number;

  @Column({ nullable: true, default: null })
  minFollowers: number;

  @Column({ nullable: true, default: null })
  smartFollowersScore: number;

  @Column({ nullable: true, default: null })
  mustHoldMinToken: number;

  @Column({ nullable: true, default: null })
  mustHoldDurationDays: number;

  // Token & Reward
  @Column()
  totalTokenReward: number;

  @Column()
  rewardPerUser: number;

  @Column()
  maxParticipants: number;

  @Column()
  maxDailyJoin: number;

  @Column()
  startDate: number;

  @Column()
  endDate: number;

  @Column({ default: 0 })
  totalJoined: number;

  @Column({ default: 0 })
  totalCompleted: number;

  @Column({ default: 0 })
  totalTokenDistributed: number;

  @Column({ nullable: true })
  bannerImage: string;

  @Column({ default: '0x1::aptos_coin::AptosCoin' })
  tokenRewardAddress: string;

  @Column({ default: false })
  depositReward: boolean;

  @BeforeInsert()
  async beforeInsert() {
    if (!this.totalJoined) this.totalJoined = 0;
    if (!this.totalCompleted) this.totalCompleted = 0;
    if (!this.totalTokenDistributed) this.totalTokenDistributed = 0;
    if (!this.commentText) this.commentText = null;
  }
}

@Entity('campaign_participations')
@Unique(['campaignId', 'userId'])
export class CampaignParticipation extends AbstractEntity {
  @Column()
  campaignId: string;

  @Column()
  userId: string;

  @Column({
    nullable: true,
    default: [],
  })
  completedAction: CampaignAction[];

  @Column()
  completedAt: number;

  @Column()
  reward: string;

  @Column()
  isClaimed: boolean;

  @Column()
  txHash: string;

  @BeforeInsert()
  async beforeInsert() {
    if (!this.completedAction) this.completedAction = [];
    if (!this.completedAt) this.completedAt = null;
    if (!this.reward) this.reward = null;
    if (!this.isClaimed) this.isClaimed = false;
    if (!this.txHash) this.txHash = null;
  }
}
