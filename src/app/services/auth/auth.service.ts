import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private authkey = '';
  constructor(
    private storageServ: StorageService
  ) {
    this.getAuthkey();
  }

  async setAuthkey(auth: string) {
    this.authkey = auth;
    await this.storageServ.set('Authkey', auth);
  }
  async getAuthkey() {
    if (!this.authkey) {
      // console.log('getting authkey from this.storageServ');
      this.authkey = await this.storageServ.get('Authkey');
    }
    // console.log('Authkey: ', this.authkey);
    return this.authkey;
  }
  async clear() {
    // console.log('clearing this.storageServ');
    await this.storageServ.clear();
    this.authkey = '';
  }
  // other this.storageServ methods
  // async removeItem() {
  //   await this.storageServ.remove({ key: 'name' });
  // }
  // async keys() {
  //   const { keys } = await this.storageServ.keys();
  //   console.log('Got keys: ', keys);
  // }


}