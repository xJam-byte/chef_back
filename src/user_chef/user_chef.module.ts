import { Module } from "@nestjs/common";
import { UserChefController } from "./user_chef.controller";
import { UserChefService } from "./user_chef.service";
import { Chef } from "./user_chef.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [UserChefController],
  providers: [UserChefService],
  imports: [SequelizeModule.forFeature([Chef])],
})
export class UserChefModule {}
