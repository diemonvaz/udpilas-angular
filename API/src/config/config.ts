const fs = require('fs');
export default{

    jwtSecret: 'BDPEK@',

    upload_folder: 'src/uploads/', 

    page_err: {
        "error": "invalid_page_params",
        "error_description": "page params error"
    },
    
    pagesize_err: {
        "error": "invalid_pagesize",
        "error_description": "max pagesize of 50"
    },

    nombre_usuario_err: {
        "error": "invalid_nombre_usuario",
        "error_description": "Debe informarse el nombre del usuario"
    },

    password_err: {
        "error": "invalid_password",
        "error_description": "Debe informarse el password del usuario"
    },
    
    email_err: {
        "error": "invalid_email",
        "error_description": "Debe informarse una dirección de email correcta"
    },

    image_err: {
        "error": "invalid_image",
        "error_description": "Error en la imagen"
    },   
    
}