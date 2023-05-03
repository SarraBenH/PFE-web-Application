import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import fr from '@angular/common/locales/fr';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BtnCustomComponent } from './components/btn-custom/btn-custom.component';
import { MatDialogModule } from '@angular/material/dialog';


registerLocaleData(fr);


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoaderComponent,
    BtnCustomComponent

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
