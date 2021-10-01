import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'app/interfaces/employer.interface';
import { EmployerService } from 'app/services/employer.service';
import { NbToastrService } from '@nebular/theme';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { Category } from 'app/interfaces/category.interface';
import { CategoryService } from 'app/services/category.service';


@Component({
  selector: 'employer-add',
  templateUrl: './employer-add.component.html',
  styleUrls: ['./employer-add.component.scss']
})
export class EmployerAddComponent implements OnInit {

  id: string;
  name: string;
  url: string;
  currencyCode: string;
  countries: Country[];
  _country: string;
  get country(): string {
    return this._country;
  }
  set country(val: string) {
    this._country = val;
    this.categoryServ.getAllByCountryAndType(val, 'Employer').subscribe(
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

  related = [];
  
  ratings = {
    overall: {
      score: undefined
    },
    appreciation: {
      score: undefined
    },
    companyOutlook: {
      score: undefined
    },
    fairPay: {
      score: undefined
    },
    learningandDevelopment: {
      score: undefined
    },
    managerCommunication: {
      score: undefined
    },
    managerRelationship: {
      score: undefined
    },
    payTransparency: {
      score: undefined
    }
  };
  byDimension = {
    experience: {
        entryLevel: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        },
        earlyCareer: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        },
        midCareer: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        },
        lateCareer: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        },
        experienced: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        }
    },
    gender: {
        male: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        },
        female: {
          profileCount: undefined,
          min: undefined,
          max: undefined,
          avg: undefined
        }
    },
    salaryByJob: [],
    hourlyRateByJob: [],
    salaryByEmployer: [],
    hourlyRateByEmployer: []
  } 

  constructor(
    private employerServ: EmployerService,
    private toastrServ: NbToastrService,
    private countryServ: CountryService,
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
      this.employerServ.get(this.id).subscribe(
        (employer: any) => {
          console.log('employer===', employer);
          this.url = employer.url;
          this.name = employer.name;
          this.currencyCode = employer.currencyCode;
          if(employer.compensation) {
            this.compensation = employer.compensation;
          }

          if(employer.category) {
            this.country = employer.category.country._id;
            this.category = employer.category._id;
          }
          if(employer.ratings) {
            this.ratings = employer.ratings;
          }
          if(employer.byDimension) {
            if(employer.byDimension.experience) {
              this.byDimension.experience = employer.byDimension.experience;
            }
            if(employer.byDimension.gender) {
              this.byDimension.gender = employer.byDimension.gender;
            }   
            if(employer.byDimension.salaryByJob) {
              this.byDimension.salaryByJob = employer.byDimension.salaryByJob;
            }      
            if(employer.byDimension.hourlyRateByJob) {
              this.byDimension.hourlyRateByJob = employer.byDimension.hourlyRateByJob;
            }   
            if(employer.byDimension.salaryByEmployer) {
              this.byDimension.salaryByEmployer = employer.byDimension.salaryByEmployer;
            }  
            if(employer.byDimension.hourlyRateByEmployer) {
              this.byDimension.hourlyRateByEmployer = employer.byDimension.hourlyRateByEmployer;
            }  
          }
          
          if(employer.related) {
            this.related = employer.related;
          }
        }
      );
    })
  }

  getExperiencePercentage(level: string) {
    if(!this.byDimension || !this.byDimension.experience) {
      return 0;
    }
    const total = 
    this.byDimension.experience.earlyCareer.profileCount 
    + this.byDimension.experience.entryLevel.profileCount
    + this.byDimension.experience.experienced.profileCount
    + this.byDimension.experience.lateCareer.profileCount
    + this.byDimension.experience.midCareer.profileCount;
    if(!total) {
      return 0;
    }
    return (this.byDimension.experience[level].profileCount * 100 / total).toFixed(1);
  }

  getGenderPercentage(level: string) {
    if(!this.byDimension || !this.byDimension.gender) {
      return 0;
    }
    const total = 
    this.byDimension.gender.male.profileCount 
    + this.byDimension.gender.female.profileCount;
    if(!total) {
      return 0;
    }
    return (this.byDimension.gender[level].profileCount * 100 / total).toFixed(1);
  }

  save() {
    const data = {
      rawDataParsed: true,
      name: this.name,
      category: this.category,
      currencyCode: this.currencyCode,
      compensation: this.compensation,
      ratings: this.ratings,
      byDimension: this.byDimension,
      related: this.related
    };
    if(this.id) {
      this.employerServ.update(this.id, data).subscribe(
        (employer: Employer) => {
          console.log('success');
          this.toastrServ.success('修改成功');
        }
      );
    } else {
      this.employerServ.add(data).subscribe(
        (employer: Employer) => {
          console.log('success');
          this.toastrServ.success('新增成功');
        }
      );      
    }

  }

}
