import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { GabsComponent } from '../../pages/gabs/gabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AgGridModule } from 'ag-grid-angular';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { GabDialogComponent } from 'src/app/components/gab-dialog/gab-dialog.component';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';
// import { ToastrModule } from 'ngx-toastr';

ModuleRegistry.registerModules([ ServerSideRowModelModule ]);


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  
    ClipboardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    AgGridModule,
    MatIconModule,
    MatDialogModule

   
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    GabsComponent,
    IconsComponent,
    MapsComponent,
    TransactionsComponent ,
    GabDialogComponent
    //LoaderComponent

  ],

})

export class AdminLayoutModule {}
