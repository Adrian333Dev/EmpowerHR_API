import { IsArray, ArrayNotEmpty, IsPositive } from 'class-validator';

export class IdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsPositive({ each: true })
  ids: number[];
}
