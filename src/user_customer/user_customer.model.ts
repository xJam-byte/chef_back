import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { Review } from "src/review/review.model";
import { User } from "src/user/user.model";
import { Chef } from "src/user_chef/user_chef.model";
// import { Chef } from './chef.model';
// import { Order } from './order.model';
// import { Review } from './review.model';

interface UserCreationAttrs {
  userId: number;
  role: string;
}

@Table({ timestamps: true, tableName: "users" })
export class Customer extends Model<Customer, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  customer_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM,
    values: ["customer", "chef", "admin"],
    allowNull: false,
  })
  role: string;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Review)
  reviews: Review[];
}
