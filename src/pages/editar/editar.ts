import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HackerProxie } from '../../proxie/hacker';
import { HomePage } from '../home/home';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { PerfilPage } from '../perfil/perfil';


@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
  form: FormGroup;
  hackerProxie: HackerProxie;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public personagemProvider: PersonagemProvider

  )
  {
    this.hackerProxie = new HackerProxie();
    this.hackerProxie = this.navParams.get("personagem");
    this.initialize();
  }

  initialize(){
    if(this.navParams.get("personagem")){


    this.form = this.formBuilder.group({
      nome:[[this.hackerProxie.nome],Validators.required],
      sobrenome:[[this.hackerProxie.sobrenome],Validators.required],
      motivo:[[this.hackerProxie.motivo],Validators.required],
      pena:[[this.hackerProxie.pena],Validators.required],
      atualmente:[[this.hackerProxie.atualmente],Validators.required]

    });
    }else{
      this.form = this.formBuilder.group({
        nome:['',[Validators.required]],
        sobrenome:['',[Validators.required]],
        motivo:['',[Validators.required]],
        pena:['',[Validators.required]],
        atualmente:['',[Validators.required]]

      });
    this.navCtrl.setRoot(HomePage)
    }
  }

  cadastrar() {
    this.hackerProxie.nome = this.form.value["nome"];
    this.hackerProxie.sobrenome = this.form.value["sobrenome"];
    this.hackerProxie.motivo = this.form.value["motivo"];
    this.hackerProxie.pena = this.form.value["pena"];
    this.hackerProxie.atualmente = this.form.value["atualmente"];
    this.personagemProvider.salvar(this.hackerProxie)
      .then(data => {
        this.chamarToast("Perfil Salvo!")
        this.navCtrl.setRoot(PerfilPage);
      })
      .catch(error => {
        this.chamarToast("Erro ao Salvar")
        console.log(error);
      });
  }

  cancelar(){
    this.navCtrl.pop();
  }

  chamarToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 500,
      position: "top"
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');
  }

}
