// review.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "./review.model";
import { Chef } from "src/user_chef/user_chef.model";
import { User } from "src/user_customer/user_customer.model";
import { CreateReviewDto } from "./Dto/create.review.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review,
    @InjectModel(Chef) private readonly chefModel: typeof Chef,
    @InjectModel(User) private readonly userModel: typeof User
  ) {}

  async addReviewToChef(dto: CreateReviewDto) {
    const chef = await this.chefModel.findByPk(dto.chefId);
    if (!chef) {
      throw new Error("Chef not found");
    }
    const user = await this.userModel.findByPk(dto.userId);
    if (!user) {
      throw new Error("User not found");
    }
    const newReview = await this.reviewModel.create(dto);
    // const allReviews = await this.reviewModel.findAll({ where: { chefId } });
    // const totalRating = allReviews.reduce(
    //   (sum, review) => sum + review.rating,
    //   0
    // );
    // chef.rating = totalRating / allReviews.length;
    // await chef.save();

    return newReview;
  }
}
