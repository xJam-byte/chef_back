import { Injectable } from "@nestjs/common";
import { User } from "./user_customer.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCustomerDto } from "./Dto/create.customer.dto";
import * as bcrypt from "bcrypt";

import * as fs from "fs";
import * as path from "path";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }
  async changeRole(userId: number, newRole: string) {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = newRole;
    await user.save();
    return user;
  }
  async findOneById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { user_id: id } });
  }

  async createUser(createCustomerDto: CreateCustomerDto): Promise<User> {
    return this.userModel.create(createCustomerDto);
  }

  async updateContactInfo(user: any) {
    const customer = await this.userModel.findOne({
      where: { email: user.email },
    });

    if (!customer) {
      throw new Error("Клиент с указанным email не найден.");
    }
    await customer.update({
      name: user.name || customer.name,
      phone_number: user.phone_number || customer.phone_number,
      email: user.email || customer.email,
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

  async uploadAvatar(base64Image: string, user_Id: number) {
    const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid base64 string");
    }

    const imageBuffer = Buffer.from(matches[2], "base64");
    const extension = matches[1].split("/")[1];
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "avatars",
      filename
    );

    fs.writeFileSync(filePath, imageBuffer);
    const user = await this.userModel.findByPk(user_Id);

    if (!user) {
      throw new Error("User not found");
    }

    user.profile_pic = `/uploads/avatars/${filename}`;
    return await user.save();
  }

  async getUserById(id: number) {
    return this.userModel.findOne({ where: { user_id: id } });
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
