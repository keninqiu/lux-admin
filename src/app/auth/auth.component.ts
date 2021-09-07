import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';
@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  constructor(private spinner$: NbSpinnerService ) { }
  ngOnInit() {
    this.spinner$.load();
  }
}
