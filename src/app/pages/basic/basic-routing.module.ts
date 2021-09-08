import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from './basic.component';
import { CountriesComponent } from './countries/countries.component';
import { StatesComponent } from './states/states.component';
import { CitiesComponent } from './cities/cities.component';

const routes: Routes = [{
  path: '',
  component: BasicComponent,
  children: [
    {
      path: 'countries',
      component: CountriesComponent,
    },
    {
      path: 'states',
      component: StatesComponent,
    },
    {
      path: 'cities',
      component: CitiesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRoutingModule { }

export const routedComponents = [
  BasicComponent,
  CountriesComponent,
  CitiesComponent,
];
