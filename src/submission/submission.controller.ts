import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/User.entity';
import { SubmissionDto } from './dto/submission.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @Public()
  @Get(`:questionId`)
  getSubmissions(@Param('questionId') questionId: string) {
    return this.submissionService.getSubmissions(questionId);
  }

  @Get('/user/:questionId')
  getSubmissionByUser(
    @CurrentUser() user: User,
    @Param('questionId') questionId: string,
  ) {
    return this.submissionService.getUserSubmission(user.id, questionId);
  }

  @Post('/:submissionId/like')
  updateLikeOnSubmission(
    @CurrentUser() user: User,
    @Param('submissionId') submissionId: string,
  ) {
    return this.submissionService.updateLikeOnSubmission(submissionId, user);
  }
}
