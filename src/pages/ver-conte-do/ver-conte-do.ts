import { CodeProvider } from './../../providers/code/code';
import { Component } from '@angular/core';
import { Loading, NavController, NavParams, InfiniteScroll, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

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
  public galeria: any = {};
  galeriaVideos: any[];
  video_found: any = false;

  users: any[];
  page: number;
  imgSrc:any;
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

        }

       // this.video = { url : 'https://player.vimeo.com/video/286207416'};

var $countVideos = user.album_vimeo.length;
console.log('numero de videos na galeria: ', $countVideos);
console.log('Vimeo galeria: ', user.album_vimeo);
            this.video_found = false;        
          if($countVideos > 0){ 
            this.video_found = true; 
            this.galeriaVideos = [];        
            for (var y = 0; y < user.album_vimeo.length; y++) {
            var albumVideo = user.album_vimeo[y];   
                 
            albumVideo.video_link = this.domSanitizer.bypassSecurityTrustResourceUrl(albumVideo.video_link);          
             this.galeriaVideos.push(albumVideo);

            }

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
    }, 4000);
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

  }
