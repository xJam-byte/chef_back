import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chef } from "./user_chef.model";
import { UserService } from "src/user_customer/user_customer.service";
import { log } from "console";
import { CreateChefDto } from "./Dto/create.chef.dto";

@Injectable()
export class UserChefService {
  constructor(
    @InjectModel(Chef) private readonly chefModel: typeof Chef,
    private customerService: UserService
  ) {}

  async addChef(user: CreateChefDto) {
    const candidate = await this.customerService.findOneById(user.userId);
    if (!candidate) {
      throw new Error("User not found");
    }

    const existingChef = await this.chefModel.findOne({
      where: { userId: candidate.user_id },
    });

    if (existingChef) {
      throw new Error("User is already registered as a chef");
    }

    const newChef = await this.chefModel.create({
      userId: candidate.user_id,
      bio: user.bio || "",
      rating: 0,
    });

    await this.customerService.changeRole(candidate.user_id, "chef");

    log(newChef);

    return newChef;
  }
}
