// dish.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Dish } from "./dish.model";
import { Chef } from "src/user_chef/user_chef.model";
import { CreateDishDto } from "./Dto/create.dish.dto";

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish) private readonly dishModel: typeof Dish,
    @InjectModel(Chef) private readonly chefModel: typeof Chef
  ) {}

  async addDishToChef(dto: CreateDishDto) {
    const chef = await this.chefModel.findByPk(dto.chefId);
    if (!chef) {
      throw new Error("Chef not found");
    }

    const newDish = await this.dishModel.create(dto);

    return newDish;
  }

  async getAllDishes() {
    return this.dishModel.findAll();
  }
}
