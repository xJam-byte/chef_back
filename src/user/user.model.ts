import { Table, Column, Model, DataType, HasOne } from "sequelize-typescript";
import { Chef } from "src/user_chef/user_chef.model";
// import { Customer } from "src/user_customer/user_customer.model";

@Table({ tableName: "users" })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column(DataType.STRING)
  phone_number: string;

  @Column({
    type: DataType.ENUM,
    values: ["chef", "customer"],
    allowNull: false,
  })
  role: string;

  @HasOne(() => Chef)
  chef: Chef;

  //   @HasOne(() => Customer)
  //   customer: Customer;
}
