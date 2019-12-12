import {AuthenticationService} from '../../shared/service/authentication.service';
import {MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatSidenav} from '@angular/material';
import {AfterViewInit, Component, ElementRef, HostBinding, Injectable, OnInit, ViewChild} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {TranslateService} from '@ngx-translate/core';
import {AppSettings} from '../../app.settings';
import {Users} from '../../shared/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  reason = '';
  user: string;

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(
    private  authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser['lastName'];
    console.log(this.user);
  }
}
