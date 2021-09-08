import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { BasicRoutingModule, routedComponents } from './basic-routing.module';
import { StatesComponent } from './states/states.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompaniesComponent } from './companies/companies.component';
import { SchoolsComponent } from './schools/schools.component';
import { DegreesComponent } from './degrees/degrees.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SkillsComponent } from './skills/skills.component';
import { IndustriesComponent } from './industries/industries.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    BasicRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    StatesComponent,
    JobsComponent,
    CompaniesComponent,
    SchoolsComponent,
    DegreesComponent,
    CertificationsComponent,
    SkillsComponent,
    IndustriesComponent,
  ],
})
export class BasicModule { }
