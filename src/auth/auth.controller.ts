import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateCustomerDto } from "src/user_customer/Dto/create.customer.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() customerDto: CreateCustomerDto) {
    return this.authService.login(customerDto);
  }

  @Post("/registration")
  async registration(@Body() customerDto: CreateCustomerDto) {
    return this.authService.registration(customerDto);
  }
}
