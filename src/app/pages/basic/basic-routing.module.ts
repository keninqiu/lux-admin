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
import { EmployersComponent } from './employers/employers.component';
import { CategoriesComponent } from './categories/categories.component';
import { SchoolAddComponent } from './school-add/school-add.component';
import { JobAddComponent } from './job-add/job-add.component';
import { EmployerAddComponent } from './employer-add/employer-add.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CertificationAddComponent } from './certification-add/certification-add.component';
import { CityAddComponent } from './city-add/city-add.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { DegreeAddComponent } from './degree-add/degree-add.component';
import { IndustryAddComponent } from './industry-add/industry-add.component';
import { SkillAddComponent } from './skill-add/skill-add.component';
import { StateAddComponent } from './state-add/state-add.component';
const routes: Routes = [{
  path: '',
  component: BasicComponent,
  children: [
    {
      path: 'countries',
      component: CountriesComponent,
    },
    {
      path: 'country/add',
      component: CountryAddComponent,
    },
    {
      path: 'country/:id/edit',
      component: CountryAddComponent,
    },
    {
      path: 'states',
      component: StatesComponent,
    },
    {
      path: 'state/add',
      component: StateAddComponent,
    },
    {
      path: 'state/:id/edit',
      component: StateAddComponent,
    },
    {
      path: 'cities',
      component: CitiesComponent,
    },
    {
      path: 'city/add',
      component: CityAddComponent,
    },
    {
      path: 'city/:id/edit',
      component: CityAddComponent,
    },
    {
      path: 'categories',
      component: CategoriesComponent,
    },
    {
      path: 'category/add',
      component: CategoryAddComponent,
    },
    {
      path: 'category/:id/edit',
      component: CategoryAddComponent,
    },
    {
      path: 'jobs',
      component: JobsComponent,
    },
    {
      path: 'job/add',
      component: JobAddComponent,
    },
    {
      path: 'job/:id/edit',
      component: JobAddComponent,
    },
    {
      path: 'employers',
      component: EmployersComponent,
    },
    {
      path: 'employer/add',
      component: EmployerAddComponent,
    },
    {
      path: 'employer/:id/edit',
      component: EmployerAddComponent,
    },
    {
      path: 'degrees',
      component: DegreesComponent,
    },
    {
      path: 'degree/add',
      component: DegreeAddComponent,
    },
    {
      path: 'degree/:id/edit',
      component: EmployerAddComponent,
    },
    {
      path: 'industries',
      component: IndustriesComponent,
    },
    {
      path: 'industry/add',
      component: IndustryAddComponent,
    },
    {
      path: 'industry/:id/edit',
      component: IndustryAddComponent,
    },
    {
      path: 'schools',
      component: SchoolsComponent,
    },
    {
      path: 'school/add',
      component: SchoolAddComponent,
    },
    {
      path: 'school/:id/edit',
      component: SchoolAddComponent,
    },
    {
      path: 'certifications',
      component: CertificationsComponent,
    },
    {
      path: 'certification/add',
      component: CertificationAddComponent,
    },
    {
      path: 'certification/:id/edit',
      component: CertificationAddComponent,
    },
    {
      path: 'skills',
      component: SkillsComponent,
    },
    {
      path: 'skill/add',
      component: SkillAddComponent,
    },
    {
      path: 'skill/:id/edit',
      component: SkillAddComponent,
    },
    {
      path: 'categories',
      component: CategoriesComponent,
    },
    {
      path: 'category/add',
      component: CategoryAddComponent,
    },
    {
      path: 'category/:id/edit',
      component: CategoryAddComponent,
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
  EmployersComponent,
  SchoolsComponent,
  DegreesComponent,
  CertificationsComponent,
  SkillsComponent,
  IndustriesComponent,
  CategoriesComponent,
  SchoolAddComponent,
  JobAddComponent,
  EmployerAddComponent, 
  CategoryAddComponent, 
  CertificationAddComponent, 
  CityAddComponent, 
  CountryAddComponent, 
  DegreeAddComponent,
  IndustryAddComponent,
  SkillAddComponent,
  StateAddComponent
];
