// dish.controller.ts
import { Controller, Post, Body, Get } from "@nestjs/common";
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
}
