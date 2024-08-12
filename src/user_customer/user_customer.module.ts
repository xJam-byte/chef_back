import { Module } from "@nestjs/common";
import { UserController } from "./user_customer.controller";
import { UserService } from "./user_customer.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user_customer.model";

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
