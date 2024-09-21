import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Address } from "src/address/address.model";
import { Order } from "src/order/order.model";
import { Review } from "src/review/review.model";
import { Chef } from "src/user_chef/user_chef.model";

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  profile_pic: string;
  role: string;
}

@Table({ timestamps: true, tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column(DataType.STRING)
  phone_number: string;

  @Column(DataType.TEXT)
  profile_pic: string;

  @Column({
    type: DataType.ENUM,
    values: ["customer", "chef", "admin"],
    allowNull: false,
  })
  role: string;

  @HasOne(() => Chef)
  chef: Chef;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Address)
  address: Address;
}
