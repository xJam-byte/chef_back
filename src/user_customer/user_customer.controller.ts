import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user_customer.service";

@Controller("user-customer")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/update/contacts")
  updateNameSurnamePhone(@Body() user: any) {
    return this.userService.updateNameSurnamePhone(user);
  }

  @Post("/update/email")
  updateEmail(@Body() user: any) {
    return this.userService.updateEmail(user);
  }

  @Post("/update/password")
  updatePassword(@Body() user: any) {
    return this.userService.updatePassword(user);
  }
}
