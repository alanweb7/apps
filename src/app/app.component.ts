import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { HistoricoPage, } from '../pages/historico/historico';
import { PesquisaPage, } from '../pages/pesquisa/pesquisa';
import { HomePage } from '../pages/home/home';

import { BrowserTab } from '@ionic-native/browser-tab';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private browserTab: BrowserTab,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }
  goToMinhaConta(params){

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

    // if (!params) params = {};
    // this.navCtrl.setRoot(MinhaContaPage);

  }
   goToHistorico(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HistoricoPage);
  }
  goToPasquisa(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PesquisaPage);
  }

}
