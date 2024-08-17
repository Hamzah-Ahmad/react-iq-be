import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import * as zlib from 'zlib';

import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/User.entity';
import { Comment } from '../../comment/entities/comment.entity';

export class CodeTransformer implements ValueTransformer {
  to(value: string): Buffer {
    if(!value) return null;
    return zlib.deflateSync(value);
  }

  from(value: Buffer): string {
    if(!value) return null;
    return zlib.inflateSync(value).toString();
  }
}

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  questionId: string;

  // @Column('bytea')
  // code: Buffer;

  // @Column()
  // code: string;

  @Column({
    type: 'bytea',
    transformer: new CodeTransformer(),
  })
  code: string;

  @ManyToOne(() => Question, (question) => question.submissions)
  question: Question;

  @ManyToOne(() => User, (user) => user.submissions)
  user: User;

  @ManyToMany(() => User, (user) => user.likedSubmissions, { cascade: true })
  @JoinTable()
  likes: User[];

  @OneToMany(() => Comment, (comment) => comment.submission)
  comments: Comment[];

  commentCount: number;
}
