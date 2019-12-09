import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListaProvider {
  public items:any[]= [];

  constructor(public http: HttpClient) {
  }

  getLista(){
    return this.items;
  }
  adicionar(item: any){
    this.items.push(item);
  }
  remover(contato:any){
    this.items.forEach((item,index)=>{
      if (item == contato)this.items.splice(index,1);
    });
  }

}
