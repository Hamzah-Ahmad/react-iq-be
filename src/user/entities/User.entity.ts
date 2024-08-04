import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Submission } from '../../submission/entities/submission.entity';
import { Comment } from '../../comment/entities/comment.entity';

export enum Role {
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];

  @ManyToMany(() => Submission, (submission) => submission.likes)
  likedSubmissions: Submission[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
