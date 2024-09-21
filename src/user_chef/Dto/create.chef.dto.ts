import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDecimal,
  Min,
  Max,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Dish } from "src/dish/dish.model";
import { Review } from "src/review/review.model";

export class CreateChefDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsString()
  @IsOptional()
  readonly bio?: string;

  @IsDecimal()
  @Min(0)
  @Max(5)
  @IsOptional()
  readonly rating?: number = 0;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Dish)
  readonly dishes?: Dish[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Review)
  readonly reviews?: Review[];
}
