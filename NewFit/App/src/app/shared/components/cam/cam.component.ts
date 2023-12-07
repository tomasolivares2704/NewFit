import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, ReaddirResult } from '@capacitor/filesystem';
import { UtilsService } from 'src/app/services/utils.service';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss'],
})
export class CamComponent  implements OnInit {

  path: string = "TestImages";
  photos: string[] = [];

  @Output() imageSelected = new EventEmitter<string>();

  constructor( private UtilSrv: UtilsService) { }

  ngOnInit() {
    Camera.requestPermissions();
    this.getPhotos();
  }
  //CODIGO NUEVO

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 98,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    if (image) {
      this.imageSelected.emit(image.base64String!); // Emitir evento con la imagen seleccionada
    }
  }

  // CODIGO VIEJO

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
    const fileName = new Date().getTime() + '.jpg';

    await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: photo,
      directory: Directory.Documents,
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
