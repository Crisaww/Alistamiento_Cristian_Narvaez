//Se almacena la URL de la API
let url="http://localhost:8082/api/v1/cliente/";

function listarCliente() {
    var busqueda = document.getElementById("buscar").value;
    var urlBusqueda = url;
    if (busqueda!=""){
        urlBusqueda+="busquedafiltro/"+busqueda;
    }   
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let cuerpoTablaCliente = document.getElementById("cuerpoTablaCliente");
            cuerpoTablaCliente.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTipoDocumento = document.createElement("td");
                let celdaDocumento = document.createElement("td");
                let celdaPrimerNombre = document.createElement("td");
                let celdaPrimerApellido = document.createElement("td");
                let celdaCelular = document.createElement("td");
                let celdaDireccion = document.createElement("td");
                let celdaCiudad = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaEstado = document.createElement("td");
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_cliente"];
                celdaTipoDocumento.innerText= result[i]["tipo_Documento"];
                celdaDocumento.innerText = result[i]["numero_documento"];
                celdaPrimerNombre.innerText = result[i]["primer_nombre"];
                celdaPrimerApellido.innerText = result[i]["primer_apellido"];
                celdaCelular.innerText = result[i]["celular"];
                celdaDireccion.innerText = result[i]["direccion_residencia"];
                celdaCiudad.innerText = result[i]["ciudad_residencia"];
                celdaCorreo.innerText = result[i]["correo_electronico"];
                celdaEstado.innerText = result[i]["estado"];
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTipoDocumento);
                trRegistro.appendChild(celdaDocumento);
                trRegistro.appendChild(celdaPrimerNombre);
                trRegistro.appendChild(celdaPrimerApellido);
                trRegistro.appendChild(celdaCelular);
                trRegistro.appendChild(celdaDireccion);
                trRegistro.appendChild(celdaCiudad);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaEstado);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarCliente= document.createElement("button");
                botonEditarCliente.value=result[i]["id_cliente"];
                botonEditarCliente.innerHTML="Editar"; 

                botonEditarCliente.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarClienteID(this.value); 
                }
                botonEditarCliente.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarCliente); 
                trRegistro.appendChild(celdaOpcion);

                // cuerpoTablaCliente.appendChild(trRegistro);//se traen todos los registros

                //  //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                //  let botonDeshabilitarCliente= document.createElement("button");
                //  botonDeshabilitarCliente.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                //  botonDeshabilitarCliente.className="btn btn-danger"; 
 
                //  let clienteIdParaDeshabilitar= result[i]["id_cliente"]; 
                //  botonDeshabilitarCliente.onclick=function(){
                //    deshabilitarCliente(clienteIdParaDeshabilitar);
                //  }
                //  celdaOpcion.appendChild(botonDeshabilitarCliente); 
                //  trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

//Paso para crear el registro de un cliente ****

// celdaId.innerText = result[i]["id_cliente"];
//                 celdaTipoDocumento.innerText= result[i]["tipo_Documento"];
//                 celdaDocumento.innerText = result[i]["celular_documento"];
//                 celdaPrimerNombre.innerText = result[i]["primer_nombre"];
//                 celdaPrimerApellido.innerText = result[i]["primer_apellido"];
//                 celdaCelular.innerText = result[i]["celular"];
//                 celdaDireccion.innerText = result[i]["direccion_residencia"];
//                 celdaCiudad.innerText = result[i]["ciudad_residencia"];
//                 celdaCorreo.innerText = result[i]["correo_electronico"];
//                 celdaEstado.innerText = result[i]["estado"];

function RegistrarCliente() {
    
    let tipo_documento = document.getElementById("tipo_documento").value;
    let numero_documento =document.getElementById("numero_documento").value;
    let primer_nombre = document.getElementById("primer_nombre").value;
    let primer_apellido = document.getElementById("primer_apellido").value;
    let celular = document.getElementById("celular").value;
    let direccion_residencia = document.getElementById("direccion_residencia").value;
    let ciudad_residencia = document.getElementById("ciudad_residencia").value;
    let correo_electronico = document.getElementById("correo_electronico").value;
    let estado = document.getElementById("estado").value;
  

    let formData = {
        
        "tipo_documento": tipo_documento,
        "numero_documento": numero_documento,
        "primer_nombre": primer_nombre,
        "primer_apellido": primer_apellido,
        "celular": celular,
        "direccion_residencia": direccion_residencia,
        "ciudad_residencia": ciudad_residencia,
        "correo_electronico": correo_electronico,
        "estado": estado
    };

    if(validarCampos()){

        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          success: function(result){
            Swal.fire({
              title: "Excelente",
              text: "Su registro se guardó correctamente",
              icon: "success"
            });
            // window.location.href= "http://127.0.0.1:5500/front_end/clienteRegistro.html";
          },
          error: function(error){
            Swal.fire("Error", "Error al guardar "+error.responseText, "error");
          }
        });
      }else{
       // alert("llena los primerApellidos correctamente")
        Swal.fire({
          title: "Error!",
          text: "complete los primerApellidos correctamente",
          icon: "error"
        });
      }
}

//Paso para que el usuario se registre y llene todos los datos correctamente :D****

// "tipo_documento": tipo_documento,
//         "celular_documento": celular_documento,
//         "primer_nombre": primer_nombre,
//         "primer_apellido": primer_apellido,
//         "celular": celular,
//         "direccion_residencia": direccion_residencia,
//         "ciudad_residencia": ciudad_residencia,
//         "correo_electronico": correo_electronico,
//         "estado": estado

function validarCampos() {
   
    var numero_documento = document.getElementById("numero_documento");
    var primer_nombre = document.getElementById("primer_nombre"); 
    var primer_apellido = document.getElementById("primer_apellido"); 
    var celular=document.getElementById("celular");
    var direccion_residencia = document.getElementById("direccion_residencia"); 
    var ciudad_residencia = document.getElementById("ciudad_residencia");  
    var correo_electronico = document.getElementById("correo_electronico");  
   
    

    return validarNumeroDocumento(numero_documento) && validarPrimerNombre(primer_nombre) 
         && validarPrimerApellido(primer_apellido) && validarCelular(celular) && validarDireccionResidencia(direccion_residencia)
         && validarCiudadResidencia(ciudad_residencia) && validarCorreoElectronico(correo_electronico) ;
}



function validarNumeroDocumento(numeroDocumento) {
    if (!numeroDocumento || !numeroDocumento.value) {
        return false;
    }

    let valor = numeroDocumento.value;
    let valido = true;
    if (valor.length < 5 || valor.length > 10) {
        valido = false;
    }

    if (valido) {
        numeroDocumento.className = "form-control is-valid";
    } else {
        numeroDocumento.className = "form-control is-invalid";
    }
    return valido;
}


function validarPrimerNombre(primerNombre){
    var valido=true;
    if(primerNombre.value.length < 3 || primerNombre.value.length > 45){
        valido=false;
    }

    if (valido) {
        primerNombre.className = "form-control is-valid"
    }
    else{
        primerNombre.className = "form-control is-invalid"
    }
    return valido;
}

function validarPrimerApellido(primerApellido){
    var valido=true;
    if(primerApellido.value.length < 3 || primerApellido.value.length > 45){
        valido=false;
    }

    if (valido) {
        primerApellido.className = "form-control is-valid"
    }
    else{
        primerApellido.className = "form-control is-invalid"
    }
    return valido;
}


function validarCelular(Celular) {
    
    let valor = Celular.value;
    let valido = true;
    if (valor.length < 10 || valor.length >13) {
        valido = false
    }

    if (valido) {
        Celular.className = "form-control is-valid"
    }
    else{
        Celular.className = "form-control is-invalid"
    }
    return valido;
}


function validarDireccionResidencia(Direccion){
    let valor = Direccion.value;
    let valido = true;
    if (valor.length <=0 || valor.length >45) {
        valido = false
    }
    if (valido) {
      Direccion.className = "form-control is-valid"
    }
    else{
      Direccion.className = "form-control is-invalid"
    }
    return valido;
}

function validarCiudadResidencia(Ciudad){
    let valor = Ciudad.value;
    let valido = true;
    if (valor.length <=0 || valor.length >45) {
        valido = false
    }
    if (valido) {
        Ciudad.className = "form-control is-valid"
    }
    else{
        Ciudad.className = "form-control is-invalid"
    }
    return valido;
}

function validarCorreoElectronico(Correo){
    let valor = Correo.value;
    let valido = true;
    if (valor.length <=0 || valor.length >100) {
        valido = false
    }
    if (valido) {
        Correo.className = "form-control is-valid"
    }
    else{
        Correo.className = "form-control is-invalid"
    }
    return valido;
}









