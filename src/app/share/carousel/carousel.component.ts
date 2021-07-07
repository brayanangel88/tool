import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Producto } from 'src/app/model/Categoria';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

import { ProductosService } from 'src/app/services/productos/productos.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  effect = 'scrollx';
  listaProductos: Producto[] = []
  @Output() abirCarrito = new EventEmitter<any>();
  constructor(private productos: ProductosService, private carritoCompra: CarritoService, private modal: NzModalService) { }

  llenarProductos() {

    this.productos.getProductos().subscribe(response => {
      
      this.listaProductos = response;


    }, error => {
      
    });
  }
  agregarProducto(id: string, imagen: string, nombre: any, valor: number, cantidad: number) {
    
    let edita = false;
    let data: any;

    this.carritoCompra.verficarCarrito().subscribe(response => {
      response.forEach(element => {
        
        if (element.product_id == id) {
          edita = true;
          data = element
        }
      });

    }, error => {
      
    });
    setTimeout(() => {
      if (edita) {
        
        if (data.availableQuantity <= data.quantity) {
          this.modal.error({
            nzTitle: 'Error',
            nzContent: 'No hay existencias suficientes'
          });
        } else {
          data.quantity++
          this.editarCarrito(data.id, data)
          this.abirCarrito.emit()
        }
      } else {
        this.carritoCompra.agregarProducto(id, 1, imagen, nombre, valor, cantidad)
        this.abirCarrito.emit()
      }
      
    }, 500);

  }

  editarCarrito(id: any, data: any) {
    this.carritoCompra.editarProducto(id, data).then(() => {

    }, (error) => {
      console.error(error);
    });
  }

  // onUpload(event:any){
  //   const id = Math.random().toString(36).substring(2);
  //   const file = event.target.files[0];
  //   const filePath = 'upload/imagen.png';
  //   const ref = this.storage.ref(filePath)
  // }

  ngOnInit(): void {
    this.llenarProductos();
  }

}
