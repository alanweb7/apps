import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {
   isConnection : any;
  constructor(private network: Network) {
    console.log('Hello NetworkProvider Provider');
    this.isConnection =Boolean;
  }
  ckeckNetwork():Boolean{
    
    this.network.onConnect().subscribe(()=>{
    
        this.isConnection = true;
        console.log("conexao internet",this.isConnection);
 
    });
   
     this.network.onDisconnect().subscribe(()=>{
       this.isConnection = false;
       console.log("conexao internet",this.isConnection);
 
    });
    return this.isConnection;
  } 


}