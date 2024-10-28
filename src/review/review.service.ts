// review.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "./review.model";
import { Chef } from "src/user_chef/user_chef.model";
import { User } from "src/user_customer/user_customer.model";
import { CreateReviewDto } from "./Dto/create.review.dto";
import { log } from "console";

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
      throw new NotFoundException("Chef not found");
    }
    const user = await this.userModel.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newReview = await this.reviewModel.create(dto);

    const allReviews = await this.reviewModel.findAll({
      where: { chefId: dto.chefId },
    });

    const totalRating = allReviews.reduce((sum, review) => {
      const rating = Number(review.rating);
      return sum + (isNaN(rating) ? 0 : rating);
    }, 0);

    const reviewCount = allReviews.length;
    chef.rating = reviewCount > 0 ? totalRating / reviewCount : 0;

    if (isNaN(chef.rating)) {
      chef.rating = 0;
    }

    await chef.save();

    return newReview;
  }

  async findReviewsByChefId(id: number): Promise<Review[]> {
    const reviews = await this.reviewModel.findAll({ where: { chefId: id } });
    // console.log("Отзывы для chefId:", id, reviews);
    return reviews;
  }
}
