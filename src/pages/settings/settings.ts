import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherService } from '../../providers/weather.service';
import { WeatherPage } from '../weather/weather';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [WeatherService]
})
export class SettingsPage {
  private searchStr: String = "";
  private results: any = [];
  private defaultCity;
  private city: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _weatherService: WeatherService) {
  }

  ionViewDidEnter() {
    this.getDefaultCity();
    this.searchStr = "";
    this.city = undefined;
  }

  getQuery() {
    this._weatherService.searchCities(this.searchStr)
      .subscribe(res => {
        this.results = res.RESULTS;
      });
  }

  getDefaultCity() {
    if (localStorage.city !== undefined) {
      this.defaultCity = JSON.parse(localStorage.city).name;
    } else {
      this.defaultCity = '';
    }
  }

  setDefaultCity(city) {
    this.results = [];
    this.searchStr = city.name;
    this.city = city;
  }

  saveChanges() {
    if (typeof (Storage) !== "undefined") {
      if (this.city !== undefined && this.searchStr !== '') {
        localStorage.city = JSON.stringify(this.city);
        this.getDefaultCity();
      }
    } else {
      console.log("LocalStorage Not Supported");
    }
    this.navCtrl.parent.select(0);
  }
}
