import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'basic',
      loadChildren: () => import('./basic/basic.module')
        .then(m => m.BasicModule),
    },
    {
      path: 'salary',
      loadChildren: () => import('./salary/salary.module')
        .then(m => m.SalaryModule),
    },
    {
      path: 'translate',
      loadChildren: () => import('./translate/translate.module')
        .then(m => m.TranslateModule),
    },
    {
      path: 'homepage',
      loadChildren: () => import('./homepage/homepage.module')
        .then(m => m.HomepageModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
