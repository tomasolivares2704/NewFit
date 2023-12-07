import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, ReaddirResult } from '@capacitor/filesystem';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss'],
})
export class CamComponent  implements OnInit {

  path: string = "TestImages";
  photos: string[] = [];

  constructor() { }

  ngOnInit() {
    Camera.requestPermissions();
    this.getPhotos();
  }

  async takePhoto(){
      debugger;
      const image = await Camera.getPhoto({
        quality: 40,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if(image){
        this.savePhoto(image.base64String!);
      }

  }
  async savePhoto(photo?: string) {
    await Filesystem.writeFile({
      path: this.path + '/Test.jpg',
      data: photo,
      directory: Directory.Documents,
      //encoding: Encoding.UTF8,
    });
  }

  getPhotos() {
    Filesystem.readdir(
      {
        path: this.path,
        directory: Directory.Documents
      }
    ).then( files =>{
      this.loadPhotos(files.files);

    }).catch(err => {
      console.log(err);
      Filesystem.mkdir(
        {
          path: this.path,
          directory: Directory.Documents
        }
      )
    })
  }

  loadPhotos(photos: FileInfo[]) {
    photos.forEach(file => {

      Filesystem.readFile({
        path: `${this.path}]/${file.name}`,
        directory: Directory.Documents
      }).then(photo => {
        this.photos.push('data:image/jpeg;base64' + photo.data);
      })
    });
  }

}
