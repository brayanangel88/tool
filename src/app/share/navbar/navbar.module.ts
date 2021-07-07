import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  imports: [
    NgbModule,
    CommonModule
  ]
})
export class NavbarModule { }
