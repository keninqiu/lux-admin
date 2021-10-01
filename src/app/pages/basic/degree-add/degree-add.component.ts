import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Degree } from 'app/interfaces/degree.interface';
import { DegreeService } from 'app/services/degree.service';
import { NbToastrService } from '@nebular/theme';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { Category } from 'app/interfaces/category.interface';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'degree-add',
  templateUrl: './degree-add.component.html',
  styleUrls: ['./degree-add.component.scss']
})
export class DegreeAddComponent implements OnInit {


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
    this.categoryServ.getAllByCountryAndType(val, 'Degree').subscribe(
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
    jobSatisfaction: {
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
    private degreeServ: DegreeService,
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
      this.degreeServ.get(this.id).subscribe(
        (degree: any) => {
          console.log('degree===', degree);
          this.url = degree.url;
          this.name = degree.name;
          this.currencyCode = degree.currencyCode;
          if(degree.compensation) {
            this.compensation = degree.compensation;
          }

          if(degree.category) {
            this.country = degree.category.country._id;
            this.category = degree.category._id;
          }
          if(degree.ratings) {
            this.ratings = degree.ratings;
          }
          if(degree.byDimension) {
            if(degree.byDimension.experience) {
              this.byDimension.experience = degree.byDimension.experience;
            }
            if(degree.byDimension.gender) {
              this.byDimension.gender = degree.byDimension.gender;
            }   
            if(degree.byDimension.salaryByJob) {
              this.byDimension.salaryByJob = degree.byDimension.salaryByJob;
            }      
            if(degree.byDimension.hourlyRateByJob) {
              this.byDimension.hourlyRateByJob = degree.byDimension.hourlyRateByJob;
            }   
            if(degree.byDimension.salaryByEmployer) {
              this.byDimension.salaryByEmployer = degree.byDimension.salaryByEmployer;
            }  
            if(degree.byDimension.hourlyRateByEmployer) {
              this.byDimension.hourlyRateByEmployer = degree.byDimension.hourlyRateByEmployer;
            }  
          }
          
          if(degree.related) {
            this.related = degree.related;
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
      this.degreeServ.update(this.id, data).subscribe(
        (degree: Degree) => {
          console.log('success');
          this.toastrServ.success('修改成功');
        }
      );
    } else {
      this.degreeServ.add(data).subscribe(
        (degree: Degree) => {
          console.log('success');
          this.toastrServ.success('新增成功');
        }
      );      
    }

  }
}
