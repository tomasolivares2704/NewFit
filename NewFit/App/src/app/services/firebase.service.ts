import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.models';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService
  ) { }

  // Autenticación
  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(user: any){
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }

  getAuthState() {
    return this.auth.authState;
  }



  async deleteUser(): Promise<void> {
    try {
      const user = await this.auth.currentUser;

      if (user) {
        await this.auth.signOut();

        await user.delete();
        console.log('Cuenta de usuario eliminada con éxito.');
      } else {
        console.error('No se encontró un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta de usuario:', error);
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.utilsSvc.routerLink('/auth');
    this.utilsSvc.removeElementInLocalStorage('user');
    this.utilsSvc.removeElementInLocalStorage('inicioSesionRegistrado');
  }

  // Firebase (base de datos)
  getSubcollection(path: string, subcollectionName: string) {
    return this.db.doc(path).collection(subcollectionName).valueChanges({idField: 'id'});
  }

  addToSubcollection(path: string, subcollectionName: string, object: any) {
    return this.db.doc(path).collection(subcollectionName).add(object)
  }

  updateDocument(path: string, object: any){
    return this.db.doc(path).update(object);
  }

  deleteDocument(path: string){
    return this.db.doc(path).delete();
  }

}
