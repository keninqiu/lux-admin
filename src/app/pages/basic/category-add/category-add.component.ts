import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from 'app/services/country.service';
import { Country } from 'app/interfaces/country.interface';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';
@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {


  id: string;
  name: string;
  type: string;
  types: string[];
  country: string;
  countries: Country[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private countryServ: CountryService,
    private categoryServ: CategoryService) { }

  ngOnInit(): void {
    this.types = [
      'Industry',
      'School',
      'Skill',
      'Certification',
      'Job',
      'Employer',
      'Degree'
    ];
    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      }
    );
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.categoryServ.get(this.id).subscribe(
        (category: Category) => {
          this.name = category.name;
          this.country = category.country;
          this.type = category.type;
        });
      });
  }

  save() {
    const data = {
      name: this.name,
      country: this.country,
      type: this.type
    };
    if(this.id) {
      this.categoryServ.update(this.id, data).subscribe(
        (category: Category) => {
          this.toastrServ.success('修改成功');
          this.router.navigate(['/pages/basic/categories']);
        }
      );
    } else {
      this.categoryServ.add(data).subscribe(
        (category: Category) => {
          this.toastrServ.success('新增成功');
          this.router.navigate(['/pages/basic/categories']);
        }
      );      
    }

  }  

}
