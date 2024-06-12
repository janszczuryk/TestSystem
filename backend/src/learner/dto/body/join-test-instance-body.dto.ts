import { IsDefined, IsInt, Max, Min } from 'class-validator';

export class JoinTestInstanceBodyDto {
  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(1000)
  public learnerNumber: number;
}
