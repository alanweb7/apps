import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, ToastController, ModalController, ActionSheetController, Platform } from 'ionic-angular';
//import Native
import { Camera, CameraOptions } from "@ionic-native/camera";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions,CaptureVideoOptions } from '@ionic-native/media-capture';
import { File, DirectoryEntry, FileEntry, Entry } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
//import Provider
import { FilePath } from '@ionic-native/file-path';
import { NetworkProvider } from '../../providers/network/network';
import { CodeProvider } from './../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
@IonicPage({
  priority : 'low',
  segment  : 'VideoCode/:videos/:code/:token/:qtd/:pacote',
  defaultHistory:['MenuCodePage']
})
@Component({
  selector: 'page-video-code',
  templateUrl: 'video-code.html',
})
export class VideoCodePage {

  token        : any;
  id_code      : any;
  videos       : any[];
  vidbase64    : String;
  caminho      : any[];
  qtd          : Number;
  pacote       : String;
  videos_serve : any[];
  fullPath     : string;
  name         : string;
 
  constructor(
               public navCtrl         : NavController,
               public navParams       : NavParams,
               private codeProvider   : CodeProvider,
               public  net            : NetworkProvider,
               public toast           : ToastController,
               public camera          : Camera, 
               private alertCtrl      : AlertController,
               public file            : File,
               public filePath        : FilePath,
               public platform        : Platform,
               private base64         : Base64,
               public modalCtrl       : ModalController,
               public loadingCtrl     : LoadingController,
               public actionSheetCtrl : ActionSheetController,
               private mediaCapture   : MediaCapture,
               public util            : UtilService

              ) {
  }

  ionViewDidLoad() {
    this.caminho       = [];
    this.videos        = [];
    this.caminho       = [];
    this.videos_serve  = [];
    this.token         = String;
    this.id_code       = String;
    this.id_code       = "";
    this.token         = "";
    this.vidbase64     = "";
    this.qtd           = 0;
    this.pacote        = "";
    this.vidbase64     = this.navParams.get('videos');
    this.token         = this.navParams.get('token');
    this.id_code       = this.navParams.get('code');
    this.qtd           = this.navParams.get('qtd');
    this.pacote        = this.navParams.get('pacote');
    
    this.getVideoServe();
    console.log("qtd",this.qtd,"pacote",this.pacote);
   }
  //preencher lista vinda por parametro
  getVideoServe(){
    this.videos =[];
    console.log("videos",this.vidbase64);
    if(this.vidbase64 != "" && this.vidbase64 != null){
         for (let i = 0; i < this.vidbase64.length; i++) {
              //descomentar
            //  this.vidbase64[i]['video_link'] = this.domSanitizer.bypassSecurityTrustResourceUrl(this.vidbase64[i]['video_link']);   
              this.videos.push(this.vidbase64[i]);
              this.videos_serve.push(this.vidbase64[i]);
        }
        console.log("videos",this.videos);
         this.vidbase64 ="";
    }
  }
//chama pra escolher a opção da foto
onActionSheet(): void {
  this.actionSheetCtrl.create({
    title: 'Selecione a image',
    buttons: [
      {
        text: 'Link de vídeo externo',
        handler: () => {
          
            this.showPrompt();
        }
      },
      {
        text: 'Galeria',
        handler: () => {
          this.takePicture();
        }
      },
    /*    {
        text: 'Camera',
        handler: () => {
          this.VideoCapture();
        }
      },  */
      {
        text: 'Cancelar'
      }
    ]
  }).present();
}
showPrompt() {
    const prompt = this.alertCtrl.create({
        title: 'Escolha o seu CODE',
        message: "Informe o link do seu vídeo",
        inputs: [
          {
            name: 'link',
            placeholder: 'Informe o link'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Publicar',
            handler: data => {
              console.log('Saved clicked',data.link);
              this.insertVideoLinkArray(data.link);
            }
          }
        ]
      });
      prompt.present();
  }

 public insertVideoLinkArray(link){
  this.util.showLoading("Enviando..");
    if(this.net.ckeckNetwork()){
      
          this.codeProvider.video_link_create(this.id_code,this.token,link) 
           .subscribe(
              (result: any) =>{    
                this.util.loading.dismiss(); 
                if(result.status == 200){
                  console.log("result delete code",result);
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                  this.vidbase64 = result.midias;
                  this.getVideoServe();
                }else if(result.status == 402){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();
                  this.navCtrl.push('LoginPage');
                }
                else if(result.status == 403){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                }

           } ,(error:any) => {
            this.toast.create({ message:"Não foi possível conectar ao servidor!", position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
            this.util.loading.dismiss(); 
            this.navCtrl.setRoot('HomePage');
           });

    }else{
      this.util.loading.dismiss(); 
        this.navCtrl.setRoot('NotNetworkPage');
    } 
 
 }
  VideoCapture(){
  /*   this.toast.create({ message:"Grave um vídeo de até 15 minutos", position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();
           
    let options: CaptureVideoOptions = { limit: 1,quality:75};
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) =>{
            //inclui na array da tela 
            this.vidbase64 = "";
            this.caminho   = [];
            this.videos    = [];
            this.videos    = this.videos_serve;
          console.log(data[0]['fullPath'],data[0]['name']);
          this.fullPath    = data[0]['fullPath'];
          this.name        = data[0]['name'];
          this.base64.encodeFile(data[0]['fullPath']).then(base64File =>{
            base64File.replace('data:image/*;charset=utf-8;base64,','');
            console.log("teste video cam localURL",base64File);
            base64File.replace('', '+');
            this.caminho[0]={files:base64File,file_name:this.name};
            this.videos.push({id: "",video_link:this.fullPath,file_name:this.name});
            
          } );
          
               
        },
        (err: CaptureError) => console.error(err)
      );
      */
       //converter base64
       this.util.converterBase64("file:///data/user/0/br.com.kscode.app360/files/VID_20190130_144836177.mp4").then((base64:any) => {
        base64.replace('', '+');
        console.log("caminho",);
        console.log('base',base64);
        this.caminho.push({files:base64,file_name:'VID_20190130_144836177.mp4'});
      });
     let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30,
      quality :50
    }
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');    
      this.file.createDir(this.file.externalRootDirectory,"KSCODE",false).then(res=>{
           console.log("pasta",res);
           this.name=res.nativeURL;
      });  
     
     
      var toDirectory = this.file.externalCacheDirectory;
       console.log(this.file.externalCacheDirectory);
       console.log(this.file.externalDataDirectory);
       console.log(this.file.externalRootDirectory);
        console.log(this.name);
      this.file.copyFile(fromDirectory , fileName ,this.file.externalRootDirectory+"/WhatsApp/Media/WhatsApp Video/" , fileName).then((res) => {
        console.log("caprute",fromDirectory,toDirectory,fileName,res);
            this.fullPath=res.nativeURL;
           this.baseg4();
           /* this.filePath.resolveNativePath(this.fullPath)
           .then((correctFileUri: string) => {
                console.log(correctFileUri);
                this.fullPath=correctFileUri;
                this.baseg4();
           }) */
           /* //converter base64
           this.util.converterBase64(toDirectory).then((base64:any) => {
            base64.replace('', '+');
            console.log( "teste2",base64);
            this.caminho.push({files:base64,file_name:res.nativeURL});
          });
             //converter base64
             this.util.converterBase64(res.fullPath).then((base64:any) => {
              base64.replace('', '+');
              console.log( "teste3",base64);
              this.caminho.push({files:base64,file_name:res.nativeURL});
            });
          //converter base64
          this.util.converterBase64(res.filesystem).then((base64:any) => {
            base64.replace('', '+');
            console.log( "teste4",base64);
            this.caminho.push({files:base64,file_name:res.nativeURL});
          }); */
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
       
      }
    baseg4(){
         //converter base64
         console.log("full",this.fullPath);
         this.util.converterBase64(this.fullPath).then((base64:any) => {
          base64.replace('', '+');
          console.log( "teste1",base64);
          this.caminho.push({files:base64,file_name:this.fullPath});
        });
    }
  private takePicture(): void {

    const options: CameraOptions = {
      quality: 100,
    //  allowEdit:true,
      sourceType :this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO,
      saveToPhotoAlbum: true
    }
 
    /*   const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'Você atingiu a quantidade de vídeos diponíveis no pacote:'+this.pacote+'<br>'+this.qtd+' Vídeos por CODE',
        buttons: ['OK']
      });
      alert.present(); */

     this.camera.getPicture(options).then((imageData) => {
         //testa se o arquivo selecionado é um video
          if(this.util.getExtension(imageData) != '.mp4'){
            let alert = this.alertCtrl.create({
              title: 'Arquivo Inválido',
              subTitle: 'Selecione um arquivo de Vídeo',
              buttons: ['OK']
            });
            alert.present();
          }else{
            //inclui na array da tela 
            this.vidbase64 = "";
            this.caminho   = [];
            this.videos    = [];
            this.videos    = this.videos_serve;
            this.videos.push({id: "",video_link: imageData,file_name:imageData,post_status:1});
            console.log("teste video takep",imageData);
            
               
         
            //converter base64
            this.util.converterBase64(imageData).then((base64:any) => {
              console.log("teste video takep",imageData);
              console.log("teste video takep",base64);
              base64.replace('', '+');
                this.caminho[0]={files:base64,file_name:imageData};
            });
          }

    }, (err) => {
     // Handle error
    });
  
    

  }

  handleIFrameLoadEvent(): void {
 
  }
  video_delete(id_code){
    if(this.net.ckeckNetwork()){
          this.util.showLoading("Aguarde..");
          this.codeProvider.video_delete(this.token,id_code)
          .subscribe(
                (result: any) =>{
                  this.util.loading.dismiss(); 
                  if(result.status == 200){
                    console.log("result delete code",result);
                    this.toast.create({ message: 'Excluído com sucesso !', position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                    this.vidbase64 = result.midias;
                    this.getVideoServe();
                  }else if(result.status == 402){
                    this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();
                    this.navCtrl.push('LoginPage');
                  }
                  else if(result.status == 403){
                    this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                  }

          } ,(error:any) => {
            this.toast.create({ message:"Não foi possível conectar ao servidor!", position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
            this.util.loading.dismiss(); 
            this.navCtrl.setRoot('HomePage');
          });
        
   }else{
    this.navCtrl.setRoot('NotNetworkPage');
   } 
  }
  enviar(){
    this.util.showLoading("Enviando...");
    if(this.caminho.length >0){
        if(this.net.ckeckNetwork()){
        this.codeProvider.video_create(this.id_code,this.token,this.caminho) 
                    .subscribe(
                         (result: any) =>{
                          this.util.loading.dismiss(); 
                            if(result.status == 200){
                                //limpa array
                                this.vidbase64="";
                                this.caminho =[];
                                console.log("result servidor",result);
                                //repopula result do servidor
                                this.vidbase64 = result.midias;
                                this.getVideoServe();
                                this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                         
                           } else if(result.status == 402){
                              this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                              this.navCtrl.push('LoginPage');
                            }
                            else if(result.status == 403){
                              this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                            }
                          },(error:any) => {
                            console.log('erro',error);
                            this.toast.create({ message:error, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                            this.util.loading.dismiss(); 
                          //  this.navCtrl.setRoot('HomePage');
                          }); 
                    } else{
                      this.util.loading.dismiss();
                      this.navCtrl.setRoot('NotNetworkPage');
                 }   
          }else{
              
              this.util.loading.dismiss();
                    let alert = this.alertCtrl.create({
                      title: 'AVISO!',
                      subTitle: 'Selecione uma documento antes de enviar',
                      buttons: ['OK']
                    });
                    alert.present();
          }
  }
  //chamada alerta de confirmação antes de excluir
 showConfirm(id_img) {
  const confirm = this.alertCtrl.create({
   title: 'Tem certeza que deseja excluir este item ?',
   message: '',
   buttons: [
     {
       text: 'Cancelar',
       handler: () => {
         console.log('Disagree clicked');
       }
     },
     {
       text: 'EXCLUIR',
       handler: () => {
         this.video_delete(id_img);
       }
     }
   ]
 });
 confirm.present();
} 
  ShowVideo(video){
    let myModal =this.modalCtrl.create('VideoShowPage',{videos:video});
    myModal.present();
  }
 
 
}
