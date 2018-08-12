import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

@Injectable()
export class CodeProvider {
  public myGlobalVar: string;
  private API_URL = 'https://kcode.com.br/kcode_2019/wp-json/code/search/?'
  // position: {latitude: -1.4194118, longitude: -48.4431067}

  constructor(
    public http: Http,
    private storage: Storage,
  ) { }

  getAll(page: any) {
    // console.log('Provider');
    let code = page.code;
    let phoneNumber = page.telephone;
    let latitude = page.position.latitude;
    let longitude = page.position.longitude;
    // console.log(latitude +', '+ longitude);


  // Or to get a key/value pair
  this.storage.get('name').then((val) => {
    var content = val;    
  if(val !== null){
    this.storage.set('name', '{code:'+code+'},'+ content);
  }else{
    this.storage.set('name', '{code:'+code+'},');
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
}