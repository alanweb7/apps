import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentoCodePage } from './documento-code';
import { Camera} from "@ionic-native/camera";
//import { ChooserOriginal } from '@ionic-native/chooser';

@NgModule({
  declarations: [
    DocumentoCodePage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentoCodePage),
  ],
  
  providers: [
    Camera,

    //ChooserOriginal
  ]
})
export class DocumentoCodePageModule {}
