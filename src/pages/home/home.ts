import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { CodeProvider } from '../../providers/code/code';
import { VerConteDoPage } from '../ver-conte-do/ver-conte-do';

import { Geolocation } from '@ionic-native/geolocation';

import { Sim } from '@ionic-native/sim';
import { Storage } from '@ionic/storage';
// import { MinhaContaPage } from '../minha-conta/minha-conta'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  codeNumber:any;
  endLat: any;
  endLong: any;
  myfone: any;
  public myGlobalVar: string;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private codeProvider: CodeProvider,
    private global: CodeProvider,
    private geo: Geolocation,
    private platform: Platform,
    private sim: Sim,
    private storage: Storage
  ) {
      this.pushInfoPhone();  
    }
    ionViewDidLoad(){
   this.pushGeoinfo(); 
   alert('O Aplicativo está sendo preparado...');
   this.pushInfoPhone(); 
    }     
  pushPage(){
      // set a key/value
    // this.storage.set('name', 'Max');
    this.geo.getCurrentPosition().then(res => {
      this.endLat = res.coords.latitude;
      this.endLong = res.coords.longitude;
      console.log(this.endLat );
    // alert("latitude: " + res.coords.latitude);
    // alert("longitude: " + res.coords.longitude);
    }).catch(() => {
    alert("erro ao pegar geolocalizacao");
    })
     // console.log('clicou');
    let latitude = this.endLat;
    let longitude = this.endLong;
    console.log();
    this.navCtrl.push(VerConteDoPage, {
      info: {
        code: this.codeNumber,
        position:{"latitude": latitude, "longitude": longitude},
        telephone: this.global.myGlobalVar
      }
    });
  }

pushGeoinfo(){
  this.platform.ready().then(() => {

    this.geo.getCurrentPosition().then(res => {
      this.endLat = res.coords.latitude;
      this.endLong = res.coords.longitude;
      console.log(this.endLat );
    // alert("latitude: " + res.coords.latitude);
    // alert("longitude: " + res.coords.longitude);
    }).catch(() => {
    alert("erro 2 ao pegar geolocalizacao ");
    })         
    });
} 

pushInfoPhone(){ 
    // phone number
 this.sim.getSimInfo().then(
    (info) => {
      this.global.myGlobalVar = info.phoneNumber;  
      // alert('Meu fone: '+this.global.myGlobalVar);  
      console.log(info);  
    }
  ).catch(() => {
    (err) => console.log('Unable to get sim info: ', err)
    });
  
  this.sim.hasReadPermission().then(
    (info) => console.log('Has permission: ', info)
  );

  this.sim.requestReadPermission().then(
    () => console.log('Permission granted'),
    () => console.log('Permission denied')
  );

  // alert('Fone Global: ' +this.global.myGlobalVar)      
}

presentLoadingText() {
  let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: 'Loading Please Wait...'
  });

loading.present();
}

verMeunumber(){
  alert('Fone Global Final : ' +this.global.myGlobalVar)     
}

}
