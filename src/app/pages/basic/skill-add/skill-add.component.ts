import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Skill } from 'app/interfaces/skill.interface';
import { SkillService } from 'app/services/skill.service';
import { NbToastrService } from '@nebular/theme';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { Category } from 'app/interfaces/category.interface';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.scss']
})
export class SkillAddComponent implements OnInit {

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
    this.categoryServ.getAllByCountryAndType(val, 'Skill').subscribe(
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
    private skillServ: SkillService,
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
      this.skillServ.get(this.id).subscribe(
        (skill: any) => {
          console.log('skill==', skill);
          this.url = skill.url;
          this.name = skill.name;
          this.currencyCode = skill.currencyCode;
          if(skill.compensation) {
            this.compensation = skill.compensation;
          }

          if(skill.category) {
            this.country = skill.category.country._id;
            this.category = skill.category._id;
          }
          if(skill.byDimension) {
            if(skill.byDimension.experience) {
              this.byDimension.experience = skill.byDimension.experience;
            }
            if(skill.byDimension.gender) {
              this.byDimension.gender = skill.byDimension.gender;
            }   
            if(skill.byDimension.salaryByJob) {
              this.byDimension.salaryByJob = skill.byDimension.salaryByJob;
            }      
            if(skill.byDimension.hourlyRateByJob) {
              this.byDimension.hourlyRateByJob = skill.byDimension.hourlyRateByJob;
            }   
            if(skill.byDimension.salaryByEmployer) {
              this.byDimension.salaryByEmployer = skill.byDimension.salaryByEmployer;
            }  
            if(skill.byDimension.hourlyRateByEmployer) {
              this.byDimension.hourlyRateByEmployer = skill.byDimension.hourlyRateByEmployer;
            }      
          }


          if(skill.related) {
            this.related = skill.related;
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
      salary: this.salary,
      roi: this.roi,
      about: this.about,
      byDimension: this.byDimension,
      related: this.related
    };
    if(this.id) {
      this.skillServ.update(this.id, data).subscribe(
        (skill: Skill) => {
          console.log('success');
          this.toastrServ.success('修改成功');
        }
      );
    } else {
      this.skillServ.add(data).subscribe(
        (skill: Skill) => {
          console.log('success');
          this.toastrServ.success('新增成功');
        }
      );      
    }

  }


}
