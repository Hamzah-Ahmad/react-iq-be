import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async createSubmission(code: string, userId: string, questionId: string) {
    let submission = this.submissionRepository.create({
      questionId,
      userId,
      code,
    });
    return await this.submissionRepository.save(submission);
  }

  async getSubmission(userId: string, questionId: string) {
    return this.submissionRepository.findOne({
      where: {
        questionId,
        userId,
      },
    });
  }
}
