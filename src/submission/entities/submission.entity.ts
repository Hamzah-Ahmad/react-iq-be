import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/User.entity';

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

  @Column()
  code: string;

  @ManyToOne(() => Question, (question) => question.submissions)
  question: Question;

  @ManyToOne(() => User, (user) => user.submissions)
  user: User;

  @ManyToMany(() => User, (user) => user.likedSubmissions, { cascade: true })
  @JoinTable()
  likes: User[];
}
