import { Component, OnInit } from '@angular/core';
import { Country } from 'app/interfaces/country.interface';
import { CountryService } from 'app/services/country.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {
  id: string;
  name: string;
  code: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private countryServ: CountryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.countryServ.get(this.id).subscribe(
        (country: Country) => {
          this.name = country.name;
          this.code = country.code;
        });
      });
  }

  save() {
    const data = {
      name: this.name,
      code: this.code
    };
    if(this.id) {
      this.countryServ.update(this.id, data).subscribe(
        (country: Country) => {
          console.log('success');
          this.toastrServ.success('修改成功');
          this.router.navigate(['/pages/basic/countries']);
        }
      );
    } else {
      this.countryServ.add(data).subscribe(
        (country: Country) => {
          console.log('success');
          this.toastrServ.success('新增成功');
          this.router.navigate(['/pages/basic/countries']);
        }
      );      
    }

  }  
}
