import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'app/interfaces/school.interface';
import { SchoolService } from 'app/services/school.service';
import { NbToastrService } from '@nebular/theme';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { State } from 'app/interfaces/state.interface';
import { Category } from 'app/interfaces/category.interface';
import { StateService } from 'app/services/state.service';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.scss']
})
export class SchoolAddComponent implements OnInit {
  id: string;
  name: string;
  url: string;
  countries: Country[];
  _country: string;
  get country(): string {
    return this._country;
  }
  set country(val: string) {
    this._country = val;
    this.categoryServ.getAllByCountryAndType(val, 'School').subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }


  categories: Category[];
  _category: string;
  get category(): string {
    return this._category
  }

  set category(val: string) {
    this._category = val;
    console.log('val of category=', val);
  }
  compensation = {
    hourlyRate: {
        min: undefined,
        max: undefined,
        avg: undefined
    },
    salary: {
        min: undefined,
        max: undefined,
        avg: undefined
    },
  };

  about = {
    abstract: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    admissionsUrl: '',
    wikiUrl: '',
    percentStem: undefined,
    graduationRate: undefined,
    percentStayInState: undefined,
    percentReceivingPellGrants: undefined,
    studentsEnrolled: undefined,
    satScores: {
        lowerPercentile: undefined,
        upperPercentile: undefined
    },
    actScores:{
       lowerPercentile: undefined,
       upperPercentile: undefined
    },
  };  
  roi = {
      totalCostOnCampus: undefined,
      totalCostOffCampus: undefined,
      net20YearRoiOnCampus: undefined,
      net20YearRoiOffCampus: undefined,
      net20YearRoiWithAidOnCampus: undefined,
      net20YearRoiWithAidOffCampus: undefined,
      annualizedRoiOnCampus: undefined,
      annualizedRoiOffCampus: undefined,
      annualizedRoiWithAidOnCampus: undefined, 
      annualizedRoiWithAidOffCampus: undefined,
      graduationRate: undefined,
      typicalYearsToGraduate: undefined,
      percentReceivingGrantMoney: undefined,
      averageLoanAmount4Years: undefined,
      overallRank: undefined        
  };   
  salary = {
      earlyCareerMedianPay: undefined,
      midCareerMedianPay: undefined,
      percentHighMeaning: undefined,
      percentMale: undefined,
      percentFemale: undefined,
      percentStem: undefined,
      percentPell: undefined,
      percentRecommending: undefined,
      undergraduateEnrollment: undefined,
      rank: undefined
  }; 

  byDimension = {
    experience: {
        entryLevel: {
          profileCount: undefined
        },
        earlyCareer: {
          profileCount: undefined
        },
        midCareer: {
          profileCount: undefined
        },
        lateCareer: {
          profileCount: undefined
        },
        experienced: {
          profileCount: undefined
        }
    },
    gender: {
        male: {
          profileCount: undefined,
          min: undefined,
          max: undefined
        },
        female: {
          profileCount: undefined,
          min: undefined,
          max: undefined
        }
    }
  } 

  constructor(
    private schoolServ: SchoolService,
    private toastrServ: NbToastrService,
    private countryServ: CountryService,
    private stateServ: StateService,
    private categoryServ: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      }
    );
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.schoolServ.get(this.id).subscribe(
        (school: any) => {
          this.url = school.url;
          this.name = school.name;

          if(school.compensation) {
            this.compensation = school.compensation;
          }
          if(school.salary) {
            this.salary = school.salary;
          }
          if(school.roi) {
            this.roi = school.roi;
          }
          if(school.about) {
            this.about = school.about;
            if(!school.about.satScores) {
              this.about.satScores = {
                lowerPercentile: undefined,
                upperPercentile: undefined
              };
            }

            if(!school.about.actScores) {
              this.about.actScores = {
                lowerPercentile: undefined,
                upperPercentile: undefined
              };
            }

          }
          if(school.category) {
            this.country = school.category.country._id;
            this.category = school.category._id;
          }
          console.log('this.about=', this.about);
        }
      );
    })
  }

  save() {
    const data = {
      name: this.name,
      category: this.category,
      compensation: this.compensation,
      salary: this.salary,
      roi: this.roi,
      about: this.about
    };
    if(this.id) {
      this.schoolServ.update(this.id, data).subscribe(
        (school: School) => {
          console.log('success');
          this.toastrServ.success('修改成功');
        }
      );
    } else {
      this.schoolServ.add(data).subscribe(
        (school: School) => {
          console.log('success');
          this.toastrServ.success('新增成功');
        }
      );      
    }

  }
}
