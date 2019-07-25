import { Subscription } from 'rxjs';
import { DataCollectionService } from './../service/data-collection.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OpeningHours } from '../modal/dataModal';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent implements OnInit {
  openingHours: OpeningHours;
  isLoading: boolean = false;
  subscription1: Subscription;
  dataToEdit: any;
  showEditModal: boolean = false;
  timeToSplit: any;
  timeFromSplit: any;
  shopDetails: any;
  showStoreDetails: boolean = false;
  timeDetails: boolean = false;
  subscription2: Subscription;
  subscription3: Subscription;
  visitDetails: any;

  // data
  lineChartData: Array<number>;
  labelMFL: Array<any>;
  lineChartLabels: Array<any>;
  public SystemName: string = "Visits";

  // data
  // public lineChartData: Array<number> = [ 1,8,49];

  // public labelMFL: Array<any> = [
  //     { data: this.lineChartData,
  //       label: this.SystemName
  //     }
  // ];
  // // labels
  // public lineChartLabels: Array<any> = ["2018-01-29 10:00:00", "2018-01-29 10:27:00", "2018-01-29 10:28:00"];
  showChart: boolean = false;
  maxLabel = 50;

  constructor(private toastr: ToastrService, public router: Router, private datacollectionservice: DataCollectionService) { }

  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          max : this.maxLabel,
          min : 0,
        }
      }],
      xAxes: [{


        }],
    },
      plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        //color: "#2756B3",
        color: "#222",
        font: {
          family: 'FontAwesome',
          size: 14
        },

      },
      deferred: false

    },

  };

   _lineChartColors: Array<any> = [{
       backgroundColor: 'red',
        borderColor: 'red',
        pointBackgroundColor: 'red',
        pointBorderColor: 'red',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      }];



  public ChartType = 'bar';

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
    let currentUser = localStorage.getItem('UserID');
    if (currentUser) {
      this.Getplaceopeninghours();
      this.Getstoredetail();
      this.StoreDashboardVisitsplot("from_date=2019-01-01&to_date=2019-05-01");
    } else {
      this.router.navigate(['login']);
    }
  }

  // GET request for opening hours data
  Getplaceopeninghours() {
    this.isLoading = true;
    this.subscription1 =
    this.datacollectionservice.Getplaceopeninghours()
      .subscribe(data => {

        this.openingHours = JSON.parse(JSON.stringify(data));
        console.log(this.openingHours);
        this.timeDetails = true;
        this.isLoading = false;
      },
        (err: HttpErrorResponse) => {
          // debugger;
          if (err.status == 401) {
            this.router.navigated = false;
            this.router.navigate(['login']);
            localStorage.clear();
            return null;
          } else if (err.status == 404) {
            this.toastr.info('No record found.', 'Oops');
          } else {
            this.toastr.error(err.error.Message, 'Oops');
          }
          this.isLoading = false;
        });
  }

  Getstoredetail() {
    this.isLoading = true;
    this.subscription2 =
    this.datacollectionservice.Getstoredetail()
      .subscribe(data => {

        this.shopDetails = JSON.parse(JSON.stringify(data));
        console.log(this.shopDetails);
        this.showStoreDetails = true;
        this.isLoading = false;
      },
        (err: HttpErrorResponse) => {
          // debugger;
          if (err.status == 401) {
            this.router.navigated = false;
            this.router.navigate(['login']);
            localStorage.clear();
            return null;
          } else if (err.status == 404) {
            this.toastr.info('No record found.', 'Oops');
          } else {
            this.toastr.error(err.error.Message, 'Oops');
          }
          this.isLoading = false;
        });
  }

  StoreDashboardVisitsplot(query) {
    this.showChart = false;
    this.lineChartData = [];
    this.labelMFL = [];
    this.lineChartLabels = []
    this.isLoading = true;
    this.subscription3 =
    this.datacollectionservice.StoreDashboardVisitsplot(query)
      .subscribe(data => {
        debugger;
        this.visitDetails = JSON.parse(JSON.stringify(data));
        console.log(this.visitDetails.visits, "storedetails");
        for (let i = 0; i < this.visitDetails.visits.length; i++) {
          this.lineChartData.push(this.visitDetails.visits[i].count);
          this.lineChartLabels.push(this.visitDetails.visits[i].date);
        }
        this.labelMFL = [
          {
            data: this.lineChartData,
            label: 'Visits'
          }
        ];
        this.maxLabel = Math.max.apply(Math, this.lineChartData) + 5;
        this.lineChartOptions = {
          responsive: true,
          scales : {
            yAxes: [{
              ticks: {
                max : this.maxLabel,
                min : 0,
              }
            }],
            xAxes: [{


              }],
          },
            plugins: {
            datalabels: {
              display: true,
              align: 'top',
              anchor: 'end',
              //color: "#2756B3",
              color: "#222",
              font: {
                family: 'FontAwesome',
                size: 14
              },

            },
            deferred: false

          },

        };
        this.showChart = true;
        // this.showStoreDetails = true;
        this.isLoading = false;
      },
        (err: HttpErrorResponse) => {
          // debugger;
          if (err.status == 401) {
            this.router.navigated = false;
            this.router.navigate(['login']);
            localStorage.clear();
            return null;
          } else if (err.status == 404) {
            this.toastr.info('No record found.', 'Oops');
          } else {
            this.toastr.error(err.error.Message, 'Oops');
          }
          this.isLoading = false;
          this.showChart = false;
        });
  }



  edittime(data) {
    this.dataToEdit = data;
    this.timeFromSplit = this.dataToEdit.from_hour.split(":");
    this.timeToSplit = this.dataToEdit.to_hour.split(":");
    console.log(this.dataToEdit);
    if (this.dataToEdit) {
      this.showEditModal = true;
    }
  }

  OnSaveTime() {

  }

  searchVisitdata(fromDate, toDate) {
    debugger;
    let query = '';
    var oneDay = 24 * 60 * 60 * 1000;
    let fDate = new Date(fromDate.value);
    let tDate = new Date(toDate.value);
    let diffDays = Math.round((tDate.getTime() - fDate.getTime()) / (oneDay));
    if (diffDays <= 0) {
      // this.diffDays = 0;
      this.toastr.error("From date to be less than To Date");
    } else {
      if (fromDate.value && toDate.value) {
          query = "from_date=" + fromDate.value + "&" +  "to_date=" + toDate.value;
          this.StoreDashboardVisitsplot(query);
      }
    }
  }


}
