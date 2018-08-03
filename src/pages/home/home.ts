import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { CodeProvider } from '../../providers/code/code';
import { VerConteDoPage } from '../ver-conte-do/ver-conte-do';

import { Geolocation } from '@ionic-native/geolocation';
// import { MinhaContaPage } from '../minha-conta/minha-conta'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  codeNumber:any;
  endLat: any;
  endLong: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private codeProvider: CodeProvider, private geo: Geolocation, private platform: Platform) {
    this.platform.ready().then(() => {
      this.geo.getCurrentPosition().then(res => {
        this.endLat = res.coords.latitude;
        this.endLong = res.coords.longitude;

      // alert("latitude: " + res.coords.latitude);
      // alert("longitude: " + res.coords.longitude);
      }).catch(() => {
      alert("erro ao pegar geolocalizacao ");
      })
      });

    }
  
  pushPage(){
    // console.log('clicou');
    let latitude = this.endLat;
    let longitude = this.endLong;
    console.log();
    this.navCtrl.push(VerConteDoPage, {
      
      info: {
        code: this.codeNumber,
        position:{"latitude": latitude, "longitude": longitude},
      }

    });
    // this.navCtrl.setRoot(MinhaContaPage);
  }

}
