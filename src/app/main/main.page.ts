import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { CountryService } from '../country.service';
import { Country } from '../country.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  global = new Country(null, null, null, null, null, null); // ???

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.fetchCountries();

    this.apiService.getGlobalInfo().subscribe(data => {
      this.global = new Country(
        'global',
        'global',
        data.confirmed.value,
        data.deaths.value,
        data.recovered.value,
        data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19)
      );
    });
  }

}
