import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CarritoService } from 'src/app/services/carrito/carrito.service';


@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.scss']
})
export class CarritoCompraComponent implements OnInit {
  isVisible = false;
  seleccionado: any;
  total= 0;
  lista: number[] = [1, 2, 3, 4,5];
  listaProductosCarrito: any[] = []
  @Output() cerrarCarrito = new EventEmitter<any>();
  constructor(private carritoCompra: CarritoService,private modal: NzModalService) { }

  ngOnInit(): void {
  }

  llenarCarrito() {
    
    this.carritoCompra.verficarCarrito().subscribe(response => {
      this.listaProductosCarrito = response
      this.calcularTotal();
    }, error => {
      
    });
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
  calcularTotal(){
    this.total=0
    this.listaProductosCarrito.forEach(element => {
      
      this.total += (element.valor * element.quantity);
    });
  }
}
