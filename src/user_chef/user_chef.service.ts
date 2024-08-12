import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chef } from "./user_chef.model";

@Injectable()
export class UserChefService {
  constructor(@InjectModel(Chef) private readonly chefModel: typeof Chef) {}

  async addChef(user: any) {}
}
