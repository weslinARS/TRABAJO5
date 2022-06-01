window.onload=function(){
  let formulario = document.forms[0];
  //?agregar manejador de evento para el formulario
  if(document.addEventListener){
    formulario.addEventListener("submit", validarFormulario);
  }
  else if(document.attachEvent){
    formulario.attachEvent("onsubmit", validarFormulario);
  }
}
const expresiones = {
  codigoCliente  : /^[0-9]{3}\-[0-9]{3}$/, 
  numeroFactura : /^[0-9]{1}\-[0-9]{3}$/, 
  numTargetCredito : /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{2}$/,
  fecha: /^(0(?:[1-9])|1(?:[0-2]))\-[0-9]{2}$/
}
function validarFormulario(event){
  //acceder a input email
  let inputEmail = document.getElementById('email');
  //*validar código de cliente
  var  codCliente = document.getElementById('codigo_cliente');
  if(!expresiones["codigoCliente"].test(codCliente)){
    console.log("Código de cliente inválido");
    event.preventDefault(); 
    return false; 
  }
  //validar correo electrónico
  if(!validarEmail(inputEmail.value)){
    console.log("email no valido");
    event.preventDefault();//evitar que formulario se envie
    return false;//dirección de correo no válida
  }
  //validar número de factura
  let nfactura = document.getElementById('numFactura');
  //*formato es digito-3digitos
  if(!expresiones["numeroFactura"].test(nfactura)){
    console.log("numero de factura no válido");
    event.preventDefault(); 
    return false; 
  }
  //validar monto a pagar, solo aceptar valores en coma flotate,
  //por ejemplo: 133.30 o 1020.15
  let monto = document.getElementById('monto_pago');
  if(Number.isInteger(monto)){
    console.log("el monto debe de se un valor Real");
    event.preventDefault(); 
    return false; 
  }
  //validar tarjeta de crédito
  //formato valido es 3333-3333-3333-33333
  //16 digitos en grupos de 4 separados por guión
  //validar nombre tarjeta habiente, no debe ser vacío
  var tarjetaHabiente = document.getElementById("tarjetahabiente");
  if(!expresiones["numTargetCredito"].test(tarjetaHabiente)){
    console.log("Targeta no válida");
    event.preventDefault(); 
    return false; 
  }
  //validar fecha de experición de tarjeta
  //formato es mm-aa (dos digitos para mes, guión, dos digitos para año)
  //por ejemplo: 09-18
  let fecha = document.getElementById('fechaexp');
  if(!expresiones["fecha"].test(fecha)){
    console.log("Fecha de expiracion inválida");
    event.preventDefault(); 
    return false; 
  }
  //Si todo fue validado, retornar true
  console.log("ok");
  return true;
}
function getTarget(e){
  var target;
  if(e.target)
    target = e.target;
  else if(e.srcElement)
    target = e.srcElement;
  if(target.nodeType==3) //safari
    target = target.parentNode;

  return target;
}
function validarEmail(email){
  //expresión regular para validar correo
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  return re.test(email);
}
