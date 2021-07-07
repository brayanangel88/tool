import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarModule } from '../share/navbar/navbar.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from '../share/carousel/carousel.module';
import { CarritoCompraModule } from '../share/carrito-compra/carrito-compra.module';


@NgModule({
  exports: [HomeComponent],
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    CarouselModule,
    CarritoCompraModule
  ]
})
export class HomeModule { }
