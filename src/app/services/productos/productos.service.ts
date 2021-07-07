import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private afs:AngularFirestore) {
   ;

   }
   private productos!: Observable<Producto[]>;
   getProductos(){
   // return this.categoria = this.db.collection<any>('productos', ref => ref.where('tipo', '==', categoria)).snapshotChanges();
   
    return  this.productos = this.afs.collection('products').snapshotChanges().pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as Producto;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
   }
}
