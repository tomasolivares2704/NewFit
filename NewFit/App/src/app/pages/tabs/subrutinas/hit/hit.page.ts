import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { exercices } from 'src/app/models/exercices.models';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.page.html',
  styleUrls: ['./hit.page.scss'],
})
export class HitPage implements OnInit {

  exercices: exercices[] = [];
  user = {} as User;
  isModalOpen = false;
  inputEnabled: boolean;
  exerciceId: string;
  exerciceForm: FormGroup;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getExercices();
  }

  getUser() {
    this.user = this.utilsSvc.getElementInLocalStorage('user') || {} as User;
  }

  getExercices() {
    const path = `user/${this.user.uid}`;
    this.firebaseSrv.getSubcollection(path, 'exercices').subscribe({
      next: (res: exercices[]) => {
        console.log(res);
        this.exercices = res;
      }
    });
  }
}

