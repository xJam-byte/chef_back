import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Dish } from "./dish.model";
import { Chef } from "src/user_chef/user_chef.model";
import { CreateDishDto } from "./Dto/create.dish.dto";
import * as fs from "fs";
import * as path from "path";

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

    const base64Data = dto.picture.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const fileName = `${Date.now()}-${dto.name}.jpg`;
    const filePath = path.join(process.cwd(), "uploads", fileName);

    fs.writeFileSync(filePath, buffer);

    const newDish = await this.dishModel.create({
      ...dto,
      picture: fileName,
    });

    return newDish;
  }
  async getChefByDishId(dishId: number): Promise<Chef | null> {
    const dish = await this.dishModel.findOne({
      where: { id: dishId },
      include: [{ model: Chef }],
    });

    return dish ? dish.chef : null;
  }
  async getDishById(id: number) {
    return this.dishModel.findOne({ where: { dish_id: id } });
  }
  async getAllDishes() {
    return this.dishModel.findAll();
  }
  async getChefDishes(id: number) {
    return this.dishModel.findAll({ where: { chefId: id } });
  }
}
