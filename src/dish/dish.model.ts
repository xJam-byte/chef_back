import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Chef } from "src/user_chef/user_chef.model";

@Table({ tableName: "dishes" })
export class Dish extends Model<Dish> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  dish_id: number;

  @ForeignKey(() => Chef)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chefId: number;

  @BelongsTo(() => Chef)
  chef: Chef;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  type: string;

  @Column(DataType.TEXT)
  picture: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ingredients: string;

  @Column({
    type: DataType.ENUM("available", "not_available"),
    allowNull: false,
    defaultValue: "available",
  })
  availability_status: string;
}
