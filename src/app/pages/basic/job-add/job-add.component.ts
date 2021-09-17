import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'app/interfaces/school.interface';
import { NbToastrService } from '@nebular/theme';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { Category } from 'app/interfaces/category.interface';
import { CategoryService } from 'app/services/category.service';
import { JobService } from 'app/services/job.service';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}




@Component({
  selector: 'job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {

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
    this.categoryServ.getAllByCountryAndType(val, 'Job').subscribe(
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
  careerPathData = {
    childCount: undefined,
    children: [
           
    ]
  };
  narratives = {
      description: undefined
  };
  compensation = {
      bonus: {
          min: undefined,
          max: undefined,
          avg: undefined,
          profileCount: undefined
      },
      commission: {
          min: undefined,
          max: undefined,
          avg: undefined,
          profileCount: undefined
      },
      salary: {
          min: undefined,
          max: undefined,
          avg: undefined,
          profileCount: undefined
      },
      hourlyRate: {
          min: undefined,
          max: undefined,
          avg: undefined,
          profileCount: undefined            
      },
      profitSharing: {
          min: undefined,
          max: undefined,
          avg: undefined,
          profileCount: undefined              
      },
      total: {
          min: undefined,
          max: undefined,
          avg: undefined,
          profileCount: undefined              
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
          },
          selfDefine: {
            profileCount: undefined,
            min: undefined,
            max: undefined,
            avg: undefined
          }
      }
  };

  constructor(
    private jobServ: JobService,
    private toastrServ: NbToastrService,
    private countryServ: CountryService,
    private categoryServ: CategoryService,
    private route: ActivatedRoute) { 
    }


  ngOnInit(): void {
    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      }
    );
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.jobServ.get(this.id).subscribe(
        (job: any) => {
          this.url = job.url;
          this.name = job.name;
          this.currencyCode = job.currencyCode;
          console.log('job.===', job);
          if(job.compensation) {
            this.compensation = job.compensation;
          }
          if(job.category) {
            this.country = job.category.country._id;
            this.category = job.category._id;
          }
          if(job.byDimension) {
            this.byDimension = job.byDimension;
          }
          if(job.careerPathData) {
            this.careerPathData = job.careerPathData;
          }
          if(job.narratives) {
            this.narratives = job.narratives;
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
      careerPathData: this.careerPathData,
      narratives: this.narratives,
      byDimension: this.byDimension
    };
    if(this.id) {
      this.jobServ.update(this.id, data).subscribe(
        (school: School) => {
          console.log('success');
          this.toastrServ.success('修改成功');
        }
      );
    } else {
      this.jobServ.add(data).subscribe(
        (school: School) => {
          console.log('success');
          this.toastrServ.success('新增成功');
        }
      );      
    }

  }





}
