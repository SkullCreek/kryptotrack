import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent,
  children: [
    { path: 'home', loadChildren: () => import('../dashboard/home/home.module').then(m => m.HomeModule) },
    { path: 'settings', loadChildren: () => import('../dashboard/settings/settings.module').then(m => m.SettingsModule) }
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
