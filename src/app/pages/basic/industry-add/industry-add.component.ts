import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Industry } from 'app/interfaces/industry.interface';
import { IndustryService } from 'app/services/industry.service';
import { NbToastrService } from '@nebular/theme';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { Category } from 'app/interfaces/category.interface';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'industry-add',
  templateUrl: './industry-add.component.html',
  styleUrls: ['./industry-add.component.scss']
})
export class IndustryAddComponent implements OnInit {



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
    this.categoryServ.getAllByCountryAndType(val, 'Industry').subscribe(
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

  constructor(
    private industryServ: IndustryService,
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
      this.industryServ.get(this.id).subscribe(
        (industry: any) => {
          console.log('industry===', industry);
          this.url = industry.url;
          this.name = industry.name;
          this.currencyCode = industry.currencyCode;
          if(industry.compensation) {
            this.compensation = industry.compensation;
          }

          if(industry.category) {
            this.country = industry.category.country._id;
            this.category = industry.category._id;
          }

          if(industry.related) {
            this.related = industry.related;
          }
        }
      );
    })
  }


  save() {
    const data = {
      rawDataParsed: true,
      name: this.name,
      category: this.category,
      currencyCode: this.currencyCode,
      compensation: this.compensation,
      related: this.related
    };
    if(this.id) {
      this.industryServ.update(this.id, data).subscribe(
        (industry: Industry) => {
          console.log('success');
          this.toastrServ.success('修改成功');
        }
      );
    } else {
      this.industryServ.add(data).subscribe(
        (industry: Industry) => {
          console.log('success');
          this.toastrServ.success('新增成功');
        }
      );      
    }

  }

}
