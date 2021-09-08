import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../../../services/country.service';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor(private countryServ: CountryService) {}
  ngOnInit() {
      console.log('this.value====', this.value);
      console.log('rowData==', this.rowData);
      this.renderValue = this.value;
      
    
  }

}