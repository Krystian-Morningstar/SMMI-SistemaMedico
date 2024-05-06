import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/user.model';
import { Router } from '@angular/router';
import { SistemaService } from '../services/sistema.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  usuario: Usuario = {
    matricula: 'E20245M',
    password: 'segura123',
  };

  mostrarnavar: boolean = false;

  constructor(private userService: UserService, private router: Router, private servicio: SistemaService) {}

  onSubmit() {
    if (!this.validateMatricula(this.usuario.matricula) || !this.validatePassword(this.usuario.password)) {
      this.showToast('errorToast');
      return;
    }

    this.userService.loginUser(this.usuario)
      .subscribe(
        (response) => {
          if (response.success) {
            this.router.navigate(['/inicio']);
          } else {
            console.error('Error en la autenticación:', response.error);
            this.showToast('errorToast');
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          this.showToast('errorToast');
        }
      );
  }

  validateMatricula(matricula: string): boolean {
    // Validar la matrícula 
    const regex = /^A\d{2}\d{3}$/; 
    return regex.test(matricula);
  }

  validatePassword(password: string): boolean {
    // Validar una contraseña segura
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  showToast(toastId: string) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000); 
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

  mostrarMenu() {
    this.mostrarnavar = !this.mostrarnavar;
    this.servicio.Actualizar_navar(this.mostrarnavar);
  }
}
