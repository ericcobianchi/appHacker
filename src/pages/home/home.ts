import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { PersonagemProvider } from '../../providers/personagem/personagem';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase/app';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: any;
  personagens: Observable <any>;


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public personagemProvider: PersonagemProvider)
    {
      this.personagens = new Observable <any>();
      this.personagens = this.personagemProvider.buscarTodos();
      this.usuario = firebase.auth().currentUser;
    }

  irParaPerfil(personagem:any){
    let parametrosHacker = { ...personagem}
    this.navCtrl.push(PerfilPage, parametrosHacker);
    let toastCtrl = this.toastCtrl.create({
      message: "Página de perfis",
      duration: 500,
      position: "top"
    })
    toastCtrl.present();
  }
}
