import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the EntrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.openWebpage();
    console.log('ionViewDidLoad EntrarPage');
  }


  openWebpage(){
    var url = 'https://kcode.com.br/kcode_2020/meu-code';
    const options: InAppBrowserOptions = {
    zoom: 'no',
    toolbar: 'yes',
    hideurlbar: 'yes',
    hidenavigationbuttons: 'no',
    location: 'no',
    hardwareback: 'yes',
    }
    
    const browser = this.inAppBrowser.create(url, '_self', options);
  // mudou 2.4
  } 

}
