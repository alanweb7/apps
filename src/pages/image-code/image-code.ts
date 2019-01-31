import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ActionSheetController, Platform ,App, ViewController, Loading, LoadingController, ToastController, AlertController  } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File, Entry } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';import { ImagePicker } from '@ionic-native/image-picker';
import { PhotoViewer } from '@ionic-native/photo-viewer';
//Import Provider
import { NetworkProvider } from '../../providers/network/network';
import { CodeProvider } from '../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
@IonicPage({
  priority : 'low',
  segment  : 'ImageCode/:imagens/:code/:token/:qtd/:pacote',
  defaultHistory:['MenuCodePage']
})
@Component({
  selector: 'page-image-code',
  templateUrl: 'image-code.html',
})
export class ImageCodePage {

  images        : any[];
  imagesbase64  : String;
  caminho       : any[];
  token         : any;
  id_code       : any;
  qtd           : Number;
  pacote        : String;

  constructor(
    public navCtrl         : NavController, 
    public navParams       : NavParams, 
    public camera          : Camera, 
    public actionSheetCtrl : ActionSheetController,
    public platform        : Platform,
    public viewCtrl        : ViewController,
    public appCtrl         : App,
    public imagePicker     : ImagePicker,
    private photoViewer    : PhotoViewer,
    public file            : File,
    public filePath        : FilePath,
    private codeProvider   : CodeProvider,
    public  net            : NetworkProvider,
    public toast           : ToastController,
    public alertCtrl       : AlertController,
    public loadingCtrl     : LoadingController,
    public util            : UtilService,
             ) {
  }

  ionViewDidLoad(){
    this.images       = [];
    this.caminho      = [];
    this.token        = String;
    this.id_code      = String;
    this.pacote       = "";
    this.id_code      = "";
    this.token        = "";
    this.imagesbase64 = "";
    this.qtd          = 0;
    this.imagesbase64 = this.navParams.get('imagens');
    this.token        = this.navParams.get('token');
    this.id_code      = this.navParams.get('code');
    this.getImagenServe();
  }
 getImagenServe(){
   if(this.imagesbase64 != "" && this.imagesbase64 != null){
        this.images=[];
        for (let i = 0; i < this.imagesbase64.length; i++) {
            this.images.push(this.imagesbase64[i]);
       }
        this.imagesbase64="";
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
         //console.log('Disagree clicked');
       }
     },
     {
       text: 'EXCLUIR',
       handler: () => {
         this.imagen_delete(id_img);
       }
     }
   ]
 });
 confirm.present();
} 
imagen_delete(id_img){
  if(this.net.ckeckNetwork()){
        this.util.showLoading("Aguarde...");
        this.codeProvider.imagen_delete(this.token,id_img)
        .subscribe(
              (result: any) =>{
               this.util.loading.dismiss(); 
                if(result.status == 200){
                  //console.log("result delete code",result);
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                  //console.log("midias",result.midias);
                  this.imagesbase64="";
                  if(result.midias.length > 0){
                    this.imagesbase64 =result.midias;
                    this.getImagenServe();
                  }else{
                    this.images = [];
                   // this.getImagenServe();
                  }
                 // this.navCtrl.push(this.navCtrl.getActive().component,{imagens:result.midias,token:this.token,code:this.id_code}); //atualiza apagina atual
                 }else if(result.status == 402){
                    this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                    this.navCtrl.push('LoginPage');
                  }
                  else if(result.status == 403){
                    this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                  }

        } ,(error:any) => {
              
        });
      
  }else{
    this.navCtrl.setRoot('NotNetworkPage');
  } 
}
//chama pra escolher a opção da foto
onActionSheet(): void {
    this.actionSheetCtrl.create({
      title: 'Selecione a image',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            
              this.getPictures(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    }).present();
  }


  
  private takePicture(sourceType: number): void {

    let cameraOptions    : CameraOptions = {
      correctOrientation: true,
      quality: 100,
      saveToPhotoAlbum: false,
      sourceType: sourceType,
      mediaType: this.camera.MediaType.PICTURE
          
    };
  /*   if(this.images.length >= this.qtd && this.images.length > 0){
      const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'Você atingiu a quantidade de imagens diponíveis no pacote:'+this.pacote+'<br>'+this.qtd+' Vídeos por CODE',
        buttons: ['OK']
      });
      alert.present();
    }else{ */
            this.camera.getPicture(cameraOptions)
            .then((fileUri: string) => {
              //inclui na array da tela 
              //console.log(fileUri);
              this.images.push({id: "",img_link: fileUri});
              //converter base64
              this.util.converterBase64(fileUri).then((base64:any) => {
                base64.replace('', '+');
                this.caminho.push({files:base64,file_name:fileUri});
              });
              //console.log("imagens caminho",this.caminho);
            }).catch((err: Error) => console.log('Camera error: ', err));

         /*  } */
    }
  //visualizar foto tamnho maior
  viewPhoto(img){
    this.photoViewer.show(img);
  }
  getPictures(sourceType: number){ 
    let options = {
      maximumImagesCount: 8,
      quality: 100,
      sourceType: sourceType
    }
/*     
      const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'Você atingiu a quantidade de imagens diponíveis no pacote:'+this.pacote+'<br>'+this.qtd+' Vídeos por CODE',
        buttons: ['OK']
      });
      alert.present(); */
 
    this.imagePicker.getPictures(options).then( results =>{
      for(let i=0; i < results.length;i++){
        //console.log("result image picker",results[i]);
        if(results[i] != "K" && results[i] != "O"){
            //inclui na array da tela 
            this.images.push({id: "",img_link: results[i]});
            //converter base64
            this.util.converterBase64(results[i]).then((base64:any) => {
              base64.replace('', '+');
            
              this.caminho.push({files:base64,file_name:results[i]});
            });
            
             //console.log("imagens caminho",this.caminho);
            
        }
        
       
      }
    });
  
  }
  enviar(){
    this.util.showLoading("Enviando...");
    if(this.caminho.length >0){
        if(this.net.ckeckNetwork()){
            this.codeProvider.imagen_create(this.id_code,this.token,this.caminho) 
            .subscribe(
              (result: any) =>{
                this.util.loading.dismiss(); 
                if(result.status == 200){
                  //console.log("midias",result);
                  this.imagesbase64 = "";
                  this.caminho=[];
                  this.imagesbase64 =result.midias;
                  this.getImagenServe();
                }else if(result.status == 402){
                  this.navCtrl.push('LoginPage');
                }
                else if(result.status == 403){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
              
                }
            },(error:any) => {
              //console.log('erro',error);
                this.util.loading.dismiss();  
                this.toast.create({ message: "Ocorreu um erro!", position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'erro'  }).present();
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
  
}
