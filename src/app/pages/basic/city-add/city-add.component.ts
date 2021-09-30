import { Component, OnInit } from '@angular/core';
import { State } from 'app/interfaces/state.interface';
import { StateService } from 'app/services/state.service';
import { CityService } from 'app/services/city.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from 'app/interfaces/city.interface';

@Component({
  selector: 'city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.scss']
})
export class CityAddComponent implements OnInit {


  id: string;
  name: string;
  state: string;
  states: State[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private cityServ: CityService,
    private stateServ: StateService) { }

  ngOnInit(): void {
    this.stateServ.getAll().subscribe(
      (states: State[]) => {
        this.states = states;
      }
    );
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.cityServ.get(this.id).subscribe(
        (city: City) => {
          this.name = city.name;
          this.state = city.state;
        });
      });
  }

  save() {
    const data = {
      name: this.name,
      state: this.state
    };
    if(this.id) {
      this.cityServ.update(this.id, data).subscribe(
        (city: City) => {
          this.toastrServ.success('修改成功');
          this.router.navigate(['/pages/basic/cities']);
        }
      );
    } else {
      this.cityServ.add(data).subscribe(
        (city: City) => {
          this.toastrServ.success('新增成功');
          this.router.navigate(['/pages/basic/cities']);
        }
      );      
    }

  }  

}
