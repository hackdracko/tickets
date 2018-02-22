import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ROUTES as AdministratorRoutes } from './administrator/administrator.routes';
import { ROUTES as TicketsRoutes } from './tickets/tickets.routes';
import {AuthGuard} from "../_guard/auth.guard";

export const ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
        ...AdministratorRoutes,
        ...TicketsRoutes,
    ]}
];