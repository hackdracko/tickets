import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ROUTES} from "./login.routes";
import {RouterModule} from "@angular/router";
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatButtonModule, MatGridListModule} from "@angular/material";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatInputModule, MatButtonModule, MatGridListModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        HttpModule
    ],
    declarations: [LoginComponent],
    exports: [MatInputModule]
})
export class LoginModule {
}
