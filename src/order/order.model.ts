import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { OrderDetail } from "src/order_detail/order_detail.model";
import { User } from "src/user_customer/user_customer.model";

@Table({ tableName: "orders" })
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  order_id: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_price: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  order_date: Date;

  @Column({
    type: DataType.ENUM,
    values: ["pending", "confirmed", "delivered", "cancelled"],
    allowNull: false,
  })
  status: string;

  @HasMany(() => OrderDetail)
  orderDetails: OrderDetail[];
}
