import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { WeatherService } from '../../providers/weather.service';

/**
 * Generated class for the Weather page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
  providers: [WeatherService],
  queries: {
    content: new ViewChild('content')
  }
})

export class WeatherPage {
  private weather: Object;
  private searchStr: String;
  private results: any = [];
  private zmw: string;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _weatherService: WeatherService) {
  }

  ionViewDidEnter() {
    this.content.scrollToTop();
    this.searchStr = '';
    this.results = [];
    this.getDefaultCity();
    this._weatherService.getWeather(this.zmw).subscribe(weather => {
      this.weather = weather.current_observation;
      console.log(weather);
    });
  }

  getQuery() {
    this._weatherService.searchCities(this.searchStr).subscribe(res => {
      this.results = res.RESULTS;
    });
  }

  chooseCity(city) {
    this.results = [];
    this.searchStr = city.name;
    this._weatherService.getWeather(city.zmw).subscribe(weather => {
      this.weather = weather.current_observation;
      console.log(weather);
    });
  }

  getDefaultCity() {
    if (localStorage.city !== undefined) {
      this.zmw = JSON.parse(localStorage.city).zmw;
    } else {
      this.zmw = "00000.1.41194";
    }
  }
}
