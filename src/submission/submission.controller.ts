import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/User.entity';
import { SubmissionDto } from './dto/submission.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':questionId')
  createSubmission(
    @CurrentUser() user: User,
    @Body() dto: SubmissionDto,
    @Param('questionId') questionId: string,
  ) {
    return this.submissionService.createSubmission(
      dto.code,
      user.id,
      questionId,
    );
  }

  @Get('/user/:questionId')
  getSubmissionByUser(
    @CurrentUser() user: User,
    @Param('questionId') questionId: string,
  ) {
    return this.submissionService.getSubmission(user.id, questionId);
  }
}
