import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { HomePage } from "./../home/home";

// @IonicPage()
@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html'
})
export class MinhaContaPage {
  public url:string;

  constructor(
    public navCtrl: NavController, 
    private inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad(){
    this.openWebpage();
  }



  openWebpage(){
    var url = 'https://kscode.com.br/meu-code';
    const options: InAppBrowserOptions = {
    zoom: 'no',
    toolbar: 'yes',
    hideurlbar: 'yes',
    hidenavigationbuttons: 'yes',
    location: 'no',
    hardwareback: 'yes',
    closebuttoncaption:'Home',
    closebuttoncolor:'#000000',
    // irHome: this.pushPageHome(),
    }
    const browser = this.inAppBrowser.create(url, '_system', options);
    browser.insertCSS({ code: "body{color: blue;" });
  // mudou 2.4
  } 
  

  pushPageHome(){

    this.navCtrl.setRoot(HomePage);

  }



}