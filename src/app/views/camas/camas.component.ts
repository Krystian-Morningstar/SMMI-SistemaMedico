import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.css']
})
export class CamasComponent {

  constructor(private router: Router) {}

  abrirDetalleHabitacion() {
    this.router.navigate(['/principal']);
  }
  habitaciones = [
    {
      imagen: "https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/images.jpg?alt=media&token=07b79e4e-1601-455a-a16f-de881a90b1e4",
      titulo: "Habitación 1",
      Nombre: "juanin"
    },
    {
      imagen: "https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/images.jpg?alt=media&token=07b79e4e-1601-455a-a16f-de881a90b1e4",
      titulo: "Habitación 2",
      Nombre: "Matias"
    },
    {
      imagen: "https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/images.jpg?alt=media&token=07b79e4e-1601-455a-a16f-de881a90b1e4",
      titulo: "Habitación 3",
      Nombre: "juan"
    },
    {
      imagen: "https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/images.jpg?alt=media&token=07b79e4e-1601-455a-a16f-de881a90b1e4",
      titulo: "Habitación 4",
      Nombre: "Matias"
    },
    {
      imagen: "https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/images.jpg?alt=media&token=07b79e4e-1601-455a-a16f-de881a90b1e4",
      titulo: "Habitación 5",
      Nombre: "pedro"
    },
   
  ];


  
}

