import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  
  @Output() abirCarrito = new EventEmitter<any>();
  constructor(private router: Router ,private authService :AuthService,private modal: NzModalService) { }
  ngOnInit(): void {
  }


  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>¿Desea cerrar sesiòn?</i>',
      nzContent: '',
      nzOnOk: () => this.cerrarSesion()
    });
  }
  cerrarSesion(){
    
    this.authService.logout().then((userCredential) => {
      this.router.navigate(['/']);
    })
    .catch((error) => {
    }); 
  }
  carritoCompra(){
    this.abirCarrito.emit()
  }
  productosCarrito(){
    return localStorage.getItem('totalProductosCarrito');
  }
}
