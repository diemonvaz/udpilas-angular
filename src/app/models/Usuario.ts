
//la interfaz (modelo) del usuario tiene todas sus propiedades, en caso de necesitar mas en el JWT se deberán 
//incluir en la respuesta del backend, así como en el registro del usuario obviamente. Por el momento idusuario, email y roles.
export interface Usuario {
    idusuario: String;
    nombre: String;
    apellidos: String;
    email: String;
    fecha_nacimiento: String;
    telefono: String;
    roles: String [];
}