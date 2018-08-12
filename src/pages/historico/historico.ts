import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public codex: any;
  public obj: any;
  public result: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoPage');
    this.mostrarStorage();
  }

// capta o que tem no storage
  mostrarStorage(){
    // Or to get a key/value pair
    this.storage.get('name').then((val) => {

this.codex = {data:
  {id: "523", code: val, titulo: "FABRICA DE AÇAI GOOLA / PA.", nome_video: "", videoExterno: "6oB3e6uII0Y"}
};
  console.log('lista', this.codex); 
    this.listaCodes = [
      {code:"John"},
      {code:"John Master"},
      {code:"John Rister"},
    ];
    console.log(this.listaCodes);
    });
  }  
}
