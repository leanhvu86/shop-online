import { Component, OnInit } from '@angular/core';
import {CartService} from '../../shared/service/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cartService: CartService ) { }
  ngOnInit() {

  }
   openNav():void {
     // this.cartService.getsCarts();

    document.getElementById("mySidebar").style.width = "250px";
  }

   closeNav():void {
    document.getElementById("mySidebar").style.width = "0";
  }

}
