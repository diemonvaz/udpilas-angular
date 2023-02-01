//por el momento, el registro se hace solo con email y contraseña, y el jwt llevará
//el idusuario, email y roles en el payload. Si más adelante vemos que necesitamos mas
//datos, se incluirán en el registro y se decidirá cuales irán siempre en el jwt
export interface Usuario {
    idusuario: String;
    //nombre: String;
    //apellidos: String;
    email: String;
    //fecha_nacimiento: String;
    //telefono: String;
    roles: String [];
}