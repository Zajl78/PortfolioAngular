export class Proyectos {

    id?: number;
    
    
    proyecto: string;
    descripcion: string;
    fecha: string;
    
   constructor (proyecto: string, descripcion: string, fecha: string) {
        
        this.proyecto = proyecto;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
}
