import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ROUTES as AdministratorRoutes } from './administrator/administrator.routes';
import { ROUTES as ClientsRoutes } from './clients/clients.routes';

export const ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, children: [
        ...AdministratorRoutes,
        ...ClientsRoutes,
    ]}
];