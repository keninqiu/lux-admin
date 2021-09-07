import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule, NbSpinnerModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    NbCardModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
})
export class AuthModule { }
