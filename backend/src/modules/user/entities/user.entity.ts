import { AbstractEntity } from '@common/entities/abstract-entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

export class Wallet {
  address: string;
  privateKey: string;
}

@Entity('users')
export class User extends AbstractEntity {
  // @ObjectIdColumn({ name: '_id' })
  // _id: ObjectId;

  @Column({ unique: true })
  userId: string;

  @Column({ unique: true })
  username: string;

  @Column({})
  role: string;

  @Column({ nullable: true, default: null })
  fullName: string;

  @Column({ nullable: true, default: null })
  email: string;

  @Column()
  wallet: Wallet;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ nullable: true, default: null })
  coverImage: string;

  @Column({ nullable: true, default: null })
  verificationStatus: boolean;

  @Column({ nullable: true, default: null })
  followers: number;

  @Column({ nullable: true, default: null })
  following: number;

  @Column({ nullable: true, default: null })
  externalUrl: string;

  @Column({ nullable: true, default: null })
  creationDate: string;

  @Column({ nullable: true, default: null })
  referralCode: string;

  @Column({ nullable: false })
  isUpdated: boolean;
}
