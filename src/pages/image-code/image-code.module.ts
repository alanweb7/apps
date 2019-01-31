import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageCodePage } from './image-code';
import { Camera} from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    ImageCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ImageCodePage),
  ],
  providers: [
    Camera,
   ImagePicker,
   File,
   FilePath,
   PhotoViewer
  ]
})
export class ImageCodePageModule {}
