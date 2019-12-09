import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { HackerProxie } from '../../proxie/hacker';
import { ImagemProvider } from '../imagem/imagem';



@Injectable()
export class PersonagemProvider {

  private PATH = "personagem/";
  // private user: string = '';

  constructor(
    private db: AngularFireDatabase,
    private imagemProvider: ImagemProvider
    )
    {

    }

    salvar(personagem:HackerProxie){
      return new Promise((resolve, reject)=>{
      if (personagem.key){
        this.db.list(this.PATH).update(
          personagem.key,{
            nome: personagem.nome,
            sobrenome: personagem.sobrenome,
            motivo: personagem.motivo,
            pena: personagem.pena,
            atualmente: personagem.atualmente
          }
        )
        .then(()=>resolve())
        .catch((e)=>reject(e));
      }else{
        this.db.list(this.PATH).push({
            nome: personagem.nome,
            sobrenome: personagem.sobrenome,
            motivo: personagem.motivo,
            pena: personagem.pena,
            atualmente: personagem.atualmente
        })
        .then(()=>resolve())
      }
    });
  }

  buscarTodos() {
    return this.db
      .list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  buscar(key: string) {
    return this.db
      .object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  create(personagem: HackerProxie, foto) {
    return new Promise((resolve, reject) => {
      if (personagem.key) {
        this.db
          .list(this.PATH)
          .update(personagem.key, {
            nome: personagem.nome,
            sobrenome: personagem.sobrenome,
            motivo: personagem.motivo,
            pena: personagem.pena,
            atualmente: personagem.atualmente

          })
          .then(() => resolve())
          .catch(e => reject(e));
      } else {
        this.db
          .list(this.PATH)
          .push({
            nome: personagem.nome,
            sobrenome: personagem.sobrenome,
            motivo: personagem.motivo,
            pena: personagem.pena,
            atualmente: personagem.atualmente,
            imagem: ''
           })
          .then((infoPersonagem) => {
            console.log(foto, infoPersonagem.key)
            this.uploadInformation(foto, infoPersonagem.key);
            resolve()
          });
        }
    });
  }

  async updatePersonagem(id,propriedade, valor){
    this.db.list(this.PATH)
    .update(id,{[propriedade]:valor});
  }

  async uploadInformation(text, idHacker) {
    if (text) {
      let upload = this.imagemProvider.uploadToStorage(text);
      let res = await upload.then()
      console.log(res.metadata.downloadURLs[0])
      await this.updatePersonagem(idHacker, 'imagem', res.metadata.downloadURLs[0])
    }
  }

  excluir(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
