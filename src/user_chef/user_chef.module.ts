import { Module } from "@nestjs/common";
import { UserChefController } from "./user_chef.controller";
import { UserChefService } from "./user_chef.service";
import { Chef } from "./user_chef.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "src/user_customer/user_customer.module";

@Module({
  controllers: [UserChefController],
  providers: [UserChefService],
  imports: [UserModule, SequelizeModule.forFeature([Chef])],
})
export class UserChefModule {}
