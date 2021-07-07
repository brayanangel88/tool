import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoCompraComponent } from './carrito-compra.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';



@NgModule({
  exports:[CarritoCompraComponent],
  declarations: [CarritoCompraComponent],
  imports: [
    CommonModule,
    NzModalModule,
    FormsModule      
  ]
})
export class CarritoCompraModule { }
