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
               
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_cliente"];
                celdaTipoDocumento.innerText= result[i]["tipo_documento"];
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
                botonEditarCliente.innerHTML="<i class='fa-solid fa-user-pen'></i> Editar"; 

                botonEditarCliente.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarClienteID(this.value); 
                }
                botonEditarCliente.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarCliente); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaCliente.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonEliminarCliente= document.createElement("button");
                 botonEliminarCliente.innerHTML="<i class='fa-solid fa-eye-slash'></i> Eliminar"; 
                 botonEliminarCliente.className="btn btn-dark"; 
 
                 let clienteIdParaEliminar= result[i]["id_cliente"]; 
                 botonEliminarCliente.onclick=function(){
                   eliminarCliente(clienteIdParaEliminar);
                 }
                 celdaOpcion.appendChild(botonEliminarCliente); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

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
          text: "Complete los campos correctamente",
          icon: "error"
        });
      }
}


function validarCampos() {
   
    var tipo_documento = document.getElementById("tipo_documento");
    var numero_documento = document.getElementById("numero_documento");
    var primer_nombre = document.getElementById("primer_nombre"); 
    var primer_apellido = document.getElementById("primer_apellido"); 
    var celular=document.getElementById("celular");
    var direccion_residencia = document.getElementById("direccion_residencia"); 
    var ciudad_residencia = document.getElementById("ciudad_residencia");  
    var correo_electronico = document.getElementById("correo_electronico");  
    var estado = document.getElementById("estado");  
   
    

    return validarTipoDocumento(tipo_documento) && validarNumeroDocumento(numero_documento) && validarPrimerNombre(primer_nombre) 
         && validarPrimerApellido(primer_apellido) && validarCelular(celular) && validarDireccionResidencia(direccion_residencia)
         && validarCiudadResidencia(ciudad_residencia) && validarCorreoElectronico(correo_electronico) && validarEstado(estado) ;
}

function validarTipoDocumento(tipoDocumento) {
    if (!tipoDocumento || !tipoDocumento.value) {
        return false;
    }

    let valor = tipoDocumento.value;
    let valido = true;
    if (valor.length < 0 || valor.length > 2) {
        valido = false;
    }

    if (valido) {
        tipoDocumento.className = "form-control is-valid";
    } else {
        tipoDocumento.className = "form-control is-invalid";
    }
    return valido;
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

function validarEstado(Estado){
    let valor = Estado.value;
    let valido = true;
    if (valor.length <=0 || valor.length >8) {
        valido = false
    }
    if (valido) {
        Estado.className = "form-control is-valid"
    }
    else{
        Estado.className = "form-control is-invalid"
    }
    return valido;
}

function LimpiarCliente(){
    document.getElementById("tipo_documento").className="form-control";
    document.getElementById("numero_documento").className="form-control";
    document.getElementById("primer_nombre").className="form-control";
    document.getElementById("primer_apellido").className="form-control";
    document.getElementById("celular").className="form-control";
    document.getElementById("direccion_residencia").className="form-control";
    document.getElementById("ciudad_residencia").className="form-control";
    document.getElementById("correo_electronico").className="form-control";
    document.getElementById("estado").className="form-control";

    document.getElementById("tipo_documento").value = "";
    document.getElementById("numero_documento").value = "";
    document.getElementById("primer_nombre").value = "";
    document.getElementById("primer_apellido").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("direccion_residencia").value = "";
    document.getElementById("ciudad_residencia").value = "";
    document.getElementById("correo_electronico").value = "";
    document.getElementById("estado").value="";
}

/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del cliente por id
function consultarClienteID(id_cliente){
    //alert(id);
    $.ajax({
        url:url+id_cliente,
        type:"GET",
        success: function(result){
            
            document.getElementById("id_cliente").value=result["id_cliente"];
            document.getElementById("tipo_documento").value=result["tipo_documento"];
            document.getElementById("numero_documento").value=result["numero_documento"];
            document.getElementById("primer_nombre").value=result["primer_nombre"];
            document.getElementById("primer_apellido").value=result["primer_apellido"];
            document.getElementById("celular").value=result["celular"];
            document.getElementById("direccion_residencia").value=result["direccion_residencia"];
            document.getElementById("correo_electronico").value=result["correo_electronico"];
            document.getElementById("ciudad_residencia").value=result["ciudad_residencia"];
            document.getElementById("estado").value=result["estado"];
        }
    });
}

//Cuando le damos click al boton de guardar, este llamara a la function UpdateCliente por medio del onclick******
function updateCliente() {
    var id_cliente = document.getElementById("id_cliente").value;

    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_nombre": document.getElementById("primer_nombre").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "celular": document.getElementById("celular").value,
        "direccion_residencia": document.getElementById("direccion_residencia").value,
        "ciudad_residencia": document.getElementById("ciudad_residencia").value,
        "correo_electronico": document.getElementById("correo_electronico").value,
        "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id_cliente,
        type: "PUT",
        data: formData,
        success: function(result) {
            Swal.fire({
                title: "Excelente",
                text: "Su registro se actualizó correctamente",
                icon: "success"
            });
            
            var modal = document.getElementById("exampleModal"); 
            modal.style.display = "hide";
            
            listarCliente(); //Lista los clientes después de actualizar
        },
        error: function(error) {
            Swal.fire("Error", "Error al guardar", "error");
        }  
    });
    }else{
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
        }
}

// funcion  de deshabilitar cliente
function eliminarCliente(id_cliente){
    swal.fire({
      title: '¿Estás seguro?',
      text: "Esta opción no tiene marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, Eliminar!',
  
    }).then((result)=>{
      if (result.isConfirmed){
        $.ajax({
          url: url +id_cliente,
          type: "DELETE",
          success: function(result){
            swal.fire(
              'Deshabilitado',
              'El cliente ha sido eliminado ',
              'success'
            );
            listarCliente();//recarga la lista de clientes
          },
          error: function(error){
            Swal.fire(
              'Error',
              'No se puede eliminar el registro ',
              'Error',
            );
          }
        });
      }
    });
  }














