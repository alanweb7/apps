import { Component } from '@angular/core';
import { IonicPage, Navbar ,NavController, NavParams, AlertController, Loading, LoadingController, Slides, ToastController, ViewController } from 'ionic-angular';
import { CodeProvider } from './../../providers/code/code';
import { ViewChild } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { BrowserTab } from '@ionic-native/browser-tab';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NetworkProvider } from '../../providers/network/network';
import { HistoricoService } from '../../providers/historico/historico.service';
import { UtilService } from '../../providers/util/util.service';

//Import Model
import { Historico } from './../../models/historico.model';

@IonicPage({
  priority : 'low',
  segment  : 'DetalheCode/:info/:liberado:/origem:/token',
  defaultHistory:['HomePage'],
  
})
@Component({
  selector: 'page-detalhe-code',
  templateUrl: 'detalhe-code.html',
})
export class DetalheCodePage {
  @ViewChild(Navbar) navBar: Navbar;
  galeria           : any[];
  album_vimeo       : any[];
  titulo            : String;
  descricao         : String;
  email             : String;
  website           : String;
  facebookUser      : String;
  instagramUser     : String;
  linkedin          : String;
  nome_documento    : String;
  documento         : any[];
  tel_whatsapp      : String;
  tel_contato       : String;
  pais              : String;
  page              : number;
  info              : any;
  TagRegCode        : any;
  trustedVideoUrl   : SafeResourceUrl;
  video_found       : any = false;
  calling_code      : String;
  password          : String;
  isprivate         : Boolean;
  isLiberado        : Boolean;
  video_post_status : String;
  origem            : Number;
  video_link        : String;
  @ViewChild('slider') slides: Slides;
  token     :String;
  mostra     : Boolean;
  video: HTMLElement = document.getElementById('myVideo');
  constructor(
              public navCtrl       : NavController, 
              public viewCtrl      : ViewController,
              public navParams     : NavParams,
              //private oneSignal    : OneSignal,
              private codeProvider : CodeProvider,
              private browserTab   : BrowserTab,
              public toast         : ToastController,
              public loadingCtrl   : LoadingController,
              private domSanitizer : DomSanitizer,
              private alertCtrl    : AlertController,
              private photoViewer    : PhotoViewer,
              public  net          : NetworkProvider,
              private historico    : HistoricoService,
              private oneSignal    : OneSignal, 
              public util          : UtilService

            
            ) {
                  
            }

  ionViewDidLoad() {
    this.album_vimeo = [];
    this.galeria     = [];
    this.documento   = [];
    this.page        = this.navParams.get('info');
    this.isLiberado  = this.navParams.get('liberado');
    this.origem      = this.navParams.get('origem');
    this.token       = this.navParams.get('token');
    this.mostra      = false;
    //console.log('ionViewDidLoad DetalheCodePage',this.origem);
    this.util.showLoading("Aguarde...");
    this.historico.getAll()
    .then((movies:any) => {}
    );
    this.getCode();
      this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      //origem ==1 home
      //origem ==2 meus codes
      //oritem == 3 historico
      if(this.origem == 1){
        this.navCtrl.setRoot('HomePage');
      }else if(this.origem == 2){
        this.navCtrl.setRoot('MeusCodesPage',{token:this.token});
      }
      else if(this.origem == 3 ){
        this.navCtrl.setRoot('HistoricoPage');
      }else{
        this.navCtrl.setRoot('HomePage');
      }
     
     }  
  }
 
  getCode(){
    if(this.net.ckeckNetwork()){
          this.codeProvider.getAll(this.page)
          .subscribe(
                (result: any) =>{
                  if(result.data[0]['code'] != ""){
                    this.myIdOnesignal();
                    this.util.loading.dismiss();
                    if( this.isLiberado == true &&  result.data[0]['t_conteudo'] == "1"  && result.data[0]['isprivate'] == true){
                      //console.log("entreei no prompt detalhe");
                      
                      
                    }
                     else if( this.isLiberado == true &&  result.data[0]['t_conteudo'] == "2"){
                        //console.log("entreei no prompt");
                        this.openWithInAppBrowser(result.data[0]['link']);
                        this.viewCtrl.dismiss();
                        //console.log("entrei no teste primeiro if link");

                      }else if(this.isLiberado == false && result.data[0]['isprivate'] == true && result.data[0]['t_conteudo'] == "1"){
                              this.navCtrl.setRoot('CodeSenhaPage',{origem:1,id_code:result.data[0]['id'],link:null,info: this.page
                            });
                            // //console.log("entreei no prompt");
                              //console.log("entrei no teste segundo if if");


                      }else if(this.isLiberado == false && result.data[0]['isprivate'] == true && result.data[0]['t_conteudo'] == "2"){
                        this.navCtrl.setRoot('CodeSenhaPage',{id_code:result.data[0]['id'],link:result.data[0]['link'],info: this.page
                      });
                      // //console.log("entreei no prompt");
                        //console.log("entrei no teste segundo if if");


                      }
                      
                      else if(this.isLiberado == false &&  result.data[0]['t_conteudo'] == "2" && result.data[0]['isprivate'] == false){
                        //console.log("entreei no prompt");
                        this.openWithInAppBrowser(result.data[0]['link']);
                        this.viewCtrl.dismiss();
                        //console.log("entrei no teste primeiro if link");
                      } 
                    //console.log(result.data[0]['t_conteudo']);
                    //console.log(result.data[0]['code']);
                    if(result.data[0]['galeria'].length > 0){
                      this.createORupdateHistorico(result.data[0]['id'],result.data[0]['code'],result.data[0]['titulo'],result.data[0]['galeria'][0]['img_link']);

                    }
        
                     //testa se meu retorno da API é vazio
                     this.titulo           = result.data[0]['titulo'];
                     this.descricao        = result.data[0]['descricao'];
                     this.email            = result.data[0]['email'];
                     this.website          = result.data[0]['website'];
                     this.facebookUser     = result.data[0]['facebookUser'];
                     this.instagramUser    = result.data[0]['instagramUser'];
                     this.linkedin         = result.data[0]['linkedin'];
                     this.nome_documento   = result.data[0]['nome_documento'];
                    // this.documento        = result.data[0]['documento'];
                     this.pais             = result.data[0]['pais'];
                     this.tel_whatsapp     = result.data[0]['tel_whatsapp'];
                     this.tel_contato      = result.data[0]['tel_contato'];
                     this.calling_code     = result.data[0]['calling_code'];
                     this.isprivate        = result.data[0]['isprivate'];
                    /*  if(this.isprivate){
                          this.isLiberado = false;
                     }else{
                          this.isLiberado = true;
                     } */
                     this.TagRegCode = result.data[0]['code'];
                     if(this.TagRegCode !== ''){
                       //this.myIdOnesignal();
                     }
                     //popula imagem
                     this.video_found = true; 
                     for (var i = 0; i < result.data[0]['galeria'].length; i++) {
                       var gal = result.data[0]['galeria'][i];      
                      
                       this.galeria.push(gal);
             
                     }
                     //popula documento
                     for (var i = 0; i < result.data[0]['documento'].length; i++) {
                       var doc = result.data[0]['documento'][i];      
                       this.documento.push(doc);
             
                     }
                     //popula video 
                     for (var i = 0; i < result.data[0]['album_vimeo'].length; i++) {
                         let vid =  result.data[0]['album_vimeo'][i];
                         let img = vid.video_pictures.replace('?r=pad','');
                         vid.video_pictures = img;
                         if(vid.post_status == "complete"){
                            vid.video_link = this.domSanitizer.bypassSecurityTrustResourceUrl(vid.video_link);   
                       
                         }
                                 
                       this.album_vimeo.push(vid);
                       if(i== 0){
                        this.video_link = vid.video_link;
                        this.mostra = true;
                        this.video_post_status = vid.post_status;
                       }
                     
             
                     }
                    
                                   
             
                          //console.log("galeria"+this.galeria);
                          //console.log("vimedo"+this.album_vimeo);
                }else{
                          this.toast.create({ message: 'KSCODE não existe!', position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                          this.util.loading.dismiss(); 
                          //console.log("entrei no code não existe");
                          this.navCtrl.setRoot('HomePage');
                 }
                  
        
                } ,(error:any) => {
                  this.toast.create({ message: 'Ocorreu um erro inesperado !', position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                  //console.log("entrei no erro não existe");
                  this.util.loading.dismiss(); 
                  this.navCtrl.setRoot('HomePage');
            
                }); 
               
      }else{
             this.navCtrl.setRoot('NotNetworkPage');
      } 
  }
  handleIFrameLoadEvent(): void {
 
  }
  viewPhoto(img){
    this.photoViewer.show(img);
  }
 createORupdateHistorico(id,code,titulo,img){
    let contextHist: Historico;
                    //grava o historico
                    this.historico.getById(id)
                    .then((existe: Number) => {
                      //console.log("retorno",existe);
                      if (existe < 0) {
                            contextHist = new Historico(id,code,titulo,img);
                            //grava historico no banco de dados local
                            this.historico.create(contextHist)
                              .then((data: any) => {
                                //console.log("histórico criado"+data);
                                               
                            });
                      }else{
                               //grava historico no banco de dados local   
                              this.historico.update(titulo,img,code,id)
                                   .then((data: any) => {
                                    //console.log("histórico atualizado"+data);
                              });
                      }

                    });
  }
 openWithInAppBrowser(url){
    //console.log("meu link",url);
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      } 
    });
  }
  
myIdOnesignal(){
  this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');


  this.oneSignal.endInit();
  this.oneSignal.getIds().then((id) => {
    //console.log(id);

// registrando tags
this.info = this.navParams.get('info');
var tagCode = this.TagRegCode;

var dataTag = '{"'+tagCode+'":"true"}';
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

// alert.present();


  });


}
 selectVideo(video_link,status){
  this.video_link        = video_link;
  this.mostra            = true;
  this.video_post_status = status;

 }
  slideNext(){
    this.slides.slideNext();
    
  }
  
  slidePrev(){
    this.slides.slidePrev();
  }


}
