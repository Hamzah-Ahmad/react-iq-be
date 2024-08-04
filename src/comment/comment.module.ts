import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Submission } from '../submission/entities/submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Submission]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
