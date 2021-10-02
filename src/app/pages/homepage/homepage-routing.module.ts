import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { AdvAddComponent } from './adv-add/adv-add.component';
import { CarouselAddComponent } from './carousel-add/carousel-add.component';
import { ChangeAddComponent } from './change-add/change-add.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { SalaryAddComponent } from './salary-add/salary-add.component';
import { SalaryAddDetailsComponent } from './salary-add/details/details.component';
import { SalaryAddDetailAddComponent } from './salary-add/detail-add/detail-add.component';
import { ExperienceAddComponent } from './experience-add/experience-add.component';
import { BestAddComponent } from './best-add/best-add.component';

const routes: Routes = [{
  path: '',
  component: HomepageComponent,
  children: [
    {
      path: 'adv/add',
      component: AdvAddComponent,
    },
    {
      path: 'change/add',
      component: ChangeAddComponent,
    },
    {
      path: 'salary/add',
      component: SalaryAddComponent,
    },
    {
      path: 'experience/add',
      component: ExperienceAddComponent,
    },
    {
      path: 'best/add',
      component: BestAddComponent,
    },
    {
      path: 'salary/add/details',
      component: SalaryAddDetailsComponent,
    },   
    {
      path: 'salary/add/detail/:id/edit',
      component: SalaryAddDetailAddComponent,
    },
    {
      path: 'salary/add/detail/add',
      component: SalaryAddDetailAddComponent,
    }, 
    {
      path: 'carousel/add',
      component: CarouselAddComponent,
    },
    {
      path: 'carousel/:id/edit',
      component: CarouselAddComponent,
    },
    {
      path: 'carousels',
      component: CarouselsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule { }

export const routedComponents = [
  HomepageComponent,
  AdvAddComponent,
  CarouselsComponent,
  CarouselAddComponent,
  ChangeAddComponent,
  SalaryAddComponent,
  SalaryAddDetailsComponent,
  SalaryAddDetailAddComponent,
  ExperienceAddComponent,
  BestAddComponent
];
