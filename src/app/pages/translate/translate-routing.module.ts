import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateComponent } from './translate.component';
import { TranslatesComponent } from './translates/translates.component';
import { TranslateAddComponent } from './translate-add/translate-add.component';
const routes: Routes = [{
  path: '',
  component: TranslateComponent,
  children: [
    {
      path: 'translates/:type',
      component: TranslatesComponent,
    },
    {
      path: 'translate/add',
      component: TranslateAddComponent,
    },
    {
      path: 'translate/:id/edit',
      component: TranslateAddComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslateRoutingModule { }

export const routedComponents = [
  TranslateComponent,
  TranslatesComponent,
  TranslateAddComponent
];
