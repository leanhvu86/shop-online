import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../shared/service/customer.service';
import {Customer} from '../../shared/model/customer';
import {Order} from '../../shared/model/order';
import {OrderService} from '../../shared/service/order.service';
import {Province} from '../../shared/model/province';
import {District} from '../../shared/model/district';
import {Ward} from '../../shared/model/ward';
import {LocationService} from '../../shared/service/location.service';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  orders: Order[];
  md5: string;
  count = 0;
  total = 0;
  public provinces: Province[];
  public districts: District [];
  public wards: Ward[];
  districtTemp: District[];
  wardTemp: Ward[];
  typePays = [
    {value: 1, title: 'Credit card'},
    {value: 2, title: 'Debit card'},
    {value: 3, title: 'PayPal'}
  ];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private orderService: OrderService,
    public locationService: LocationService,
  ) {
  }

  ngOnInit() {
    this.getProvinces();
    this.getDistrict();
    this.getWard();
    this.getCustomerDetail();
    this.getOrderSummary();

  }

  getCustomerDetail(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.customerService.getCustomer(id).subscribe(customer => this.customer = customer);
    console.log(this.customer);
  }

  getProvinces() {
    this.locationService.getProvinces().subscribe(provinces => {
      console.log(provinces);
      this.provinces = provinces;
    });
  }

  getDistrict() {
    this.locationService.getDistrict().subscribe(districts => {
      console.log(districts);
      this.districts = districts;
      this.districtTemp = districts;
    });
  }

  getWard() {
    this.locationService.getWards().subscribe(
      wards => {
        console.log(wards);
        this.wards = wards;
        this.wardTemp = wards;
      });
  }

  getOrderSummary() {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
    if (this.orders.length) {
      this.orders = this.orders.filter(order => order.customerId = this.md5);
      this.count = this.orders.length + 1;
      for (let order of this.orders) {
        this.total += order.total;
      }
    }

  }

  selectChangeHandler(province) {
    this.districts = this.districtTemp;
    this.districts = this.districts.filter(district => district.provinceId == this.customer.provinceId);
  }

  loadWard(district) {
    this.wards = this.wardTemp;
    this.wards = this.wards.filter(ward => ward.districtId == this.customer.districtId);
  }

  submit() {
    if (this.customer.name == undefined) {
      alert('Vui lòng nhập họ tên');
      return false;
    }
    if (this.customer.email == undefined) {
      alert('Vui lòng nhập email');
      return false;
    }
    let checkEmail = this.emailIsValid(this.customer.email);
    if (checkEmail === false) {
      alert('Vui lòng nhập email đúng định dạng');
      return false;
    }
    if (this.customer.addressShip == undefined) {
      alert('Vui lòng nhập số diện thoại');
      return false;
    }
    this.customerService.updateCustomer(this.customer).subscribe(() => alert('Lưu thông tin khách hàng thành công.'));
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
