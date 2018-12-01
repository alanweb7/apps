import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
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
    private browserTab: BrowserTab) {
  }

  ionViewDidLoad(){
    this.openWebpage();
  }



  openWebpage(){
    var url = 'https://kscode.com.br/meu-code';
    /* const options: InAppBrowserOptions = {
    zoom: 'no',
    toolbar: 'yes',
    hideurlbar: 'yes',
    hidenavigationbuttons: 'yes',
    location: 'no',
    hardwareback: 'yes',
    closebuttoncaption:'Home',
    closebuttoncolor:'#000000',
    // irHome: this.pushPageHome(),
    } */
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
  // mudou 2.4
  } 
  

  pushPageHome(){

    this.navCtrl.setRoot(HomePage);

  }



}