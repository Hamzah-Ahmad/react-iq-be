import { IsString } from 'class-validator';

export class SubmissionDto {
  @IsString()
  code: string;
}
