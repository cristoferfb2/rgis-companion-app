import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HasDataGuard } from './guards/has-data.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [ IsLoginGuard, HasDataGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'loading', component: LoaderComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
