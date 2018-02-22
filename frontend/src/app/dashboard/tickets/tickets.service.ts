import { Injectable } from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class TicketsService {
  public headers: any;

  constructor(
      private http: HttpClient,
      private cookieService: CookieService
  ) {
    this.headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get('token')})
  }

  getIndex(url): Observable<any> {
    // get users from api
    return this.http.get(url, {headers: this.headers})
        .map((response) => response);
  }
}
