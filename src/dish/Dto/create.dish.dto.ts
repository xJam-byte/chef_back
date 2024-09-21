import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDishDto {
  @IsNumber()
  @IsNotEmpty()
  readonly chefId: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsNotEmpty()
  readonly picture?: string;
  @IsString()
  @IsNotEmpty()
  readonly type: string;
  @IsString()
  @IsNotEmpty()
  readonly ingredients: string;
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsEnum(["avialable", "not_aviable"])
  readonly availability_status: string = "not_available";
}
