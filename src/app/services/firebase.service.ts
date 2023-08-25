import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  url: string = '';
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {
    //this.getImageFromDatabase().subscribe(a => console.log(a));
    // var prueba = db.object('a')
    // db.list('a').push({ 'asd': 'asdasdasdadsa' })
    // prueba.set({ 'asd123': 'aaaaaaa¿aaaa' }) // crea o updatea en caso de que exista
    // prueba.valueChanges().subscribe(val => console.log(val))
  }

  getImageFromDatabase() {
    return this.db.list('images').valueChanges()
  }
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

}
