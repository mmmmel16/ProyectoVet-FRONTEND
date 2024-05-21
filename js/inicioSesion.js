function validarFormulario(){
    var correo = document.getElementById('inputCorreo').value;
    var contraseña = document.getElementById('inputPassword').value;
    var correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('alertaCorreo').classList.add('d-none');
    document.getElementById('alertaPassword').classList.add('d-none');

    var formularioValido = true;

    if (!correo || !correoValido.test(correo)) {
        document.getElementById('alertaCorreo').classList.remove('d-none');
        
        formularioValido = false;
    }

    if(!contraseña){
        document.getElementById('alertaPassword').classList.remove('d-none');
        
        formularioValido = false;
    }


    if(formularioValido){
        window.location.href = 'homeAdmin.html';
    }
    
}