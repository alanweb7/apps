import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CodeProvider } from './../../providers/code/code';

/**
 * Generated class for the PesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage {
public users: any[];
page: number;
public links: any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private codeProvider: CodeProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaPage');
  }
  ionViewDidEnter() {
    // this.mostrarStorage();
    // this.users = [];
    this.page = this.navParams.get('info');
    this.getAllinks(this.page);
  }

getAllinks(page: any) {
  this.codeProvider.getLinks(page)
    .then(
      (result: any) => {
      console.log('Resultados de Links: ',result.data);
      console.log('Links: ', result.data[0]);
        var user = result.data[0]; 
             
        // this.users.push(user);  
        
        this.links = user;

          // this.users.push(links);            
        
    })
    .catch((error: any) => {
      // this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    });
}

}
