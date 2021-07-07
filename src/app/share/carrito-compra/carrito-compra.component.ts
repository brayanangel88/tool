import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import * as action from '../../carrito.actions'

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.scss']
})
export class CarritoCompraComponent implements OnInit {
  isVisible = false;
  isVisibleOrdenCompra = false;
  seleccionado: any;
  total= 0;
  lista: number[] = [1, 2, 3, 4,5];
  listaProductosCarrito: any[] = []
  totalProductosCarrito=0
  estado!:Observable<boolean>;
  @Output() cerrarCarrito = new EventEmitter<any>();
  constructor(private store:Store<{carrito:boolean}>,private carritoCompra: CarritoService,private modal: NzModalService) { }

  ngOnInit(): void {
    this.estado = this.store.pipe(select('carrito'))
  }

  estadoCarrito() {
    if(this.totalProductosCarrito > 0){
      this.store.dispatch(action.comprado())
      this.isVisible = false;
      this.estado.subscribe(response=>{
      this.isVisibleOrdenCompra = response;
      })
      let data={status:true}
      this.carritoCompra.editarEstadoCarrito(data).then(() => {
        
      }, (error) => {
        console.error(error);
      });
    }else{
      this.modal.warning({
        nzTitle: 'Carrito Vacio',
        nzContent: 'Debe seleccionar algun producto'
      });
    }
   
    //this.isVisibleOrdenCompra = this.estado
  }
  reiniciarCarrito() {
    
    this.store.dispatch(action.pendiente())
    this.isVisible = true;
    this.estado.subscribe(response=>{
      this.isVisibleOrdenCompra = response;
    })
    let data={status:false}
      this.carritoCompra.editarEstadoCarrito(data).then(() => {
      }, (error) => {
        console.error(error);
      });
    //this.isVisibleOrdenCompra = this.estado
  }

  llenarCarrito() {
    
    this.estado.subscribe(response=>{
      if(!response){
        this.isVisible = true;
        this.carritoCompra.verficarCarrito().subscribe(response => {
          this.listaProductosCarrito = response
          this.calcularTotal();
          this.totalProductosCarrito = this.listaProductosCarrito.length
          localStorage.setItem('totalProductosCarrito',(this.totalProductosCarrito.toString()));
        }, error => {
         
        });
      }else{
        this.isVisibleOrdenCompra = true;
      }
  })
    
  }
  editarCarrito(id: any, data: any) {
    debugger
    if(data.availableQuantity < data.quantity){
      data.quantity = data.availableQuantity
      this.modal.warning({
        nzTitle: 'Existencias insuficientes',
        nzContent: 'No hay existencias suficientes, se agregaron las disponibles.'
      });
    }

      this.carritoCompra.editarProducto(id, data).then(() => {
        this.calcularTotal();
      }, (error) => {
        console.error(error);
      });
    
    
  }
  eliminarProducto(id: any) {
    this.carritoCompra.eliminarProducto(id).then(() => {
      this.calcularTotal();
    }, (error) => {
      console.error(error);
    });
  }
  handleCancel(): void {
    this.isVisible = false;
    this.cerrarCarrito.emit()
  }
  handleCancelOrdenCompra(): void {
    this.isVisibleOrdenCompra = false;
    this.cerrarCarrito.emit()
  }
  calcularTotal(){
    this.total=0
    this.listaProductosCarrito.forEach(element => {
      
      this.total += (element.valor * element.quantity);
    });
  }
}
