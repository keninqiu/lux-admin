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
import { TranslateRoutingModule, routedComponents } from './translate-routing.module';


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
    TranslateRoutingModule,
    FormsModule,
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents

  ],
})
export class TranslateModule { }
