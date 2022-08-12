import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { LastMonthCardComponent } from './components/dashboard/last-month-card/last-month-card.component';
import { LastMonthsCardComponent } from './components/dashboard/last-months-card/last-months-card.component';
import { LastInventoriesCardComponent } from './components/dashboard/last-inventories-card/last-inventories-card.component';
import { WelcomeCardComponent } from './components/dashboard/welcome-card/welcome-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutModalComponent } from './components/navbar/logout-modal/logout-modal.component';
import { SearchModalComponent } from './components/navbar/search-modal/search-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchComponent } from './components/search/search.component';
import {MatTableModule} from '@angular/material/table';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { WorksListComponent } from './components/commons/works-list/works-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    LastMonthCardComponent,
    LastMonthsCardComponent,
    LastInventoriesCardComponent,
    WelcomeCardComponent,
    NavbarComponent,
    LogoutModalComponent,
    SearchModalComponent,
    SearchComponent,
    WorksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  providers: [ HTTP, StatusBar ],
  bootstrap: [AppComponent]
})
export class AppModule { }
