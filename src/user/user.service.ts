import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateCustomerDto } from "src/user_customer/Dto/create.customer.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async createUser(createCustomerDto: CreateCustomerDto): Promise<User> {
    return this.userModel.create(createCustomerDto);
  }
}
