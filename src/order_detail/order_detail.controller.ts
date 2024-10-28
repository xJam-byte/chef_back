import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderDetail } from "./order_detail.model";
import { OrderDetailService } from "./order_detail.service";
import { CreateOrderDetailDto } from "./Dto/create.order_detail.dto";

@Controller("order-detail")
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async findAll(): Promise<OrderDetail[]> {
    return await this.orderDetailService.findAll();
  }

  @Post()
  async create(
    @Body() createOrderDetailDto: CreateOrderDetailDto
  ): Promise<OrderDetail> {
    return await this.orderDetailService.create(createOrderDetailDto);
  }
}
