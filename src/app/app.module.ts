/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth2.service';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { CityService } from './services/city.service';
import { CertificationService } from './services/certification.service';
import { EmployerService } from './services/employer.service';
import { DegreeService } from './services/degree.service';
import { IndustryService } from './services/industry.service';
import { JobService } from './services/job.service';
import { SchoolService } from './services/school.service';
import { SkillService } from './services/skill.service';
import { CategoryService } from './services/category.service';


@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
    ApiService,
    AuthService,
    CountryService,
    StateService,
    CityService,
    CertificationService,
    EmployerService,
    DegreeService,
    IndustryService,
    JobService,
    SchoolService,
    SkillService,
    CategoryService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
