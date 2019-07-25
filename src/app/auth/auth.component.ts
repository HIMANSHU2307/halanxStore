import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../service/auth-service.service';
import { DataCollectionService } from '../service/data-collection.service';
import { UserDetail } from '../modal/AuthModal';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  username = '';
  password: '';

  authData: UserDetail;
  authkey: any;
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(private toastr: ToastrService, public router: Router, private authservice: AuthServiceService) { }

  ngOnInit() {
  }

  AuthanticationLogin(authData) {
    debugger;
    this.subscription1 =
    this.authservice.AuthenticationLogin(authData)
      .subscribe(data => {
        // console.log(JSON.parse(JSON.stringify(data)).key);
        this.authkey = JSON.parse(JSON.stringify(data)).key;
        localStorage.setItem('userToken', this.authkey);
        // alert(this.authkey);
      }, (err: HttpErrorResponse) => {
        // debugger;
        this.isLoading = false;
        this.toastr.error('Username or password entered is wrong.');
        if (err.status == 401) {
          this.toastr.error(err.error.Message, 'Please try again.');
          this.router.navigated = false;
          this.router.navigate(['login']);
          return null;
        } else {
          this.toastr.error(err.error.Message, 'Oops');
        }
        this.isLoading = false;
      });
  }


  login() {
    debugger;
    if (this.username) {
      this.authData = new UserDetail();
      this.authData.username = this.username;
      this.authData.password = this.password;
      this.AuthanticationLogin(this.authData);
      this.router.navigate(['mydashboard']);
      localStorage.setItem('UserID', this.username);
    } else {
      this.toastr.error("Login credentials cannot be empty.");
    }
  }

  logout() {
    let logoutkey = {
      key: this.authkey
    };
    this.subscription2 =
    this.authservice.AuthanticationLogout(logoutkey)
      .subscribe(data => {
        console.log(JSON.parse(JSON.stringify(data)).detail);
        this.toastr.success(JSON.parse(JSON.stringify(data)).detail);
        localStorage.clear();
        this.router.navigate(['login']);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
