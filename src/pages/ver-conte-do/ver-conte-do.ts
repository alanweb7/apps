import { CodeProvider } from './../../providers/code/code';
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

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
  users: any[];
  video: any;
  page: number;
  imgSrc:any;
  showhidefavorite:any=1;

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild('mySlider') mySlider: any;
  @ViewChild('videoPlayer') mVideoPlayer: any ;
  @ViewChild('iframe') iframe: any;
  @ViewChild('documento') mDocumento: any;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private codeProvider: CodeProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
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
    this.getAllUsers(this.page);
  }

  getAllUsers(page: any) {

    // console.log('Pagina conteudo');
    // console.log(page);
    this.codeProvider.getAll(page)
      .then(
        (result: any) => {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          var user = result.data[i];      
          this.users.push(user);
          if(this.users[0].videoExterno !== ''){
            this.showhidefavorite = 0;            
          }
          this.iframe = this.iframe.nativeElement;
          this.iframe.src = "https://www.youtube.com/embed/6oB3e6uII0Y";
          alert(this.iframe);          
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
  this.storage.get('name').then((val) => {
    console.log('Historico: ', val);
  });
}

  }
