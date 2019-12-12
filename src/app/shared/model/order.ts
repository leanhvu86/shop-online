import {Md5} from 'ts-md5';

export class Order {
  id: number;
  customerId:string;
  quantity:number;
  total:number;
  md5:string;
  type:number;
}
