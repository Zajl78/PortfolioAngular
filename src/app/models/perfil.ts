export class Perfil {

    perfilId?: number;
    
    fullName: string;
    puesto: string;
    acerca_de_mi: string;
    fotoPerfil: string;
      
    
    constructor (fullName: string, puesto: string, acerca_de_mi: string, fotoPerfil: string){
    
    this.fullName = fullName;
    this.puesto = puesto;
    this.acerca_de_mi = acerca_de_mi;
    this.fotoPerfil = fotoPerfil;
    

    
    }

}
