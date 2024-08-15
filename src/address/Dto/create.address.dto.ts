import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from "class-validator";
export class CreateAddressDto {
  readonly userId: number;
  readonly street: string;
  readonly city: string;
  readonly postalCode: string;
}
