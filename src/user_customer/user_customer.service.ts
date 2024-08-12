import { Injectable } from "@nestjs/common";
import { User } from "./user_customer.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCustomerDto } from "./Dto/create.customer.dto";
import * as bcrypt from "bcrypt";

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

  async updateNameSurnamePhone(user: any) {
    const customer = await this.userModel.findOne({
      where: { email: user.email },
    });

    if (!customer) {
      throw new Error("Клиент с указанным email не найден.");
    }

    await customer.update({
      name: user.firstName,
      phone_number: user.phoneNumber,
    });

    await customer.save();
    return customer;
  }

  async updateEmail(user: any) {
    const customer = await this.userModel.findOne({
      where: { email: user.oldEmail },
    });

    if (!customer) {
      throw new Error("Клиент с указанным email не найден.");
    }
    await customer.update({
      email: user.newEmail,
    });

    await customer.save();
    return customer;
  }

  async updatePassword(user: any) {
    const customer = await this.userModel.findOne({
      where: { email: user.email },
    });

    if (!customer) {
      throw new Error("Клиент с указанным email не найден.");
    }

    const hash = await bcrypt.hash(user.password, 5);
    await customer.update({ password: hash });

    await customer.save();
    return customer;
  }
}
