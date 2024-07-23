import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { QuestionService } from './question.service';
import { ApplyUser } from '../auth/guards/apply-user.guard';

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
  @UseGuards(ApplyUser)
  @Get(':questionId')
  getQuestionById(@Req() request, @Param() questionId: string) {
    return this.questionService.getQuestionById(questionId, request?.user);
  }
}
