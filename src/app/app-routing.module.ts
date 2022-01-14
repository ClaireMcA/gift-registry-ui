import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { SkipLoginGuard } from './auth/skip-login.guard';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './layout/details/details.component';
import { RegistryItemsComponent } from './registry-items/registry-items.component';
import { RsvpHomeComponent } from './rsvp/rsvp-home/rsvp-home.component';

const routes: Routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full', canActivate: [SkipLoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'rsvp-home', component: RsvpHomeComponent, canActivate: [AuthGuard] },
  // { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'registry-items', component: RegistryItemsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
