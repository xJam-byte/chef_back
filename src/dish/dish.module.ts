import { Module } from "@nestjs/common";
import { DishController } from "./dish.controller";
import { DishService } from "./dish.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dish } from "./dish.model";
import { Chef } from "src/user_chef/user_chef.model";

@Module({
  controllers: [DishController],
  providers: [DishService],
  imports: [SequelizeModule.forFeature([Dish, Chef])],
})
export class DishModule {}
