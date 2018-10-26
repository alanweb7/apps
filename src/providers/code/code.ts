import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

@Injectable()
export class CodeProvider {
  public myGlobalVar: string;
  private API_URL = 'https://kscode.com.br/ksc_2020/wp-json/code/search/?'
  // private API_URL = 'https://kcode.com.br/kcode_2019/wp-json/code/search/?'
  private APP_URL = 'https://kscode.com.br/ksc_2020/wp-json/code/search/?code_number=pesquisa777'
  // position: {latitude: -1.4194118, longitude: -48.4431067}

  constructor(
    public http: Http,
    private storage: Storage,
    private oneSignal: OneSignal,
  ) { }

  getAll(page: any) {
    // console.log('Provider');
    let code = page.code;
    let phoneNumber = page.telephone;
    let latitude = page.position.latitude;
    let longitude = page.position.longitude;
    // console.log(latitude +', '+ longitude);


  // Or to get a key/value pair
  this.storage.get('historico').then((val) => {

  if(val !== null){
    var obj7     = JSON.parse(val);
    obj7['historico'].push({code:code});
    var atualizado = JSON.stringify(obj7);
    this.storage.set('historico', atualizado);
    console.log('Atualizado: ', obj7);    

  }else{
    // "{"historico":[{"teamId":"1","status":"pending"},{"teamId":"2","status":"member"},{"teamId":"3","status":"member"},{"teamId":"4","status":"pending"}]}" 
    this.storage.set('historico', '{"historico":[{"code":"'+code+'"}]}');
  }
  console.log('Historico: ', val);
});

    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'code_number='+ code +'&phone='+ phoneNumber +'&latitude='+latitude+'&longitude='+ longitude;
      // alert(url);
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
//funcao que grava o code no historico
mostrarStorage(code: any){
// grava o code no push
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
  //   alert.present();
// registrando tags

var  myObjStr = '{"'+code+'":true,"age":2,"favoriteFood":"Steak"}';
var  keyPush = JSON.parse(myObjStr);
alert('dado do push register Tag: '+keyPush);

this.oneSignal.sendTags(
  keyPush
  );


});
// final da função que grava o code no push


  // Or to get a key/value pair
  this.storage.get('name').then((val) => {
      var content = val;    
    if(val !== null){
      this.storage.set('name', '{code:'+code+'},'+ content);
    }else{
      this.storage.set('name', '{code:'+code+'},');
    }
    console.log('Your age is', val);
  });
}

getLinks(page:any) {
  return new Promise((resolve, reject) => {
    let url = this.APP_URL;
    // alert(url);
    this.http.get(url)
      .subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
  });
}

}