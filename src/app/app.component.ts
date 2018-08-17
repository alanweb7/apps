import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { HistoricoPage, } from '../pages/historico/historico';
import { PesquisaPage, } from '../pages/pesquisa/pesquisa';
import { HomePage } from '../pages/home/home';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
    if (!params) params = {};
    this.navCtrl.setRoot(MinhaContaPage);
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
