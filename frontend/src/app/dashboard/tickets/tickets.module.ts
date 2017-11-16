import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketsComponent} from './tickets.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./tickets.routes";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        HttpModule
    ],
    declarations: [TicketsComponent]
})
export class TicketsModule {
}
