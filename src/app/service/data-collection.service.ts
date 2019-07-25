import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataCollectionService {

  constructor(private http: HttpClient) { }

  // GET Request place opening hours
  Getplaceopeninghours() {
    let authKey = 'Token ' + localStorage.getItem('userToken');
    return this.http.get('http://testapi.halanx.com/places/place/1/openinghours/', {
      headers: new HttpHeaders().set('Authorization', authKey)
    });
  }

  // Patch Request updating opening hours
  Updateopeninghoursofplace(_crl) {
    const authKey = 'Token ' + localStorage.getItem('userToken');
    return this.http.patch('http://testapi.halanx.com/places/place/1/openinghours/', _crl, {
      headers: new HttpHeaders().set('Authorization', authKey)
    });
  }

  Getstoredetail() {
    let authKey = 'Token ' + localStorage.getItem('userToken');
    return this.http.get('http://testapi.halanx.com/stores/', {
      headers: new HttpHeaders().set('Authorization', authKey)
    });
  }

  // GET for dashboard data
  StoreDashboardVisitsplot(query) {

    const authKey = 'Token ' + localStorage.getItem('userToken');
    return this.http.get('http://testapi.halanx.com/stores/dashboard/plots/?visits=true&' + query, {
      headers: new HttpHeaders().set('Authorization', authKey)
    });
  }
}
