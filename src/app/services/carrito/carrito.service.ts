import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  idCarrito:any;
  numeroDeProductos = 0;
  productosCarrito:any;




  private carritoSubscribe: Subject<any> = new Subject();


  constructor(private afs: AngularFirestore) {
    this.idCarrito = localStorage.getItem('idCarrito');

  }

  crearCarrito(){
    this.afs.collection('carts').add({status: false}).then((response)=>{
      this.idCarrito = response.id
      localStorage.setItem('idCarrito',(this.idCarrito));
      localStorage.setItem('totalProductosCarrito',('0'));
    })
  }

  verficarCarrito() {
    return this.productosCarrito = this.afs.collection('product_carts', ref => ref.where('cart_id', '==', this.idCarrito)).snapshotChanges().pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as any;
        data.id = action.payload.doc.id;
        
        return data;
      })
    }));;
  }

  editarProducto(id:string,data:any){
    return this.afs.collection('product_carts').doc(id).set(data)
  }
  editarEstadoCarrito(data:any){
    return this.afs.collection('carts').doc(this.idCarrito).set(data)
  }

  agregarProducto(idProducto: string, cantidad: number,imagen:string,nombre:string,valor:number,cantidadDisponible:number) {
    
    this.afs.collection('product_carts').add({
      cart_id: this.idCarrito,
      product_id:idProducto,
      quantity:cantidad,
      imagen:imagen,
      nombre :nombre,
      valor:valor,
      availableQuantity:cantidadDisponible
    }).then((response)=>{
    })
  }

  eliminarProducto(id: string) {
    return this.afs.collection('product_carts').doc(id).delete()
  }


}
