export class IniciarSesion {

    usernameOrEmail: string;
    password: string;

    constructor(usernameOrEmail: string, password: string) {
        this.usernameOrEmail=usernameOrEmail;
        this.password=password;
    }
}
