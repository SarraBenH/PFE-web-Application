import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { GabsComponent } from '../../pages/gabs/gabs.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard/:id',
        component: DashboardComponent ,
        canActivate: [AuthGuard]
 },
    { path: 'user-profile/:id',   component: UserProfileComponent,     canActivate: [AuthGuard]},
    { path: 'profile/:id',   component: ProfileComponent,     canActivate: [AuthGuard]},
    { path: 'gabs/:id',         component: GabsComponent ,     canActivate: [AuthGuard]},
    { path: 'transactions/:id',         component: TransactionsComponent ,     canActivate: [AuthGuard]},

    { path: 'icons',          component: IconsComponent,     canActivate: [AuthGuard]
},
    { path: 'maps',           component: MapsComponent ,     canActivate: [AuthGuard]
}
];
