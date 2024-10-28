// order.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { CreateOrderDto } from "./Dto/create.order.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { OrderDetailService } from "src/order_detail/order_detail.service";
import { CreateOrderDetailDto } from "src/order_detail/Dto/create.order_detail.dto";
import { DishService } from "src/dish/dish.service";
import { UserChefService } from "src/user_chef/user_chef.service";
import { UserService } from "src/user_customer/user_customer.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private orderDetailService: OrderDetailService,
    private dishService: DishService,
    private mailerService: MailerService,
    private chefService: UserChefService,
    private customerService: UserService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, ...orderData } = createOrderDto;
    const order = await this.orderModel.create(orderData);

    const orderDetails = [];

    for (const item of items) {
      const orderDetailDto: CreateOrderDetailDto = {
        orderId: order.order_id,
        dishId: item.dishId,
        quantity: item.quantity,
        preferences: item.preferences,
        price: item.price,
      };
      orderDetails.push(orderDetailDto);
      await this.orderDetailService.create(orderDetailDto);
    }

    await this.notifyChefs(orderDetails);

    return order;
  }

  private async notifyChefs(items: CreateOrderDetailDto[]) {
    const chefOrders = this.groupByChef(items);

    for (const [chefEmail, chefItems] of (await chefOrders).entries()) {
      const orderDetails = chefItems
        .map(
          (item) =>
            `Dish ID: ${item.dishId}, Quantity: ${item.quantity}, Price: ${item.price}`
        )
        .join("\n");

      await this.mailerService.sendMail({
        to: chefEmail,
        subject: "New Order Notification",
        text: `You have new orders:\n${orderDetails}`,
      });
    }
  }

  private async groupByChef(items: CreateOrderDetailDto[]) {
    const chefOrders = new Map<string, CreateOrderDetailDto[]>();

    for (const item of items) {
      const chefEmail = await this.getChefEmail(item.dishId);
      if (!chefOrders.has(chefEmail)) {
        chefOrders.set(chefEmail, []);
      }
      chefOrders.get(chefEmail).push(item);
    }

    return chefOrders;
  }

  private async getChefEmail(dishId: number): Promise<string> {
    const dish = await this.dishService.getDishById(dishId);
    const chefId = dish.chefId;

    const userId = await this.chefService.getUserId(chefId);
    const user = await this.customerService.getUserById(userId);
    return user.email;
  }
}
