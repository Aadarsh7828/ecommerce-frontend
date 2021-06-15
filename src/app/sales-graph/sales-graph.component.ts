import { Component, ElementRef, OnInit, ViewChild, ɵɵtrustConstantResourceUrl } from '@angular/core';
import * as Chart from 'chart.js';
import { SellerOrderService } from '../services/seller-order.service';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('radarCanvas') private radarCanvas: ElementRef;
  yearsList = [2009,2010,2011,2013,2014,2015,2016,2017,2018,2019,2020,2021];
  monthList = ["January","February","March","April","May","June","July","August",
              "September","October","November","December"];
  startMonth = 'January';
  endMonth = 'December';
  pieChart: any = null;
  lineChart: any = null;
  barChart:any = null;
  radarChart:any;
  thisYear = [];
  lastYear = [];
  sellerId = 2707;
  constructor(private sellerOrderService: SellerOrderService) {

  }
  ngOnInit(): void {
   // this.loadScript('assets/js/hello.js');
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit(): void {
    let startMonth = this.monthList[0].toUpperCase();
    let endMonth = this.monthList[11].toUpperCase();
    this.sellerOrderService.getMonthlyRevenue(this.sellerId, 2011,startMonth,endMonth).subscribe(response=>{
      console.log(response);
      this.thisYear  = response;
      this.pieChartBrowser();
      

    });
    
  }
  monthlyRevenue(frm)
  {
    console.log("monthly revenue");
    console.log(frm);
    let year = frm.value.year;
    let startMonth = frm.value.startMonth.toUpperCase();
    let endMonth = frm.value.endMonth.toUpperCase();
    this.sellerOrderService.getMonthlyRevenue(this.sellerId, year,startMonth, endMonth).subscribe(response=>{
      console.log(response);
      this.thisYear  = response;
      this.pieChartBrowser();
      

    });
  }
  onSubmit(frm)
  {
    console.log(frm)
    let startDate = frm.value.startDate;
    let endDate = frm.value.endDate;
    let startYear = Number(startDate.substr(0, 4));
    let endYear = Number(endDate.substr(0,4));
    this.sellerOrderService.getYearlyRevenue(this.sellerId, startYear,endYear).subscribe(response=>{
      console.log(response);
      this.thisYear = [];
      this.pieChartBrowser();
      this.thisYear  = response;
      this.pieChartBrowser();
      

    });

  }
  clearChart()
  {
    if(this.lineChart != null)
    {
      this.lineChart.destroy();
    }
    if(this.barChart != null)
    {
      this.barChart.destroy();
    }
    if(this.radarChart != null)
    {
      this.radarChart.destroy();
    }
    // console.log(this.lineChart)
    // this.lineChart.data.labels.pop();
    // this.lineChart.data.datasets.forEach((dataset) => {
    //     dataset.data.pop();
    // });
    // this.lineChart.update();
    // this.barChart.data.labels.pop();
    // this.barChart.data.datasets.forEach((dataset) => {
    //     dataset.data.pop();
    // });
    // this.barChart.update();
  }
  pieChartBrowser(): void {
    if(this.lastYear.length == 0 && this.thisYear.length == 0)
    {
      return;
    }
    let labels = Object.keys(this.thisYear);
    labels.map(month=>month.substr(0,3));
    let data1 = Object.values(this.thisYear);
    //let data2 = Object.values(this.lastYear);
    console.log(labels);
    console.log(data1);
    if(this.lineChart != null)
    {
      this.lineChart.destroy();
    }
    if(this.barChart != null)
    {
      this.barChart.destroy();
    }
    if(this.radarChart != null)
    {
      this.radarChart.destroy();
    }
    this.lineChart  = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Year-wise",
          fill: !0,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132))",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          borderWidth: 1,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: data1
      }]
      }
    });
    this.barChart  = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "Year-wise",
          fill: !0,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132))",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          borderWidth: 1,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: data1
      }]
      }
    });
    this.radarChart  = new Chart(this.radarCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: "Year-wise",
          fill: !0,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132))",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          borderWidth: 1,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: data1
      }]
      }
    });
  }
}
