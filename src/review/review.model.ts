import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Chef } from "src/user_chef/user_chef.model";
import { User } from "src/user_customer/user_customer.model";

@Table({ tableName: "reviews" })
export class Review extends Model<Review> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  review_id: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Chef)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chefId: number;

  @BelongsTo(() => Chef)
  chef: Chef;

  @Column({
    type: DataType.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  })
  rating: number;

  @Column(DataType.TEXT)
  comment: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  review_date: Date;
}
