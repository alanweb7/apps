import { CodeProvider } from './../../providers/code/code';
import { Component } from '@angular/core';
import { Loading, NavController, NavParams, InfiniteScroll, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

// import { BackgroundMode } from '@ionic-native/background-mode';
import { AlertController } from 'ionic-angular';
import {Platform} from 'ionic-angular';

import { HomePage } from "./../home/home";

import { Storage } from '@ionic/storage';
// @IonicPage()
@Component({
  selector: 'page-ver-conte-do',
  templateUrl: 'ver-conte-do.html'
})
export class VerConteDoPage {
  public video: any = {};
  public linkVimeo: any = {};

  users: any[];
  page: number;
  imgSrc:any;
  showhidefavorite:any=1;

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild('mySlider') mySlider: any;
  @ViewChild('videoPlayer') mVideoPlayer: any ;
  @ViewChild('iframe') iframe: any;
  @ViewChild('documento') mDocumento: any;

  trustedVideoUrl: SafeResourceUrl;
  loading: Loading;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private codeProvider: CodeProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private domSanitizer: DomSanitizer
    // private backgroundMode: BackgroundMode,
    // private alertCtrl: AlertController
            )
    {  
    let id = navParams.get('info'); 
    // console.log(id);
  

// funcao background mode 
// platform.ready().then(() => {
//   backgroundMode.enable();
//   backgroundMode.on('activate').subscribe(() => {

//     const alert = this.alertCtrl.create({
//       title: 'New Friend!',
//       subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
//       buttons: ['OK']
//     });
//     setTimeout(()=>alert.present(),3000);


//   });
// });

// funcao background mode 
}
ionViewDidLoad(){
  this.presentLoadingDefault();
  // this.mostrarStorage();
}

  ionViewDidEnter(id) {
    // this.mostrarStorage();
    this.users = [];
    this.page = this.navParams.get('info');
    this.getAllUsers(this.page, this.video);
  }



handleIFrameLoadEvent(): void {
  this.loading.dismiss();
}


  getAllUsers(page: any, video: any) {

    // console.log('Pagina conteudo');
    // console.log(page);
    this.codeProvider.getAll(page)
      .then(
        (result: any) => {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          var user = result.data[i];      
          this.users.push(user);

// link vimeo
console.log('link do user Vimeo fora...: ', user.ID_video);
// this.video = { url : 'https://player.vimeo.com/video/286207416'};
this.video = { url : user.video};

  this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video.url);

  this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
  });

  this.loading.present();

console.log('url do vimeo dentro ...: ', this.video);
// link vimeo final

        }

      })
      .catch((error: any) => {
        // this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });


  }

  pushHome(){
    this.navCtrl.setRoot(HomePage);
  } 

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  } 

  mostrarStorage(){

  // Or to get a key/value pair
  this.storage.get('historico').then((val) => {
    console.log('Historico: ', val);
  });
}

  }
