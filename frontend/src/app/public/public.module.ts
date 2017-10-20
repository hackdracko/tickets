import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { PublicComponent } from './public.component';
import {ROUTES} from "./public.routes";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [PublicComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    LoginModule,
  ]
})
export class PublicModule { }
