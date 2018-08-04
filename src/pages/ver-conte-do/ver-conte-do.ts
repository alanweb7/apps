import { CodeProvider } from './../../providers/code/code';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';
import { ViewChild } from '@angular/core';

// import { BackgroundMode } from '@ionic-native/background-mode';
import { AlertController } from 'ionic-angular';
import {Platform} from 'ionic-angular';

import { HomePage } from "./../home/home";
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
  @ViewChild('videoPlayer') mVideoPlayer: any;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private codeProvider: CodeProvider,
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


  ionViewDidEnter(id) {
    this.users = [];
    this.page = this.navParams.get('info');
    this.getAllUsers(this.page);
  }

  getAllUsers(page: any) {

    // console.log('Pagina conteudo');
    // console.log(page);
    this.codeProvider.getAll(page)
      .then((result: any) => {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          var user = result.data[i];      
          this.users.push(user);
          if(this.users[0].videoExterno !== ''){
            this.showhidefavorite = 0;
          }
          // this.mVideoPlayer = 'https://www.youtube.com/embed/${user.videoExterno}';
          let video = this.mVideoPlayer.nativeElement;
          video.src = "https://www.youtube.com/embed/"+user.videoExterno;
          // this.mVideoPlayer = '<iframe src="https://www.youtube.com/embed/' + user.videoExterno + '" frameborder="0" allowfullscreen width="560" height="315" style="position:absolute;top:0;left:0;width:100%;height:100%;" ></iframe>';
//definindo o video pra tela de saida
            // video.play();
        }

      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
     

  }

  pushHome(){
    this.navCtrl.setRoot(HomePage);
  } 

//funcoes do slide
slideNext(){
  this.mySlider.slideNext();
}

slidePrev(){
  this.mySlider.slidePrev();
}



}
// exemplo de retorno da api
// {"data":[{"id":1,"first_name":"Meu primeiro vídeo","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"}]}
