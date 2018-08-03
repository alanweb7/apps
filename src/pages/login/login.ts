import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  codeNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let id = navParams.get('id');
    console.log(id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
