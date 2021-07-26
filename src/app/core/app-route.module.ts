import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AppAuthGuard } from './app-auth-guard';
import { LoggedInAuthGuard } from './loggedIn-auth-guard';
import { HomeComponent } from '../home/home.component';
import { CheckoutComponent } from '../checkout/checkout.component';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AppAuthGuard],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AppAuthGuard],
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInAuthGuard],
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  providers: [AppAuthGuard, LoggedInAuthGuard],
})
export class AppRoutingModule {}
