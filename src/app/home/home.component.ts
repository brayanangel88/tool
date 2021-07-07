import { Component, OnInit, ViewChild } from '@angular/core';
import { CarritoCompraComponent } from '../share/carrito-compra/carrito-compra.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(CarritoCompraComponent, { static: false })
  private carritoCompra!: CarritoCompraComponent;
  totalProductosCarrito: number = 0;

  ngOnInit(): void {
  }

  abirCarrito(){
    this.carritoCompra.llenarCarrito();
  }
}
