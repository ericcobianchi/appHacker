import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PersonagemProvider } from '../providers/personagem/personagem';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ImagemProvider } from '../providers/imagem/imagem';
import { AngularFireStorageModule } from 'angularfire2/storage';
import  { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { PerfilPage } from '../pages/perfil/perfil';
import { RegistroPage } from '../pages/registro/registro';
import { EditarPage } from '../pages/editar/editar';


var firebaseConfig = {
  apiKey: "AIzaSyCcuR1ERTZrmbjqFqnP9rzRifLiwVNByTE",
  authDomain: "apphacker-4c973.firebaseapp.com",
  databaseURL: "https://apphacker-4c973.firebaseio.com",
  projectId: "apphacker-4c973",
  storageBucket: "apphacker-4c973.appspot.com",
  messagingSenderId: "250148854699",
  appId: "1:250148854699:web:c281a2fec35efafa8c50ee"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    RegistroPage,
    EditarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    RegistroPage,
    EditarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PersonagemProvider,
    ImagemProvider,
  ]
})
export class AppModule {}
