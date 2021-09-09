import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from './basic.component';
import { CountriesComponent } from './countries/countries.component';
import { StatesComponent } from './states/states.component';
import { CitiesComponent } from './cities/cities.component';
import { JobsComponent } from './jobs/jobs.component';
import { DegreesComponent } from './degrees/degrees.component';
import { IndustriesComponent } from './industries/industries.component';
import { SchoolsComponent } from './schools/schools.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SkillsComponent } from './skills/skills.component';
import { CompaniesComponent } from './companies/companies.component';
import { CategoriesComponent } from './categories/categories.component';

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
    {
      path: 'categories',
      component: CategoriesComponent,
    },
    {
      path: 'jobs',
      component: JobsComponent,
    },
    {
      path: 'companies',
      component: CompaniesComponent,
    },
    {
      path: 'degrees',
      component: DegreesComponent,
    },
    {
      path: 'industries',
      component: IndustriesComponent,
    },
    {
      path: 'schools',
      component: SchoolsComponent,
    },
    {
      path: 'certifications',
      component: CertificationsComponent,
    },
    {
      path: 'skills',
      component: SkillsComponent,
    },
    {
      path: 'categories',
      component: CategoriesComponent,
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
  StatesComponent,
  JobsComponent,
  CompaniesComponent,
  SchoolsComponent,
  DegreesComponent,
  CertificationsComponent,
  SkillsComponent,
  IndustriesComponent,
  CategoriesComponent,
];
