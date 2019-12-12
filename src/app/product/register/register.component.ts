import {Component, OnInit} from '@angular/core';
import {Customer} from '../../shared/model/customer';
import {CartService} from '../../shared/service/cart.service';
import {LocationService} from '../../shared/service/location.service';
import {OrderService} from '../../shared/service/order.service';
import {CustomerService} from '../../shared/service/customer.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Province} from '../../shared/model/province';
import {District} from '../../shared/model/district';
import {Ward} from '../../shared/model/ward';
import {Order} from '../../shared/model/order';
import {OrderDetail} from '../../shared/model/orderDetail';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    public locationService: LocationService,
    public customerService: CustomerService,
    private location: Location,
    private router: Router,
  ) {
  }

  customer: Customer;
  customerSaved: Customer;
  public provinces: Province[];
  public districts: District [];
  public wards: Ward[];
  districtTemp: District[];
  wardTemp: Ward[];
  order = new Order();
  count: number;
  saveSuccess = false;
  saveOrderStatus = false;
  md5: string;

  getprovinces() {
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
        this.wards = wards;
        this.wardTemp = wards;
      });
  }

  ngOnInit() {
    this.customer = new Customer();
    this.getprovinces();
    this.getDistrict();
    this.getWard();
    this.getMd5();
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
    console.log(this.customer);
    console.log(this.md5);
    this.saveCustomer()
      .then(result => {
        console.log('comple');
        return result;
      })
      .catch(err => {
        console.log(err);
      });

  }

  async saveCustomer() {
    if (this.customer.name == undefined) {
      alert('Vui lòng nhập họ tên');
      return false;
    }
    if (this.customer.email == undefined) {
      alert('Vui lòng nhập email');
      return false;
    }
    let checkEmail= this.emailIsValid(this.customer.email);
    if (checkEmail===false){
      alert('Vui lòng nhập email đúng định dạng');
      return false;
    }
    if (this.customer.addressShip == undefined) {
      alert('Vui lòng nhập số diện thoại');
      return false;
    }
    if (this.saveSuccess == false) {
      this.customer.md5 = this.md5;
      this.customer.type = 1;
      localStorage.setItem('token', JSON.stringify(this.md5));
      localStorage.setItem('user', JSON.stringify(this.customer));
      this.customerService.addCustomer(this.customer).subscribe(() => this.goBack());
      this.saveSuccess = true;
      console.log('dăng ky thanh cong ' + this.md5);
    }
  };
  emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  getMd5() {
    let date = new Date();
    console.log(date.getMinutes());
    this.md5 = '';
    this.md5 = this.md5 + date.getMilliseconds();
    this.md5 = this.md5 + date.getSeconds();
    this.md5 = this.md5 + date.getMinutes();
    if (this.customer.districtId > 0) {
      this.md5 = this.md5 + this.customer.districtId;
    }
    if (this.customer.provinceId > 0) {
      this.md5 = this.md5 + this.customer.provinceId;
    }
  }

  goBack(): void {
    if (this.saveSuccess === true) {
      alert('đăng ký thành công');
      this.router.navigate(['/']);
    }
  }
}

