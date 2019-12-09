import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  formRegistro: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private fire: AngularFireAuth)
    {
      this.formRegistro = this.formBuilder.group({
        email: ["", [Validators.required,Validators.email]],
        senha: ["", Validators.required],
        confSenha: ["", Validators.required]
      });
    }


  submitRegistro(){
    if(this.formRegistro.valid){
      this.registrar();
      }else if(this.formRegistro.value.senha != this.formRegistro.value.confSenha){
        this.chamarToast("Senhas não conferem");
      }else{
        this.chamarToast("Campos em branco")
      }
    }

  registrar(){
    this.fire.auth.createUserWithEmailAndPassword(
      this.formRegistro.value.email,
      this.formRegistro.value.senha
    )
    .then(data => {
      console.log(data);
      this.chamarToast("Usuário registrado.")
      this.navCtrl.setRoot(HomePage);
    })
    .catch(error =>{
      console.log("error", error);
    });
  }

  voltar(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  chamarToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 500,
      position: "top"
    });
    toast.present();
  }

}
