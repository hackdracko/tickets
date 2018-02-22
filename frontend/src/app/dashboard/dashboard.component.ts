import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../_services/authentication.service";
import {APP_CONFIG, AppConfig} from "../app.config.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(fb: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });
  }

  ngOnInit() {
  }
  options: FormGroup;

  logout() {
    this.authenticationService.logout();
  }

}
