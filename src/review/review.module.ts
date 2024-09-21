import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { UserModule } from "src/user_customer/user_customer.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Review } from "./review.model";
import { Chef } from "src/user_chef/user_chef.model";
import { User } from "src/user_customer/user_customer.model";

@Module({
  imports: [SequelizeModule.forFeature([Review, Chef, User])],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
