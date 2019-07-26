import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  subscription1: Subscription;
  isLoading: boolean = false;

  constructor(private toastr: ToastrService, public router: Router, private authservice: AuthServiceService) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['mydashboard']);
  }

  logout() {
    this.isLoading = true;
    let authkey = localStorage.getItem('userToken');
    let logoutkey = {
      key: authkey
    };
    this.authservice.AuthanticationLogout(logoutkey)
      .subscribe(data => {
        // console.log(JSON.parse(JSON.stringify(data)).detail);
        this.toastr.success(JSON.parse(JSON.stringify(data)).detail);
        localStorage.clear();
        this.router.navigate(['login']);
      }, (err: HttpErrorResponse) => {
        // debugger;
        this.isLoading = false;
        this.toastr.error('Username or password entered is wrong.');
        if (err.status == 401) {
          this.router.navigated = false;
          this.router.navigate(['login']);
          return null;
        } else {
          this.toastr.error(err.error.Message, 'Oops');
        }
        this.isLoading = false;
      });
  }

}
