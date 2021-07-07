import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginGuard } from './services/login.guard';
const routes: Routes = [
  {
    path: "" ,component : IndexComponent,
    canActivate:[LoginGuard]
  },{
    path : "home",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
