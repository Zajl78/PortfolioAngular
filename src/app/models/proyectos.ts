export class Proyectos {

    id?: number;
    
    
    proyecto: string;
    descripcion: string;
    fecha: string;
    imagen: string;
    link: string;
    
   constructor (proyecto: string, descripcion: string, fecha: string, imagen: string, link: string) {
        
        this.proyecto = proyecto;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.imagen = imagen;
        this.link = link;

    }
}
