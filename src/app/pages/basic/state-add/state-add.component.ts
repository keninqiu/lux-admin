import { Component, OnInit } from '@angular/core';
import { State } from 'app/interfaces/state.interface';
import { StateService } from 'app/services/state.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from 'app/services/country.service';
import { Country } from 'app/interfaces/country.interface';

@Component({
  selector: 'state-add',
  templateUrl: './state-add.component.html',
  styleUrls: ['./state-add.component.scss']
})
export class StateAddComponent implements OnInit {

  id: string;
  name: string;
  country: string;
  countries: Country[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private countryServ: CountryService,
    private stateServ: StateService) { }

  ngOnInit(): void {
    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      }
    );
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.stateServ.get(this.id).subscribe(
        (state: State) => {
          this.name = state.name;
          this.country = state.country;
        });
      });
  }

  save() {
    const data = {
      name: this.name,
      country: this.country
    };
    if(this.id) {
      this.stateServ.update(this.id, data).subscribe(
        (state: State) => {
          this.toastrServ.success('修改成功');
          this.router.navigate(['/pages/basic/states']);
        }
      );
    } else {
      this.stateServ.add(data).subscribe(
        (state: State) => {
          this.toastrServ.success('新增成功');
          this.router.navigate(['/pages/basic/states']);
        }
      );      
    }

  }  

}
