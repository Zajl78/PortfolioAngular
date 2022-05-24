export class Formacion {

    id?: number;
    
    tipo: string;
    institucion: string;
    titulo: string;
    lugar: string;
    desde: string;
    hasta: string;
    observacion: string;
    logo: string;
   
    
    constructor (tipo: string, institucion: string, titulo: string, lugar: string, desde: string, hasta: string, observacion: string, logo: string) {
    
    
    this.tipo = tipo;
    this.titulo = titulo;
    this.institucion = institucion;
    this.lugar = lugar;
    this.desde = desde;
    this.hasta = hasta;
    this.observacion = observacion;
    this.logo = logo;
    }

}
