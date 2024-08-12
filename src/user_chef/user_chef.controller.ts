import { Body, Controller, Post } from "@nestjs/common";
import { UserChefService } from "./user_chef.service";

@Controller("chef")
export class UserChefController {
  constructor(private service: UserChefService) {}

  @Post("/becameChef")
  became(@Body() info: any) {
    return this.service.addChef(info);
  }
}
