import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Dish } from "src/dish/dish.model";
import { Order } from "src/order/order.model";

@Table({ tableName: "order_details" })
export class OrderDetail extends Model<OrderDetail> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  order_detail_id: number;
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Dish)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dishId: number;

  @BelongsTo(() => Dish)
  dish: Dish;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  preferences: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;
}
