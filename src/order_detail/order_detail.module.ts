import { Module } from "@nestjs/common";
import { OrderDetailController } from "./order_detail.controller";
import { OrderDetailService } from "./order_detail.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderDetail } from "./order_detail.model";

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  imports: [SequelizeModule.forFeature([OrderDetail])],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
