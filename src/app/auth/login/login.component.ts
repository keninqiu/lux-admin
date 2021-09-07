/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
 import { Router } from '@angular/router';
 import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../auth.options';
 import { getDeepFromObject } from '../../helpers';
 
 import { NbAuthService } from '../../services/auth.service';
 import { NbAuthResult } from '../../services/auth-result';
import { AuthService } from '../../services/auth2.service';
 
 @Component({
   selector: 'nb-login',
   templateUrl: './login.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class LoginComponent {
 
   redirectDelay: number = 0;
   showMessages: any = {};
   strategy: string = '';
 
   errors: string[] = [];
   messages: string[] = [];
   user: any = {};
   submitted: boolean = false;
   socialLinks: NbAuthSocialLink[] = [];
   rememberMe = false;
 
   constructor(
       private authServ: AuthService,
               protected cd: ChangeDetectorRef,
               protected router: Router) {

   }
 
   login(): void {
     this.errors = [];
     this.messages = [];
     this.submitted = true;
     this.authServ.login(this.user).subscribe(
         (ret: any) => {
             console.log('ret===', ret);
         }
     );
   }

 }
 