import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficesComponent} from './offices.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./offices.routes";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        HttpModule
    ],
    declarations: [OfficesComponent]
})
export class OfficesModule {
}
