import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.scss']
})
export class SchoolAddComponent implements OnInit {
  name: string;
  country: string;
  state: string;
  category: string;
  website: string;
  admissionsWebsite: string;
  graduationRate: number;
  stayInState: number;
  receivingPellGrants: number;
  undergraduateEnrollment: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
