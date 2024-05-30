export interface Medico {
    id: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    curp: string;
    genero: string;
    url_img: string;
    cedula: string;
    contrasena: string;
    especialidades: Especialidad[];
    matriculaMedico: string;
  }
  
  export interface Especialidad {
    descripcion: string;
    nombre: string;
    id: number;
  }
  