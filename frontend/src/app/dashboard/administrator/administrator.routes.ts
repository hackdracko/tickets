import { Routes } from '@angular/router';

import { AdministratorComponent } from './administrator.component';
import { ROUTES as UsersRoutes } from './users/users.routes';
import { ROUTES as ClientsRoutes } from './clients/clients.routes';
import { ROUTES as OfficesRoutes } from './offices/offices.routes';

export const ROUTES: Routes = [
    { path: 'administrator', component: AdministratorComponent, children: [
        ...UsersRoutes,
        ...ClientsRoutes,
        ...OfficesRoutes,
    ]}
];