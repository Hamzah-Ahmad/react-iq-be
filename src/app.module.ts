import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [CoreModule, DatabaseModule, AuthModule, QuestionModule, SubmissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
