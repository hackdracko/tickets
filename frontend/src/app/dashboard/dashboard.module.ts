import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {ROUTES} from './dashboard.routes';
import {HttpModule} from '@angular/http';
import {AdministratorModule} from "./administrator/administrator.module";
import {TicketsModule} from "./tickets/tickets.module";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        HttpModule,
        AdministratorModule,
        TicketsModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {
}
