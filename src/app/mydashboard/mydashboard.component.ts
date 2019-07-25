import { DataCollectionService } from './../service/data-collection.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OpeningHours } from '../modal/dataModal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent implements OnInit {
  openingHours: OpeningHours;
  isLoading: boolean = false;

  constructor(private toastr: ToastrService, public router: Router, private datacollectionservice: DataCollectionService) { }

  ngOnInit() {
    let currentUser = localStorage.getItem('UserID');
    if (currentUser) {
      this.Getplaceopeninghours();
    } else {
      this.router.navigate(['login']);
    }
  }

  // GET request for opening hours data
  Getplaceopeninghours() {
    this.isLoading = true;
    this.datacollectionservice.Getplaceopeninghours()
      .subscribe(data => {

        this.openingHours = JSON.parse(JSON.stringify(data));
        console.log(this.openingHours);
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
}
