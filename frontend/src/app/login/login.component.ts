import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse} from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    cookieValue = 'UNKNOWN';

  /**
   * Login Form Group reference
   *
   * @type {boolean}
   */
  public FormGroup: FormGroup;

  constructor(
      private router: Router,
      private http: Http,
      public FormBuilder: FormBuilder,
      private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.FormGroup = this.FormBuilder.group({
      username: [ null,
        Validators.compose([
          Validators.required, Validators.minLength(4)
        ])
      ],
      password: [ null,
        Validators.compose([
          Validators.required, Validators.minLength(6)
        ])
      ],
    });
  }

  login(){
    let data = this.FormGroup.value;
    const body = {
                    email: 'admin@admin.com',
                    password: 'Rj1m3n3z'};
    const headers = {
          'accept'        : 'application/json',
          'Cache-Control' : 'no-cache',
          'Pragma'        : 'no-cache'
      };
      this.http.post('http://tickets.local/api/authorize', body, headers)
          .subscribe(data =>
              {
                  let json = data.json();
                  this.cookieService.set('token', json.token);
                  this.router.navigate(['/dashboard']);
                  //let test = this.cookieService.get('token');
              },
      (err: HttpErrorResponse) => {
              console.log(err.status);
              alert(err.statusText);
      });

      /*this.http.get('http://tickets.local/api/authorize').subscribe(data => {
              console.log(data);
          },
          err => {
              console.log("error");
      });*/
  }

}
