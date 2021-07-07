import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  
  @Output() abirCarrito = new EventEmitter<any>();

  constructor(private router: Router ,private authService :AuthService) { }

  ngOnInit(): void {
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
}
