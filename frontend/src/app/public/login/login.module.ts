import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {ROUTES} from "./login.routes";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
