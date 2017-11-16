import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorComponent} from './administrator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./administrator.routes";
import {HttpModule} from "@angular/http";
import {UsersModule} from "./users/users.module";
import {ClientsModule} from "./clients/clients.module";
import {OfficesModule} from "./offices/offices.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        HttpModule,
        UsersModule,
        ClientsModule,
        OfficesModule
    ],
    declarations: [AdministratorComponent]
})
export class AdministratorModule {
}
