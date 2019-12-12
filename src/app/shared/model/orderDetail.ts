export class OrderDetail {
  id: number;
  orderId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;

  constructor(id: number, orderId: string, name: string, price: number, quantity: number, image: string) {
    this.id = id;
    this.orderId = orderId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.total = this.price * this.quantity;
  }
}
