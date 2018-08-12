import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoricoPage } from '../pages/historico/historico';
import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { VerConteDoPage } from '../pages/ver-conte-do/ver-conte-do';
import { LinkExternoPage } from '../pages/link-externo/link-externo';

import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodeProvider } from '../providers/code/code';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HttpModule } from '@angular/http';
import { Sim } from '../../node_modules/@ionic-native/sim';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoricoPage,
    MinhaContaPage,
    VerConteDoPage,
    LinkExternoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoricoPage,    
    MinhaContaPage,
    VerConteDoPage,
    LinkExternoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CodeProvider,
    Geolocation,
    BackgroundMode,
    Sim
  ]
})
export class AppModule {}
