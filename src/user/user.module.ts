import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Submission } from '../submission/entities/submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Submission])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
