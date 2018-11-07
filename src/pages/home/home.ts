import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { CodeProvider } from '../../providers/code/code';
import { VerConteDoPage } from '../ver-conte-do/ver-conte-do';
import { PesquisaPage } from '../pesquisa/pesquisa';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';

import { Deeplinks } from '@ionic-native/deeplinks';

import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Sim } from '@ionic-native/sim';

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
    private global: CodeProvider,
    private geo: Geolocation,
    private platform: Platform,
    private sim: Sim,
    private socialSharing: SocialSharing,
    private inAppBrowser: InAppBrowser,
    private oneSignal: OneSignal,
    private deeplinks: Deeplinks
    
  ) {
      // this.pushInfoPhone();  
      this.oneSignalApp();
      this.openDeeplinks();
    }
    ionViewDidLoad(){
    var cascate = {
      func1: {
        1:this.pushGeoinfo(),
      },
      func2: {
        2:this.pushInfoPhone(), 
      }
    };
    console.log(cascate.func1, cascate.func2);
  //  this.pushGeoinfo(); 
 
  //  alert('O Aplicativo está sendo preparado...');
  //  this.pushInfoPhone(); 
    }  
     
  pushPage(){
    this.geo.getCurrentPosition().then(res => {
      this.endLat = res.coords.latitude;
      this.endLong = res.coords.longitude;
      console.log(this.endLat );

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
    // alert("Configure sua Localização! ");
    console.log('Erro ao pegar Localização');
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

pushPageCode(){
  this.geo.getCurrentPosition().then(res => {
    this.endLat = res.coords.latitude;
    this.endLong = res.coords.longitude;
    console.log(this.endLat );

  }).catch(() => {
  alert("erro ao pegar geolocalizacao");
  })
   // console.log('clicou');
  let latitude = this.endLat;
  let longitude = this.endLong;
  console.log();
  this.navCtrl.push(VerConteDoPage, {
    info: {
      code: 'KSCODE',
      position:{"latitude": latitude, "longitude": longitude},
      telephone: this.global.myGlobalVar
    }
  });
}

pushPagePesquisa(){
  this.navCtrl.push(PesquisaPage, {

  });
}

// compartilhar social share
shareSheetShare() {
  this.socialSharing.share("KSCODE - Tudo se conecta aqui! ->", "Share subject", "", "https://play.google.com/store/apps/details?id=com.kcode360.kcode").then(() => {
    console.log("shareSheetShare: Success");
  }).catch(() => {
    console.error("shareSheetShare: failed");
  });
}

shopcode() {
  console.log('clicou shopcode');
  var url = 'https://kscode.com.br/pacotes/';
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

// push notification onesignal
oneSignalApp(){
  this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');

  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
  
  this.oneSignal.handleNotificationReceived().subscribe(() => {
   // do something when notification is received
  //  alert('notification is received');
  });
  
  this.oneSignal.handleNotificationOpened().subscribe( notification => {
    // do something when a notification is opened
    // alert('notification is opened');
    var notificationData = notification.notification.payload;
    var notificationAdditional = notificationData.additionalData;
    var notificationCode = notificationAdditional.code;

    // alert(JSON.stringify(notificationCode));
    this.redirectPush(notificationCode);

  });
  
  this.oneSignal.endInit();

  this.oneSignal.getIds().then((id) => {
    console.log(id);
    // let alert = this.alertCtrl.create({
    //     title: 'the onesignal ids object',
    //     message: JSON.stringify(id),
    //     buttons: [{
    //       text: 'Ok',
    //       role: 'ok'
    //     }]
    //   });
    //   alert.present();
  });        

}

// redirect push enter
redirectPush(notificationCode){
  this.geo.getCurrentPosition().then(res => {
    this.endLat = res.coords.latitude;
    this.endLong = res.coords.longitude;
    console.log(this.endLat );

  }).catch(() => {
  alert("erro ao pegar geolocalizacao");
  })
   // console.log('clicou');
  let latitude = this.endLat;
  let longitude = this.endLong;
  console.log();
  this.navCtrl.push(VerConteDoPage, {
    info: {
      code: notificationCode,
      position:{"latitude": latitude, "longitude": longitude},
      telephone: this.global.myGlobalVar
    }
  });
}//redirect push

// redirect links
openDeeplinks(){
  this.deeplinks.route({
    '/about-us': {'page':'AboutPage'},
    // '/products/:productId': ProductPage,
    '/card': {'conteudo':'VerConteDoPage'},
  }).subscribe(match => {
    alert('Successfully matched route'+ JSON.stringify(match));
      var page = match.$route.page;    
      var code = match.$args.code;    
    if(page){

    this.redirectPush(code);

    }
    // match.$route - the route we matched, which is the matched entry from the arguments to route()
    // match.$args - the args passed in the link
    // match.$link - the full link data

    console.log('Successfully matched route', match);
  }, nomatch => {
    // nomatch.$link - the full link data
    alert('No Match'+ JSON.stringify(nomatch));
    console.error('Got a deeplink that didn\'t match', nomatch);
  });


}// redirect links

}
