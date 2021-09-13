import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SalaryRoutingModule, routedComponents } from './salary-routing.module';
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

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    SalaryRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    CountriesComponent,
    StatesComponent,
    CitiesComponent,
    JobsComponent,
    DegreesComponent,
    IndustriesComponent,
    SchoolsComponent,
    CertificationsComponent,
    SkillsComponent,
    EmployersComponent,
    CategoriesComponent,

  ],
})
export class SalaryModule { }