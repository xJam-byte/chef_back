import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Order } from "./order.model";
import { CreateOrderDto } from "./Dto/create.order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(createOrderDto);
  }

  @Get(":userId/history")
  async getOrderHistory(@Param("userId") userId: number): Promise<Order[]> {
    return await this.orderService.getOrderHistory(userId);
  }
}
