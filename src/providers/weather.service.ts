import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  private apiKey: string;
  private conditionsUrl: string;
  private searchUrl: string;

  constructor(public _http: Http) {
    this.apiKey = "2a5940d249aaea67";
    this.conditionsUrl = "http://api.wunderground.com/api/" + this.apiKey + "/conditions/q";
    this.searchUrl = "http://autocomplete.wunderground.com/aq?query=";
  }

  getWeather(zmw) {
    return this._http.get(this.conditionsUrl + "/zmw:" + zmw + ".json")
      .map(res => res.json());
  }

  searchCities(searchStr){
    return this._http.get(this.searchUrl + '' + searchStr)
      .map(res => res.json());
  }

}
