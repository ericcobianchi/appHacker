import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import firebase from 'firebase/app';
import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formLogin: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController) {

        this.formLogin = this.formBuilder.group({
          email:["",[Validators.required, Validators.email]],
          senha:["", Validators.required]
        });
  }

  submitFormLogin(){
    if(!this.formLogin.valid){
      let toast = this.toastCtrl.create({
        message:"Campos obrigatórios em branco ou inválidos.",
        duration:500,
        position:"top"
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message:" Seja bem vindo.",
        duration:3000,
        position:"top"
      });
      toast.present();
      this.logar();
    }
  }

  logar(){
    this.fire.auth
      .signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.senha)
      .then(data => {
        console.log("aquiiiiiiiiiiiiiiii");

        this.alert("Seja Bem Vindo!");
        this.navCtrl.setRoot(HomePage);

      })
      .catch(error => {
        console.log("error", error);
        let toast = this.toastCtrl.create({
          message: "Usuário ou Senha Incorretos!",
          duration: 500,
          position: "top"
        });
        toast.present();

      })
  }

  registrarUsuario(){
    this.navCtrl.push(RegistroPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  alert(message:string){
    this.alertCtrl.create({
      title:'Aviso',
      subTitle: message,
      buttons:['OK']
    }).present();
  }

  logarComFacebook(){
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
      console.log("data", res);
      let toast = this.toastCtrl.create({
        message: "Seja Bem Vindo!",
        duration: 500,
        position: "top"
      });
      toast.present();
      this.navCtrl.setRoot(HomePage);
    });
  }

  logarComGmail(){
    this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => {
      console.log("data",res);
      let toast = this.toastCtrl.create({
        message: "Seja Bem Vindo!",
        duration: 500,
        position: "top"
      });
      toast.present();
      this.navCtrl.setRoot(HomePage);
    })
  }

}
