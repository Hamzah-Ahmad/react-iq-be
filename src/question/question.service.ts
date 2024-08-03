import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/User.entity';
import { Submission } from '../submission/entities/submission.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  // The leftJoinAndSelect is to get all questions, and also to get all the submissions of the current user
  async getAllQuestions(user?: User) {
    let questions = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect(
        'question.submissions',
        'test',
        'test.userId = :userId OR test.userId IS NULL',
        { userId: user?.id },
      )
      .getMany();

    const response = questions.map((question) => {
      const { submissions, ...rest } = question;
      return {
        ...rest,
        userSubmission: submissions?.[0],
      };
    });

    return response;
  }

  async getQuestionById(questionId: string) {
    // const question = await this.questionRepository
    //   .createQueryBuilder('question')
    //   .leftJoinAndSelect(
    //     'question.submissions',
    //     'submission',
    //     'submission.userId = :userId OR submission.userId IS NULL',
    //     { userId: user?.id },
    //   )
    //   .where('question.id = :questionId', { questionId })
    //   .getOne();
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });

    if (!question)
      throw new NotFoundException([
        'A question with the provided ID was not found',
      ]);

    return question;
  }
}
