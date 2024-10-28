export class CreateOrderDto {
  userId: number;
  totalPrice: number;
  orderDate: Date;
  status: string;
  items: {
    dishId: number;
    quantity: number;
    preferences: string;
    price: number;
  }[];
}
