import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Submission } from '../../submission/entities/submission.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array', { default: [] })
  hints: string[];

  @OneToMany(() => Submission, (submission) => submission.question)
  submissions: Submission[];
}
