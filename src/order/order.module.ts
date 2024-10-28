import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { OrderDetailModule } from "src/order_detail/order_detail.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { DishModule } from "src/dish/dish.module";
import { UserModule } from "src/user_customer/user_customer.module";
import { UserChefModule } from "src/user_chef/user_chef.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    SequelizeModule.forFeature([Order]),
    OrderDetailModule,
    MailerModule,
    DishModule,
    UserModule,
    UserChefModule,
  ],
})
export class OrderModule {}
