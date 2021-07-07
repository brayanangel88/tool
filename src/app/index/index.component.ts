import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/carrito/carrito.service';

AuthService
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers:[AuthService]
})
export class IndexComponent implements OnInit {

  isLoadingOne = false;
  isLoadingTwo = false;
  validateForm!: FormGroup;
  validateFormRegistro: FormGroup;
  isVisible = false;
  isOkLoading = false;

  constructor( private router: Router,private authService :AuthService ,private modal: NzModalService ,private fl: FormBuilder ,private fr: FormBuilder,
    private carritoCompra: CarritoService) {
    this.validateFormRegistro = this.fr.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]]
    });
  }

 

  showModal(): void {
    
    this.isVisible = true;
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const {email,password}=this.validateForm.value;
    this.authService.login(email,password).then((userCredential) => {
      this.carritoCompra.crearCarrito()
      this.router.navigate(['home']);
      var user = userCredential.user;
    })
    .catch((error) => {
      let content ='Fallo la peticion'
      if (error.code == "auth/user-not-found") {
        content = "Usuario no existe"
      }
      if (error.code == "auth/wrong-password") {
        content = "Contraseña incorrecta"
      }
      this.modal.error({
        nzTitle: 'Error',
        nzContent:  content
      });
    }); 
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
  }

  ngOnInit(): void {
    this.validateForm = this.fl.group({
      email: [null, [Validators.email,Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  submitFormRegistro(value: {email: string; password: string; confirm: string;}): void {
    for (const key in this.validateFormRegistro.controls) {
      this.validateFormRegistro.controls[key].markAsDirty();
      this.validateFormRegistro.controls[key].updateValueAndValidity();
    }
    const {email,password}=value;
    this.authService.register(email,password).then((userCredential) => {
      var user = userCredential.user;
    }).catch((error) => {
      let content ='Fallo la peticion'
      if (error.code == "auth/email-already-in-use") {
        content = "Este correo ya se encuentra registrado"
      }
      this.modal.error({
        nzTitle: 'Error',
        nzContent:  content
      });
    }); 
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateFormRegistro.reset();
    for (const key in this.validateFormRegistro.controls) {
      this.validateFormRegistro.controls[key].markAsPristine();
      this.validateFormRegistro.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateFormRegistro.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateFormRegistro.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  

}
