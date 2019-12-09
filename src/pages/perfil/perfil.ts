import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { PersonagemProvider } from '../../providers/personagem/personagem';
import { HomePage } from '../home/home';
import { EditarPage } from '../editar/editar';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  personagem = {
    nome: this.navParams.get('nome'),
    sobrenome: this.navParams.get('sobrenome'),
    motivo: this.navParams.get('motivo'),
    pena: this.navParams.get('pena'),
    atualmente: this.navParams.get('atualmente'),
    key: this.navParams.get('key'),
    imagem:this.navParams.get('imagem')
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private personagemProvider: PersonagemProvider,
    public toastCtrl: ToastController)
    {
      if (!navParams.get('key')){
        navCtrl.setRoot(HomePage)
        console.log('aqui');

      }
  }

  mensagemExcluir(){
    this.alertCtrl.create({
      title:"Aviso",
      message:"Deseja excluir esse perfil?",
      buttons:[
        {text: "Sim", handler: () => {this.excluirPerfil();}},
        {text: "Não"}
      ]
    })
      .present();
  }

  excluirPerfil(){
    this.personagemProvider.excluir(this.personagem.key)
    .then(() => {
      this.chamarToast("Perfil apagado")
      this.navCtrl.setRoot(HomePage)
      })
      .catch(()=>{
        this.alert("Não foi possivel Excluir o perfil")
    });
  }

  editarPerfil(personagem){
    this.navCtrl.push(EditarPage,{personagem})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  alert(mensagem: string) {
    this.alertCtrl.create({
      title: 'Aviso',
      subTitle: mensagem,
      buttons: ['OK']
    })
      .present();
  }

  chamarToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 1000,
      position: "top"
    });
    toast.present();
  }

}
