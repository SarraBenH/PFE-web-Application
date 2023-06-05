import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { GabsComponent } from '../../pages/gabs/gabs.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';
import { InterfacesComponent } from 'src/app/pages/interfaces/interfaces.component';
import { CassetteComponent } from 'src/app/pages/cassette/cassette.component';
import { TpeComponent } from 'src/app/pages/tpe/tpe.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',
        component: DashboardComponent ,
        canActivate: [AuthGuard]
 },
    { path: 'user-profile',   component: UserProfileComponent,     canActivate: [AuthGuard]},
    { path: 'profile/:id',   component: ProfileComponent,     canActivate: [AuthGuard]},
    { path: 'gabs',         component: GabsComponent ,     canActivate: [AuthGuard]},
    { path: 'cassette',         component: CassetteComponent ,     canActivate: [AuthGuard]},
    { path: 'tpe',         component: TpeComponent ,     canActivate: [AuthGuard]},
    { path: 'transactions',         component: TransactionsComponent ,     canActivate: [AuthGuard]},
    { path: 'interfaces',         component: InterfacesComponent ,     canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent,     canActivate: [AuthGuard]},
    { path: 'maps',           component: MapsComponent ,     canActivate: [AuthGuard]
}
];
