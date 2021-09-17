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
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../../@theme/theme.module';
import { BasicRoutingModule, routedComponents } from './basic-routing.module';


import { CareerPathComponent, FsIconComponent } from './job-add/career-path/career-path.component';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbTabsetModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbSelectModule,
    ThemeModule,
    BasicRoutingModule,
    FormsModule,
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    CareerPathComponent,
    FsIconComponent

  ],
})
export class BasicModule { }
