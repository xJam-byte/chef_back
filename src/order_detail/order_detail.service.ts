import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderDetail } from "./order_detail.model";
import { CreateOrderDetailDto } from "./Dto/create.order_detail.dto";

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectModel(OrderDetail) private orderDetailModel: typeof OrderDetail
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailModel.findAll({ include: { all: true } });
  }

  async create(
    createOrderDetailDto: CreateOrderDetailDto
  ): Promise<OrderDetail> {
    return this.orderDetailModel.create({ ...createOrderDetailDto });
  }
}
