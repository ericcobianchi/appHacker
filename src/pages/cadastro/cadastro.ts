import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HackerProxie } from '../../proxie/hacker';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { HomePage } from '../home/home';
import { ImagemProvider } from '../../providers/imagem/imagem';
import { Camera, CameraOptions} from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  form: FormGroup;
  foto = '';


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private personagemProvider: PersonagemProvider,
    private alertCtrl: AlertController,
    private imagemProvider: ImagemProvider,
    private _camera: Camera,

  )
  {
    this.form = this.formBuilder.group({
      nome:["",[Validators.required, Validators.minLength(3)]],
      sobrenome:["",[Validators.required, Validators.minLength(3)]],
      motivo:["",[Validators.required, Validators.minLength(4)]],
      pena:["",[Validators.required, Validators.minLength(2)]],
      atualmente:["",[Validators.required, Validators.minLength(1)]]
    })
  }

  async cadastrar() {
    if (this.form.valid) {
      let personagemCadastro: HackerProxie = { ...this.form.value };
      try {
        let data = await this.personagemProvider.create(personagemCadastro, this.foto)
        console.log(data);
        console.log(this.foto);

        this.chamarToast('Cadastrado realizado com sucesso');
        this.navCtrl.setRoot(HomePage)
      } catch (erro) {
        this.chamarAlert('Falha ao cadastrar!');
      }
    } else {
      this.chamarToast('Campos em branco!')
    }
  }

  buscarImagem() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      sourceType: this._camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200
    }
    this._camera.getPicture(options).then((imageData) => {
      let foto = 'data:image/jpeg;base64,' + imageData;
      this.foto = foto;
    }, (err) => {
      console.log(err);
    });
  }


  chamarToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 500,
      position: "top"
    })
    toast.present();
  }

  chamarAlert(mensagem: string) {
    this.alertCtrl.create({
      title: 'Aviso',
      subTitle: mensagem,
      buttons: ['OK']
    })
      .present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
