import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'canvasjs';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  public pieChartLabels:string[] = ["Running shoes", "Walking shoes", "Training shoes", "Nike", "Adidas"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]}

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }
}
