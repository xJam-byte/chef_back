import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly phone_number?: string;

  @IsString()
  @IsOptional()
  readonly profile_pic?: string;

  @IsEnum(["customer", "chef", "admin"])
  readonly role: string = "customer";
}
