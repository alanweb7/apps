import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
// @IonicPage()
@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html'
})
export class MinhaContaPage {
  public url:string;

  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser) {
    this.url = 'https://kcode.com.br/kcode_2020/meu-code';
  }

  ionViewDidLoad(){
    this.openWebpage(this.url);
  }

  openWebpage(url: string){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      hideurlbar: 'yes',
      hidenavigationbuttons: 'no',
      location: 'no',
      hardwareback: 'yes',
    }
  
    const browser = this.inAppBrowser.create(url, '_self', options);
  
  } 
  
}
