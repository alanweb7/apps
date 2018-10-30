import { CodeProvider } from './../../providers/code/code';
import { Component } from '@angular/core';
import { Loading, NavController, NavParams, InfiniteScroll, LoadingController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import {Platform} from 'ionic-angular';

import { HomePage } from "./../home/home";

import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

// @IonicPage()

@Component({
  selector: 'page-ver-conte-do',
  templateUrl: 'ver-conte-do.html'
})
export class VerConteDoPage {
  public video: any = {};
  public linkVimeo: any = {};
  public galeria: any = {};
  galeriaVideos: any[];
  video_found: any = false;

  users: any[];
  page: number;
  imgSrc:any;
  info:any;
  showhidefavorite:any=1;

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild('slider') slides: Slides;
  @ViewChild('mySlider') mySlider: any;
  @ViewChild('videoPlayer') mVideoPlayer: any ;
  @ViewChild('iframe') iframe: any;
  @ViewChild('documento') mDocumento: any;

  trustedVideoUrl: SafeResourceUrl;
  loading: Loading;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private codeProvider: CodeProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private oneSignal: OneSignal,
            )
    {  

      this.myIdOnesignal();
    
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

        }

       // this.video = { url : 'https://player.vimeo.com/video/286207416'};

var $countVideos = user.album_vimeo.length;
console.log('numero de videos na galeria: ', $countVideos);
console.log('Vimeo galeria: ', user.album_vimeo);       
          if($countVideos > 0){ 
            this.video_found = true; 
            this.galeriaVideos = [];        
            for (var y = 0; y < user.album_vimeo.length; y++) {

            var albumVideo = this.domSanitizer.bypassSecurityTrustResourceUrl(user.album_vimeo[y].video_link);   
                 
            albumVideo['video_link'] = albumVideo;          
             this.galeriaVideos.push(albumVideo);

            }
            console.log('galeria pronta: ',this.galeriaVideos );
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
    }, 3000);
    
  } 

  mostrarStorage(){

  // Or to get a key/value pair
  this.storage.get('historico').then((val) => {
    console.log('Historico: ', val);
  });
}

slideNext(){
  this.slides.slideNext();
}

slidePrev(){
  this.slides.slidePrev();
}

myIdOnesignal(){
  this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');


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

// registrando tags
this.info = this.navParams.get('info');
var tagCode = this.info.code;
var dataTag = '{"'+tagCode+'":"true"}';
// var Tagcode = JSON.parse('{"'+tagCode+'":"true"}');
var Tagcode = JSON.parse(dataTag);


let alert = this.alertCtrl.create({
  title: 'Tag Code enviado',
  message: JSON.stringify(Tagcode),
  buttons: [{
    text: 'Ok',
    role: 'ok'
  }]
});

this.oneSignal.sendTags(Tagcode);

alert.present();




// this.oneSignal.sendTags({
// code: 'vitoria',
// code1: 'vitoria',
// code2: 'rafael'
// });


  });


}


  }
