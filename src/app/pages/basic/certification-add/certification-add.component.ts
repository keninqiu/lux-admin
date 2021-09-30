import { Component, OnInit } from '@angular/core';
import { State } from 'app/interfaces/state.interface';
import { StateService } from 'app/services/state.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from 'app/services/country.service';
import { Country } from 'app/interfaces/country.interface';

@Component({
  selector: 'certification-add',
  templateUrl: './certification-add.component.html',
  styleUrls: ['./certification-add.component.scss']
})
export class CertificationAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
