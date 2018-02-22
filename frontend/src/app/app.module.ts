import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginModule} from "./login/login.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {RouterModule, PreloadAllModules, Router} from '@angular/router';
import {ROUTES} from './app.routes';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AppConfigModule} from './app.config.module';
import {HttpClientModule} from '@angular/common/http';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
} from '@angular/material';
import {AuthGuard} from "./_guard/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {TicketsService} from "./dashboard/tickets/tickets.service";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppConfigModule,
        LoginModule,
        DashboardModule,
        RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        HttpClientModule,
    ],
    providers: [
        CookieService,
        AuthGuard,
        AuthenticationService,
        TicketsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
