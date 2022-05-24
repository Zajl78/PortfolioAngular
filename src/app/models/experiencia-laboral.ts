export class ExperienciaLaboral {

    id?: number;
    
    puesto: string;
    empresa: string;
    pais: string;
    descripcion: string;
    desde: string;
    hasta: string;
    logo: string;

    constructor ( puesto: string, empresa: string, pais: string, descripcion: string, desde: string, hasta: string, logo: string) {
    
        this.puesto = puesto;
        this.empresa = empresa;
        this.pais = pais;
        this.descripcion = descripcion;
        this.desde = desde;
        this.hasta = hasta;
        this.logo = logo;
        }
}
