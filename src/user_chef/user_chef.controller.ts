import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserChefService } from "./user_chef.service";
import { log } from "console";
import { CreateChefDto } from "./Dto/create.chef.dto";

@Controller("chef")
export class UserChefController {
  constructor(private service: UserChefService) {}

  @Post("/becomeChef")
  became(@Body() info: CreateChefDto) {
    return this.service.addChef(info);
  }
  @Get("/getChef/:id")
  getChefByUserId(@Param("id") userId: number) {
    return this.service.getChef(userId);
  }
  @Get("/getAll")
  async getAll() {
    return await this.service.getChefs();
  }
}
