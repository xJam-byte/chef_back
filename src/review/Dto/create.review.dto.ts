import { IsNumber, IsString, IsNotEmpty, Min, Max } from "class-validator";

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly chefId: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
