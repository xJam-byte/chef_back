import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { DishService } from "./dish.service";
import { CreateDishDto } from "./Dto/create.dish.dto";

@Controller("dishes")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  addDish(@Body() createDishDto: CreateDishDto) {
    return this.dishService.addDishToChef(createDishDto);
  }

  @Get()
  getAllDishes() {
    return this.dishService.getAllDishes();
  }
  @Get("getByChef/:id")
  getDishesOfChef(@Param("id") id: number) {
    return this.dishService.getChefDishes(id);
  }
}
