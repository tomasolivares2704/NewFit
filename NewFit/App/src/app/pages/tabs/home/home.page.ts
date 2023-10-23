import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Antropometrico } from 'src/app/models/antropometricos.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  antropometrico = {} as Antropometrico;
  user = {} as User;
  loading: boolean = false;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserInfo()
    this.getUser()
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  getUserInfo() {
    let path = `user/${this.user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'antropometrico').subscribe({

      next: (res: Antropometrico[]) => {
        this.antropometrico = res[0];
        console.log(res);
        sub.unsubscribe();
      }
    })
  }

}
