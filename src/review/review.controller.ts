import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./Dto/create.review.dto";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async addReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.addReviewToChef(createReviewDto);
  }

  @Get("/chef/:chefId")
  async getReviewsByChefId(@Param("chefId") chefId: number) {
    return this.reviewService.findReviewsByChefId(chefId);
  }
}
