import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chef } from "./user_chef.model";
import { UserService } from "src/user_customer/user_customer.service";
import { log } from "console";
import { CreateChefDto } from "./Dto/create.chef.dto";
import { User } from "src/user_customer/user_customer.model";

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

  async getChef(userId: number) {
    return this.chefModel.findOne({ where: { userId: userId } });
  }

  async getUserId(chef: number) {
    const che = await this.chefModel.findOne({ where: { chef_id: chef } });
    return che.userId;
  }

  async getChefs() {
    const chefs = await this.chefModel.findAll({
      include: [
        {
          model: User,
          attributes: [
            "user_id",
            "name",
            "email",
            "phone_number",
            "profile_pic",
            "role",
          ],
        },
      ],
    });
    const formattedChefs = chefs.map((chef) => ({
      chef_id: chef.chef_id,
      bio: chef.bio,
      rating: chef.rating,
      user: {
        user_id: chef.user.user_id,
        name: chef.user.name,
        email: chef.user.email,
        phone_number: chef.user.phone_number,
        profile_pic: chef.user.profile_pic,
        role: chef.user.role,
      },
    }));
    return formattedChefs;
  }
}
