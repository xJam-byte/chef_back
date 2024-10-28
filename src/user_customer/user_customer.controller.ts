import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user_customer.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("user-customer")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/update/contacts")
  updateNameSurnamePhone(@Body() user: any) {
    return this.userService.updateContactInfo(user);
  }
  @Post("/avatar")
  uploadAvatar(@Body() body: { avatar: string; userId: number }) {
    return this.userService.uploadAvatar(body.avatar, body.userId);
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
