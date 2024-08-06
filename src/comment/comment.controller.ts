import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/User.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:submissionId')
  addCommentToSubmission(
    @Body() body: CreateCommentDto,
    @CurrentUser() user: User,
    @Param('submissionId') submissionId: string,
  ) {
    return this.commentService.addCommentToSubmission(
      body,
      submissionId,
      user.id,
    );
  }

  @Post('/reply/:parentId')
  addReplyToComment(
    @Body() body: CreateCommentDto,
    @CurrentUser() user: User,
    @Param('parentId') parentId: string,
  ) {
    return this.commentService.addReplyToComment(body, parentId, user.id);
  }

  @Public()
  @Get(`/reply/:parentId`)
  getReplies(@Param('parentId') parentId: string) {
    return this.commentService.getReplies(parentId);
  }

  @Public()
  @Get('/submission/:submissionId')
  getCommentsBySubmission(@Param('submissionId') submissionId: string) {
    return this.commentService.getCommentsBySubmission(submissionId);
  }

  @Put('/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() body: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentService.updateComment(body, commentId, user.id);
    // return this.commentService.getCommentsByPosts(postId);
  }

  @Delete('/:commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @Body() body: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentService.deleteComment(commentId, user.id);
    // return this.commentService.getCommentsByPosts(postId);
  }
}
