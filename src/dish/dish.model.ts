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
  @ForeignKey(() => Chef)
  @Column({
    type: DataType.INTEGER,
    unique: true,
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

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.ENUM,
    values: ["available", "not_available"],
    allowNull: false,
  })
  availability_status: string;
}
