import { Body, Controller, Get, Post } from "@nestjs/common";
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
}
