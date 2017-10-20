import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {ROUTES} from "./login.routes";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    CommonModule,
    HttpModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
