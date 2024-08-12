import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "./user_customer/user_customer.module";
import { UserChefModule } from "./user_chef/user_chef.module";
import { DishModule } from "./dish/dish.module";
import { ReviewModule } from "./review/review.module";
import { OrderModule } from "./order/order.module";
import { OrderDetailModule } from "./order_detail/order_detail.module";
import { User } from "./user_customer/user_customer.model";
import { Chef } from "./user_chef/user_chef.model";
import { Dish } from "./dish/dish.model";
import { Order } from "./order/order.model";
import { OrderDetail } from "./order_detail/order_detail.model";
import { Review } from "./review/review.model";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AddressModule } from "./address/address.module";
import { UserModule as m } from "./user/user.module";

@Module({
  controllers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      models: [User, Chef, Dish, Order, OrderDetail, Review],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    UserChefModule,
    DishModule,
    ReviewModule,
    OrderModule,
    OrderDetailModule,
    AddressModule,
  ],
})
export class AppModule {}
