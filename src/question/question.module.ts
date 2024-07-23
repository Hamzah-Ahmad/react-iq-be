import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Submission } from '../submission/entities/submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Submission])],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
