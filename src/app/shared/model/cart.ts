export class Cart {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    promotion:number;
    total: number
  constructor(id: number, name: string, price: number, quantity: number, image: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.total = this.price * this.quantity;
  }
}
