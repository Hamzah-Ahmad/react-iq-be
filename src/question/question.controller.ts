import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { QuestionService } from './question.service';
import { ApplyUser } from '../auth/guards/apply-user.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Public()
  @UseGuards(ApplyUser)
  @Get('/')
  getAllQuestions(@Req() request) {
    return this.questionService.getAllQuestions(request?.user);
  }
  @Public()
  @Get('/:questionId')
  getQuestionById(@Param('questionId') questionId: string) {
    return this.questionService.getQuestionById(questionId);
  }
}
