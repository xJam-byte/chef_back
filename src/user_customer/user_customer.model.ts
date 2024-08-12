import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { Review } from "src/review/review.model";
import { Chef } from "src/user_chef/user_chef.model";
// import { Chef } from './chef.model';
// import { Order } from './order.model';
// import { Review } from './review.model';

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
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

  @Column(DataType.TEXT)
  address: string;

  @Column(DataType.STRING)
  phone_number: string;

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
}
