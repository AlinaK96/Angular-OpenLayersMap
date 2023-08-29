import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [
  {
    path:'',
    loadComponent: () => import('./pages/login/login.component').then((mod) => mod.LoginComponent)
  },
  {
    path:'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((mod) => mod.DashboardComponent)
  },
  {
    path:'profile',
    loadComponent: () => import('./pages/profile/profile.component').then((mod) => mod.ProfileComponent)
  },
  {
    path:'animation',
    loadComponent: () => import('./pages/animation/animation.component').then((mod) => mod.AnimationComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
