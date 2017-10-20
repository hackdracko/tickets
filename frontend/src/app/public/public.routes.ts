import { Routes } from '@angular/router';

import {PublicComponent} from "./public.component";
import { ROUTES as LoginRoutes } from './login/login.routes';

export const ROUTES: Routes = [
    { path: 'public', component: PublicComponent, children: [
        { path: '', redirectTo: '', pathMatch: 'full' },
        ...LoginRoutes,
    ]}
];
