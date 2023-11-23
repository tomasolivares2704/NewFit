import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss'],
})
export class CamComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    Camera.requestPermissions();
  }

  async takePhoto(){
      debugger;
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if(image){
        this.savePhoto(image.base64String!);
      }

  }
  async savePhoto(photo?: string) {
    await Filesystem.writeFile({
      path: 'Test.jpg',
      data: photo,
      directory: Directory.Documents,
      //encoding: Encoding.UTF8,
    });
  }

}
