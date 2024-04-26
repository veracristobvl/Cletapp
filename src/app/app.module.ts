import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InfoPanelComponent } from './info-panel/info-panel.component';
import { ModificarPerfilModalComponent } from './modificar-perfil-modal/modificar-perfil-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@NgModule({
  declarations: [AppComponent, InfoPanelComponent, ModificarPerfilModalComponent], 
  imports: [BrowserModule, HttpClientModule ,AngularFireModule, AngularFirestoreModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, provideFirebaseApp(() => initializeApp({"projectId":"mapa-prueba-2-783e3","appId":"1:741559373961:web:22ad4fe6ec532a0c007658","storageBucket":"mapa-prueba-2-783e3.appspot.com","apiKey":"AIzaSyAniTtXlJ8qn3HAEsofyMlPVv2Ih9BF2t0","authDomain":"mapa-prueba-2-783e3.firebaseapp.com","messagingSenderId":"741559373961"})), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
