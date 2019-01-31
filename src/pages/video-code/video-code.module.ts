import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoCodePage } from './video-code';
import { Camera} from "@ionic-native/camera";
import { MediaCapture } from '@ionic-native/media-capture';
import {  File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
@NgModule({
  declarations: [
    VideoCodePage,
  ],
  imports: [
    IonicPageModule.forChild(VideoCodePage),
  ],
  
  providers: [
    Camera,
    MediaCapture,
    File,
    FilePath
  ]
})
export class VideoCodePageModule {}
