import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindOnePostDto {
  @ApiProperty()
  @IsNumberString()
  id: number;
}
