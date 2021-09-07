/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
 import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth2.service';

 @Component({
   selector: 'nb-register',
   styleUrls: ['./register.component.scss'],
   templateUrl: './register.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class RegisterComponent {
 
   redirectDelay: number = 0;
   showMessages: any = {};
   strategy: string = '';
 
   submitted = false;
   errors: string[] = [];
   messages: string[] = [];
   user: any = {};
 
   constructor(
     private authServ: AuthService,
               protected cd: ChangeDetectorRef,
               protected router: Router) {
 
     this.redirectDelay = 1;
     this.showMessages = {};
     this.strategy = '';
   }
 
   register(): void {
     this.errors = this.messages = [];
     this.submitted = true;
     console.log('this.user==', this.user);
     this.authServ.signUp(this.user).subscribe(
       (ret: any) => {
         console.log('ret==', ret);
       }
     );
     /*
     this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
       this.submitted = false;
       if (result.isSuccess()) {
         this.messages = result.getMessages();
       } else {
         this.errors = result.getErrors();
       }
 
       const redirect = result.getRedirect();
       if (redirect) {
         setTimeout(() => {
           return this.router.navigateByUrl(redirect);
         }, this.redirectDelay);
       }
       this.cd.detectChanges();
     });
     */
   }
 
   getConfigValue(key: string): any {
    //return getDeepFromObject(this.options, key, null);
   }
 }