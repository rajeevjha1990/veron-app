import { Injectable } from '@angular/core';
import { RajeevhttpService } from '../http/rajeevhttp.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/data-types/user';
import { AuthService } from '../auth/auth.service';
import * as Constants from '../../constant/app.constatnt'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userdata: any = '';
  mobile: any = '';
  public userObj = new User();
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(this.userObj);
  private authkey = '';

  constructor(
    private authServ: AuthService,
    private veronHttp: RajeevhttpService,
  ) {
    this.init();
  }

  async init() {
    this.authkey = await this.getAuthKey();
    if (this.authkey) {
      await this.getUserProfile();
      this.userObj.loggedIn = true;
      this.user.next(this.userObj);
    }
  }

  async getAuthKey() {
    if (!this.authkey) {
      this.authkey = await this.authServ.getAuthkey();
    }
    return this.authkey;
  }

  async login(logindata: any) {
    try {
      const url = Constants.USER_API_PATH + 'login';
      const apiResp = await this.veronHttp.post(url, logindata);
      if (apiResp && apiResp.authkey) {
        this.authkey = apiResp.authkey;
        this.veronHttp.authkey = this.authkey;
        this.authServ.setAuthkey(this.authkey);
        await this.getUserProfile();
      }

      return apiResp;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  async sendotp(data: { mobile: string }) {
    const url = Constants.USER_API_PATH + 'send_otp';
    const respData = await this.veronHttp.post(url, data);
    return respData;
  }
  async verifyotp(data: { mobile: string, otp: string }) {
    try {

      const url = Constants.USER_API_PATH + 'verify_otp';
      const apiResp = await this.veronHttp.post(url, data);
      if (apiResp && apiResp.authkey) {
        this.authkey = apiResp.authkey;
        this.veronHttp.authkey = this.authkey;
        this.authServ.setAuthkey(this.authkey);
        await this.getUserProfile();
      }
      return apiResp;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  async logout() {
    this.authServ.clear();
    this.userObj = new User();
    this.user.next(this.userObj);
  }

  async getUserProfile() {
    if (!this.userObj.consumer_name || this.userObj.consumer_name.length === 0) {
      await this.getUserProfileFromServer();
    }
    return this.userObj;
  }

  async getUserProfileFromServer() {
    const url = Constants.USER_API_PATH + 'get_consumer';
    try {
      const respData = await this.veronHttp.post(url, {}, false);

      if (respData && respData.id) {
        this.userObj = {
          id: respData.id,
          consumer_name: respData.consumer_name,
          email: respData.email,
          mobile_no: respData.mobile_no,
          loggedIn: true,
          dob: respData.dob || '',
          gender: respData.gender || '',
          address: respData.address || '',
          city: respData.city || '',
          state: respData.state || '',
          aadhaar_no: respData.aadhaar_no || '',
          pancard: respData.pancard || '',
          pincode: respData.pincode || ''
        } as any;

        this.user.next(this.userObj);
      } else {
        console.warn('Failed to get user profile:', respData);
      }

      return this.userObj;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return this.userObj;
    }
  }
  async consumerRegistration(userdata: any) {
    const url = Constants.USER_API_PATH + 'consumer_register';
    const apiResp = await this.veronHttp.post(url, userdata);
    return apiResp;
  }
  async allusers() {
    const url = Constants.USER_API_PATH + 'allUsers';
    const respData = await this.veronHttp.post(url, {});
    if (respData) {
      return respData.users;
    } else {
      return []
    }
  }
  async getuser(userId: any) {
    const data = {
      userId: userId
    }
    const url = Constants.USER_API_PATH + 'get_userbyId';
    const respData = await this.veronHttp.post(url, data);
    if (respData) {
      return respData.user;
    } else {
      return {}
    }
  }
  async savePersonalInfo(formData: any) {
    const url = Constants.CONSUMER_API_PATH + 'update_profile';
    const apiResp = await this.veronHttp.post(url, formData);
    return apiResp;
  }
  async rechargeHistory(all = false) {
    const url = Constants.CONSUMER_API_PATH + 'recharge_history';
    const respData = await this.veronHttp.post(url, {
      all_data: all ? 'yes' : 'no'
    });

    if (respData) {
      return {
        mobileRecharge: respData.mobilerechargeHistorise || [],
        electricityRecharge: respData.electricrechargeHistorise || []
      };
    } else {
      return {
        mobileRecharge: [],
        electricityRecharge: []
      };
    }
  }


}
