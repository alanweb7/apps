import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CodeProvider } from '../../providers/code/code';

import { VerConteDoPage } from '../ver-conte-do/ver-conte-do';

import { Geolocation } from '@ionic-native/geolocation';
import { Sim } from '@ionic-native/sim';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the HistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {
  public listaCodes: any;
  public codesFounds: any;
  public codex: any;
  public obj: any;
  public result: any;
  codeNumber:any;
  public endLat: any;
  public endLong: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private global: CodeProvider,
    private sim: Sim,
    private storage: Storage,
    private geo: Geolocation,
  ) {
    this.pushInfoPhone();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoPage');
    this.mostrarStorage();
  }

// capta o que tem no storage
  mostrarStorage(){
    // Or to get a key/value pair
    this.storage.get('historico').then((val) => {

var obj7     = JSON.parse(val);
if(obj7 !== null){

console.log('Historico Atual: ', obj7);
var codesFound = obj7.historico;
this.codesFounds = obj7.historico;
var names = codesFound.map(function (person) { return person.code; });
var sorted = names.sort();

var unique = sorted.filter(function (value, index) {
    return value !== sorted[index + 1];
});

this.listaCodes = unique;
// this.listaCodes = obj7.historico;
console.log('Historico Original: ', this.listaCodes);
console.log('Historico Filtrado: ', unique);

}
    });
  } 
  
  pushInfoPhone(){ 
    // phone number
 this.sim.getSimInfo().then(
    (info) => {
      this.global.myGlobalVar = info.phoneNumber;  
      // alert('Meu fone: '+this.global.myGlobalVar);  
      console.log(info);  
    }
  ).catch(() => {
    (err) => console.log('Unable to get sim info: ', err)
    });
  
  this.sim.hasReadPermission().then(
    (info) => console.log('Has permission: ', info)
  );

  this.sim.requestReadPermission().then(
    () => console.log('Permission granted'),
    () => console.log('Permission denied')
  );

  // alert('Fone Global: ' +this.global.myGlobalVar)      
}
  
  pushPage(code){
    // set a key/value
  // this.storage.set('name', 'Max');
  this.geo.getCurrentPosition().then(res => {
    this.endLat = res.coords.latitude;
    this.endLong = res.coords.longitude;
    console.log(this.endLat );
  // alert("latitude: " + res.coords.latitude);
  // alert("longitude: " + res.coords.longitude);
  }).catch(() => {
  alert("erro ao pegar geolocalizacao");
  })
   // console.log('clicou');
  let latitude = this.endLat;
  let longitude = this.endLong;
  console.log();
  this.navCtrl.push(VerConteDoPage, {
    info: {
      code: code,
      position:{"latitude": latitude, "longitude": longitude},
      telephone: this.global.myGlobalVar
    }
  });
}


filtrar(arr, code) {
  var res = []
  for (var i = 0, j = arr.length; i !== j; i++) {
    if (arr[i].code !== code) res.push(arr[i]);
  }
  return res;
};

removerFavorito(code) {
  // alert('code :'+ code);
  var arr = [
    {code: 'taxi', name: 'John Snow'}, 
    {code: 'hut', name: 'Michael Scolfield'}, 
    {code: 'açai', name: 'Dexter Morgan'}
];

 var novaLista = this.filtrar(this.codesFounds, code);
 var atualizado = JSON.stringify(novaLista);
 this.storage.set('historico', '{"historico":'+ atualizado +'}');
  console.log('Lista de Codes atualizados: ', atualizado);
  console.log('Lista de Codes no Storage: ', this.codesFounds);
  this.navCtrl.setRoot(this.navCtrl.getActive().component); //atualiza apagina atual
}



}
