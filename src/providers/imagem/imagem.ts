import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';


@Injectable()
export class ImagemProvider {


  constructor(
    public http: HttpClient,
    private db: AngularFireDatabase,
    private st: AngularFireStorage
  )
  {

  }
  getFilesFormCharacter(id){
  let ref = this.db.list('files', ref => {
    return ref.orderByChild('idHacker').equalTo(id)
  })
  return ref.snapshotChanges()
  .map(changes => {
    return changes.map(c => {
      return{
        key: c.payload.key, ... c.payload.val()
      }
    })
  })
  }

  getFiles(){
    let ref = this.db.list('files')
    return ref.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    })
  }

  uploadToStorage(information): AngularFireUploadTask {
    let nome = `${new Date().getTime()}.jpg`;
    return this.st.ref(`files/${nome}`).putString(information,'data_url');
  }

  storeInfoToDatabase(metainfo, idHacker){
    let toSave = {
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
      idHacker
    }
    return this.db.list(`files`).push(toSave)
  }

  deleteFile(file){
    let key = file.key;
    let storagePath = file.fullPath;
    this.db.list('file').remove(key);
    return this.st.ref(storagePath).delete();
  }

}
