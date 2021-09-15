import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule, 
  NbTabsetModule, 
  NbSelectModule,
  NbToastrModule,
  NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { BasicRoutingModule, routedComponents } from './basic-routing.module';
import { SchoolAddComponent } from './school-add/school-add.component';
import { JobAddComponent } from './job-add/job-add.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbTabsetModule,
    NbButtonModule,
    NbSelectModule,
    ThemeModule,
    BasicRoutingModule,
    FormsModule,
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    SchoolAddComponent,
    JobAddComponent,

  ],
})
export class BasicModule { }
