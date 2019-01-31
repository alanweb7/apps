import { Component } from '@angular/core';
import { NavController,IonicPage, NavParams, Platform, LoadingController,Events, AlertController } from 'ionic-angular';
//Import Native
import { OneSignal } from '@ionic-native/onesignal'; 
import { Deeplinks } from '@ionic-native/deeplinks';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
//import Provider
import { CodeProvider } from '../../providers/code/code';
import { NetworkProvider } from '../../providers/network/network';
import { UsuarioService } from '../../providers/movie/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Keyboard } from '@ionic-native/keyboard';
@IonicPage({
  priority : 'high'
})@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  codeNumber:any;
  endLat: any;
  endLong: any;
  myfone: any;
  movies          : Usuario[] = [];
  token           : any;
  id              : any ; 
  footerIsHidden  : Boolean = true;
  public myGlobalVar: string;
  data = {
    id_serv     :Number,
    name        :String,
    sobrenome   :String,
    email       :String,
    photo       :String,
    logado      :String,
    token       :String,
    usuario     :String
}
  constructor(
    public loadingCtrl     : LoadingController,
    public navCtrl         : NavController,
    public navParams       : NavParams,
    private global         : CodeProvider,
    private geo            : Geolocation,
    private platform       : Platform,
    private events         : Events,
    private socialSharing  : SocialSharing,
    private browserTab     : BrowserTab,
    private oneSignal      : OneSignal, 
    public alertCtrl       : AlertController,
    public  net            : NetworkProvider,
    private deeplinks      : Deeplinks,
    private usuario        : UsuarioService,
    private keyboard       : Keyboard
    
  ) {
     
     this.oneSignalApp();
  
    }
    ionViewDidLoad(){
 
      if(this.net.ckeckNetwork()){
        //CHAMDA DO BANCO DE DADOS
                  this.usuario.getAll()
                      .then((movies:any) => {
                       // console.log("result get all home",movies);
                       // console.log("result get all home",movies.length);
                        if(movies.length == 1){
                              this.data.name     = movies[0].name;
                              this.data.sobrenome= movies[0].sobrenome;
                              this.data.email    = movies[0].email;
                              this.data.token    = movies[0].token;
                              this.data.logado   = movies[0].logado;
                              this.data.id_serv  = movies[0].id_serv;
                              this.data.photo    = movies[0].photo;
                              this.data.usuario  = movies[0].usuario;
                              this.events.publish('dados',this.data);
                              
                             // console.log("dados",this.data);
                        }
                     
                        var cascate = {
                          func1: {
                            1:this.pushGeoinfo(),
                          },
                          func2: {
                             //2://this.pushInfoPhone(), 
                          }
                        };
                       // console.log(cascate.func1, cascate.func2);
                            
                            
                        })
      }else{
                           
       
        this.navCtrl.setRoot('NotNetworkPage');
             
            }
           // console.log('ionViewDidLoad ImageCapturePage');
      this.keyboard.onKeyboardShow().subscribe(() => {
         // console.log("onKeyboardShow");
          this.footerIsHidden= false;
      });
      this.keyboard.onKeyboardHide().subscribe(() => {
       // console.log("onKeyboardHide");
        this.footerIsHidden= true;
      });
    }  
  
  pushPage(){

    this.geo.getCurrentPosition().then(res => {
      this.endLat = res.coords.latitude;
      this.endLong = res.coords.longitude;
     // console.log(this.endLat );

    }).catch(() => {
    //alert("erro ao pegar geolocalizacao");
    })
     //// console.log('clicou');
    let latitude = this.endLat;
    let longitude = this.endLong;
   // console.log();
    
    this.navCtrl.push('DetalheCodePage', {liberado :false,origem:1,
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
      // console.log(this.endLat );
      
    }).catch(() => {
      
      // console.log('Erro ao pegar Localização');
    })         
    });
} 

/* pushInfoPhone(){ 
    // phone number
 this.sim.getSimInfo().then(
    (info) => {
      this.global.myGlobalVar = info.phoneNumber;  
      // alert('Meu fone: '+this.global.myGlobalVar);  
     // console.log(info);  
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
} */

pushPageCode(){
  this.geo.getCurrentPosition().then(res => {
    this.endLat = res.coords.latitude;
    this.endLong = res.coords.longitude;
   // console.log(this.endLat );

  }).catch(() => {
  //alert("erro ao pegar geolocalizacao");
  })
   //// console.log('clicou');
  let latitude = this.endLat;
  let longitude = this.endLong;

  this.navCtrl.push('DetalheCodePage', {liberado :false,
    info: {
      code: 'KSCODE',
      position:{"latitude": latitude, "longitude": longitude},
      telephone: this.global.myGlobalVar
    }
  });
}

pushPagePesquisa(){
  this.navCtrl.push('PesquisaPage', {

  });
}

// compartilhar social share
shareSheetShare() {
  this.socialSharing.share("KSCODE - Tudo se conecta aqui! ->", "Share subject", "", "https://play.google.com/store/apps/details?id=com.kcode360.kcode").then(() => {
   // console.log("shareSheetShare: Success");
  }).catch(() => {
   // console.error("shareSheetShare: failed");
  });
}

shopcode() {
 // console.log('clicou shopcode');
  var url = 'https://kscode.com.br/pacotes/';
  
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });


  
}

// push notification onesignal
 oneSignalApp(){
  this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');

  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  
  this.oneSignal.handleNotificationReceived().subscribe(() => {
   // do something when notification is received
  // console.log('notification is received');
  });
  
  this.oneSignal.handleNotificationOpened().subscribe( notification => {
    // do something when a notification is opened
   // console.log('notification is opened');
    var notificationData = notification.notification.payload;
    var notificationAdditional = notificationData.additionalData;
    var notificationCode = notificationAdditional.code;
    
    // alert(JSON.stringify(notificationCode));
   // this.redirectPush(notificationCode);
    const confirm = this.alertCtrl.create({
      title: notification.notification.payload.title,
      message: notification.notification.payload.body,
      buttons: [
        {
          text: 'Fechar',
          handler: () => {
           // console.log('Disagree clicked');
          }
        },
        {
          text: 'Ir para Code',
          handler: () => {
            this.redirectPush(notificationCode);
          }
        }
      ]
    });
    confirm.present();
  });
  
  this.oneSignal.endInit();

  this.oneSignal.getIds().then((id) => {
   // console.log(id);
  
  });        

} 

// redirect push enter
redirectPush(notificationCode){
  this.geo.getCurrentPosition().then(res => {
    this.endLat = res.coords.latitude;
    this.endLong = res.coords.longitude;
   // console.log(this.endLat );

  }).catch(() => {
  //alert("erro ao pegar geolocalizacao");
  })
  let latitude = this.endLat;
  let longitude = this.endLong;
 // console.log();
  this.navCtrl.push('DetalheCodePage', {liberado :false,
    info: {
      code: notificationCode,
      position:{"latitude": latitude, "longitude": longitude},
      telephone: this.global.myGlobalVar
    }
  
  });
 }

// redirect links
openDeeplinks(){
  this.deeplinks.routeWithNavController(this.navCtrl, {
    '/card': {'card':'DetalheCodePage',},
    '/about-us': {'card':'DetalheCodePage'},
  }).subscribe((match) => {
    
    var code = match.$link.queryString.substring(5,50); 
    
    if(code){
        this.redirectPush(code);
   

    }
   // console.log('Successfully routed',match.$link.queryString.substring(4,50));
   // console.log('Successfully routed',match.$link.queryString);
  }, (nomatch) => {
   // console.log('Unmatched Route', nomatch);
  });
  
}

}