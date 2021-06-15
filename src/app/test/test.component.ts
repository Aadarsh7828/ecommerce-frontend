import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { SellerOrderService } from '../services/seller-order.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {



  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('radarCanvas') private radarCanvas: ElementRef;

  pieChart: any;
  lineChart: any;
  barChart:any;
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
    // this.sellerOrderService.getMonthlyRevenue(this.sellerId, 2011).subscribe(response=>{
    //   console.log(response);
    //   this.thisYear  = response;
    //   this.sellerOrderService.getMonthlyRevenue(this.sellerId, 2010).subscribe(data=>{
    //     this.lastYear = data;
    //     this.pieChartBrowser();
    //   });

    // });
    
  }
  pieChartBrowser(): void {
    if(this.lastYear.length == 0 && this.thisYear.length == 0)
    {
      return;
    }
    let labels = Object.keys(this.thisYear);
    labels.map(month=>month.substr(0,3));
    let data1 = Object.values(this.thisYear);
    let data2 = Object.values(this.lastYear);
    console.log(labels);
    console.log(data1);
    console.log(data2);
    this.lineChart  = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "This Year",
          fill: !0,
          backgroundColor: "rgba(220,220,220,.3)",
          borderColor: "rgba(220,220,220,1)",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: data1
      }, {
          label: "Last Year",
          fill: !0,
          backgroundColor: "rgba(171, 227, 125, .3)",
          borderColor: "rgba(171, 227, 125, 1)",
          pointBackgroundColor: "rgba(171, 227, 125, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(171, 227, 125, 1)",
          data: data2
      }]
      }
    });
    this.barChart  = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "This Year",
          fill: !0,
          backgroundColor: "rgba(220,220,220,.3)",
          borderColor: "rgba(220,220,220,1)",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: data1
      }, {
          label: "Last Year",
          fill: !0,
          backgroundColor: "rgba(171, 227, 125, .3)",
          borderColor: "rgba(171, 227, 125, 1)",
          pointBackgroundColor: "rgba(171, 227, 125, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(171, 227, 125, 1)",
          data: data2
      }]
      }
    });
    this.radarChart  = new Chart(this.radarCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: "This Year",
          fill: !0,
          backgroundColor: "rgba(220,220,220,.3)",
          borderColor: "rgba(220,220,220,1)",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: data1
      }, {
          label: "Last Year",
          fill: !0,
          backgroundColor: "rgba(171, 227, 125, .3)",
          borderColor: "rgba(171, 227, 125, 1)",
          pointBackgroundColor: "rgba(171, 227, 125, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(171, 227, 125, 1)",
          data: data2
      }]
      }
    });
  }

}
