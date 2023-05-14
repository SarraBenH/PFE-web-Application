import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { GabsComponent } from '../../pages/gabs/gabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AgGridModule } from 'ag-grid-angular';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { GabDialogComponent } from 'src/app/components/gab-dialog/gab-dialog.component';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';
import { NgxChartsModule  } from '@swimlane/ngx-charts';
import { MatCardModule } from "@angular/material/card";
import { BrowserModule  } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InterfacesComponent } from 'src/app/pages/interfaces/interfaces.component';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';



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
    MatDialogModule,
    NgxChartsModule,
    MatCardModule ,
    MatAutocompleteModule
   // BrowserModule,
    //BrowserAnimationsModule


  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ProfileComponent,
    GabsComponent,
    InterfacesComponent,
    IconsComponent,
    MapsComponent,
    TransactionsComponent ,
    GabDialogComponent,
    MessageDialogComponent
    //LoaderComponent

  ],

})

export class AdminLayoutModule {}
