import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getFirestore, collection, addDoc, doc, getDoc,updateDoc} from 'firebase/firestore';
import { AlertController } from '@ionic/angular'; // Importa AlertCon
import { Firestore} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'; // Importa Storage


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private alertController: AlertController, private firestore: Firestore, private  storage: Storage) { }


  async subirFotoPerfil(uid: string, foto: File) {
    const photoRef = ref(this.storage, `profile_photos/${uid}`);
    await uploadBytes(photoRef, foto);
  }
  
  async obtenerURLFotoPerfil(uid: string): Promise<string> {
    const photoRef = ref(this.storage, `profile_photos/${uid}`);
    return await getDownloadURL(photoRef);
  }
  
  getCurrentUser() {
    return this.auth.currentUser;
  }

  async register(email: string, password: string, userData: any, photo: File) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Subir la foto de perfil a Firebase Storage
      const photoRef = ref(this.storage, `profile_photos/${userCredential.user.uid}`);
      await uploadBytes(photoRef, photo);

      

      // Agregar el usuario a la colección 'users' con la URL de la foto de perfil
      await addDoc(collection(getFirestore(), 'users'), {
        uid: userCredential.user.uid,
        email: email,
        photoURL: photoRef.fullPath, // Guarda la ruta de la foto en Storage
        ...userData
      });

      await this.showAlert('Success', 'User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }


  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Ingrese su email y password', error);
      await this.showAlert('Error', 'Datos Incorrectos');
      throw error;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  isLoggedIn() {
    return !!this.auth.currentUser;
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
