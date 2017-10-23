import { Routes } from '@angular/router';

import { AdministratorComponent } from './administrator.component';
import { ROUTES as UsersRoutes } from './users/users.routes';

export const ROUTES: Routes = [
    { path: 'administrator', component: AdministratorComponent, children: [
        ...UsersRoutes,
    ]}
];