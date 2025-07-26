import { Injectable } from '@angular/core';
import * as Constants from '../../constant/app.constatnt'
import { RajeevhttpService } from '../http/rajeevhttp.service';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(
    private dibcHttp: RajeevhttpService
  ) {

  }
  async getOperators() {
    const url = Constants.USER_API_PATH + 'operators';
    const respData = await this.dibcHttp.post(url, {});
    if (respData) {
      return respData.operators;
    } else {
      return []
    }
  }
  async getCircle() {
    const url = Constants.USER_API_PATH + 'circles';
    const respData = await this.dibcHttp.post(url, {});
    if (respData) {
      return respData.circles;
    } else {
      return []
    }
  }
  async getStates() {
    const url = Constants.USER_API_PATH + 'states';
    const respData = await this.dibcHttp.post(url, {});
    if (respData) {
      return respData.states;
    } else {
      return []
    }
  }
  async getCities(stateId: any) {
    const params = {
      stateId: stateId
    };
    const url = Constants.USER_API_PATH + 'cities';
    const respData = await this.dibcHttp.post(url, params);
    if (respData) {
      return respData.cities;
    } else {
      return []
    }
  }
}
