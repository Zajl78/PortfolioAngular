export class Tecnologias {

    id?: number;
    
    tecnologia: string;
    porcentaje: string;
    logo: string;
    
    constructor (tecnologia: string, porcentaje: string, logo: string) {
    
    this.tecnologia = tecnologia;
    this.porcentaje = porcentaje;
    this.logo = logo;
    
    }
}
