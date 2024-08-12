import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Dish } from "src/dish/dish.model";
import { Review } from "src/review/review.model";
import { User } from "src/user/user.model";

@Table({ tableName: "chefs" })
export class Chef extends Model<Chef> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  chef_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.TEXT)
  bio: string;

  @Column({
    type: DataType.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  })
  rating: number;

  @HasMany(() => Dish)
  dishes: Dish[];

  @HasMany(() => Review)
  reviews: Review[];
}
