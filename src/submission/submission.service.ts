import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/User.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async createSubmission(code: string, userId: string, questionId: string) {
    let submission = await this.submissionRepository.findOne({
      where: {
        questionId,
        userId,
      },
    });

    if (submission) {
      submission.code = code;
    } else {
      submission = this.submissionRepository.create({
        questionId,
        userId,
        code,
      });
    }
    return await this.submissionRepository.save(submission);
  }

  async getSubmissions(questionId: string) {
    // const submissions = await this.submissionRepository.find({
    //   where: {
    //     questionId,
    //   },
    //   relations: ['user', 'likes', 'comments'],
    //   select: {
    //     likes: {
    //       id: true,
    //     },
    //   },

    // });

    const submissions = await this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.user', 'user')
      .leftJoinAndSelect('submission.likes', 'likes')
      .leftJoinAndSelect('submission.comments', 'comments')
      .loadRelationCountAndMap('submission.commentCount', 'submission.comments')
      .select(['submission', 'user', 'likes.id'])
      .where('submission.questionId = :questionId', { questionId })
      .getMany();

    return submissions.map((submission) => ({
      ...submission,
      likes: submission.likes.map((like) => like.id),
    }));
  }

  async getUserSubmission(userId: string, questionId: string) {
    return this.submissionRepository.findOne({
      where: {
        questionId,
        userId,
      },
    });
  }

  async getSubmissionById(submissionId: string) {
    const res =  this.submissionRepository.findOne({
      where: {
        id: submissionId,
      },
      // relations: ['user'],
    });

    console.log("res: ", res)
    return res;
  }

  async updateLikeOnSubmission(submissionId: string, user: User) {
    const submission = await this.submissionRepository.findOne({
      where: {
        id: submissionId,
      },
      relations: ['likes'],
      select: {
        id: true,
      },
    });

    if (!submission) throw new NotFoundException('Submission Not Found');

    if (submission.likes?.map((userLiked) => userLiked.id)?.includes(user.id)) {
      submission.likes = submission.likes.filter(
        (userLiked) => userLiked.id !== user.id,
      );
      console.log(submission.likes, user.id);
    } else {
      submission.likes.push(user);
    }

    return this.submissionRepository.save(submission);
  }
}
