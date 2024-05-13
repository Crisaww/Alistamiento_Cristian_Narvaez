//Se almacena la URL de la API
let url="http://localhost:8082/api/v1/venta/";

function listarVenta() {
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
            let cuerpoTablaVenta = document.getElementById("cuerpoTablaVenta");
            cuerpoTablaVenta.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaIdCliente = document.createElement("td")
                let celdaTotalVenta = document.createElement("td");
                let celdaFechaVenta = document.createElement("td");
                let celdaEstado = document.createElement("td");
               
                
                //almacenamos en valor
                celdaId.innerText= result[i]["id_venta"];

               celdaIdCliente.innerText = result[i]["id_cliente"] + " " + result[i]["primer_nombre"] + " " + result[i]["cliente"] + " " + result[i]["primer_apellido"];
                celdaTotalVenta.innerText = result[i]["total"];
                celdaFechaVenta.innerText = result[i]["fecha_venta"];
                celdaEstado.innerText = result[i]["estado"];
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaIdCliente);
                trRegistro.appendChild(celdaTotalVenta);
                trRegistro.appendChild(celdaFechaVenta);
                trRegistro.appendChild(celdaEstado);

                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarVenta= document.createElement("button");
                botonEditarVenta.value=result[i]["id_venta"];
                botonEditarVenta.innerHTML="<i class='fa-solid fa-user-pen'></i> Editar"; 

                botonEditarVenta.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarVentaID(this.value); 
                }
                botonEditarVenta.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarVenta); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaVenta.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonEliminarventa= document.createElement("button");
                 botonEliminarventa.innerHTML="<i class='fa-solid fa-eye-slash'></i> Eliminar"; 
                 botonEliminarventa.className="btn btn-dark"; 
 
                 let ventaIdParaEliminar= result[i]["id_venta"]; 
                 botonEliminarventa.onclick=function(){
                   eliminarVenta(ventaIdParaEliminar);
                 }
                 celdaOpcion.appendChild(botonEliminarventa); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

function RegistrarVenta() {
    let cliente = document.getElementById("id_cliente").value;
    let total = document.getElementById("total").value;
    let fecha_venta = document.getElementById("fecha_venta").value;
    let estado = document.getElementById("estado").value;
    
    let formData = {
        
        "cliente": cliente,
        "total": total,
        "fecha_venta": fecha_venta,
        "estado": estado
    };

    

    if(validarCampos()){

        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          success: function(result){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Su venta se registró correctamente",
                showConfirmButton: false,
                timer: 1500
              
            });
            // window.location.href= "http://127.0.0.1:5500/front_end/ventaRegistro.html";
          },
          error: function(error){
            Swal.fire("Alerta", "¡Error al guardar! "+error.responseText, "warning");
          }
        });
      }else{
       // alert("llena los primerApellidos correctamente")
        Swal.fire({
          title: "Error!",
          text: "Faltan campos por llenar",
          icon: "error"
        });
      }
}



function validarCampos() {
   
   
    var cliente = document.getElementById("id_cliente");  
    var total = document.getElementById("total");  
    var fecha_venta = document.getElementById("fecha_venta");  
    var estado = document.getElementById("estado");  
   
    

    return  validarCliente(cliente) && validarTotalVenta(total) && validarFechaVenta(fecha_venta) && validarEstado(estado) ;
}
function validarCliente(campoCliente) {
    if (!campoCliente || !campoCliente.value) {
        return false;
    }

    let valor = campoCliente.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 200) {
        valido = false;
    }

    if (valido) {
        campoCliente.className = "form-control is-valid";
    } else {
        campoCliente.className = "form-control is-invalid";
    }
    return valido;
}



function validarTotalVenta(totalVenta) {
    if (!totalVenta || !totalVenta.value) {
        return false;
    }

    let valor = totalVenta.value;
    let valido = true;
    if (valor.length <0 || valor.length > 10) {
        valido = false;
    }

    if (valido) {
        totalVenta.className = "form-control is-valid";
    } else {
        totalVenta.className = "form-control is-invalid";
    }
    return valido;
}

function validarFechaVenta(fechaVenta) {
    if (!fechaVenta || !fechaVenta.value) {
        return false;
    }

    let valor = fechaVenta.value;
    let valido = true;
    if (valor.length <1 || valor.length > 20) {
        valido = false;
    }

    if (valido) {
        fechaVenta.className = "form-control is-valid";
    } else {
        fechaVenta.className = "form-control is-invalid";
    }
    return valido;
}

function validarEstado(Estado){
    let valor = Estado.value;
    let valido = true;
    if (valor.length <=0 || valor.length >15) {
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

function LimpiarVenta(){
    document.getElementById("total").className="form-control";
    document.getElementById("fecha_venta").className="form-control";
    document.getElementById("id_cliente").className="form-control";
    document.getElementById("estado").className="form-control";

    document.getElementById("total").value = "";
    document.getElementById("fecha_venta").value = "";
    document.getElementById("id_cliente").value = "";
    document.getElementById("estado").value="";
}

/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del venta por id
function consultarVentaID(id_venta){
    //alert(id);
    $.ajax({
        url:url+id_venta,
        type:"GET",
        success: function(result){
            
            document.getElementById("id_venta").value=result["id_venta"];
            document.getElementById("id_cliente").value=result["cliente"]["id_cliente"];
            document.getElementById("total").value=result["total"];
            document.getElementById("fecha_venta").value=result["fecha_venta"];
            document.getElementById("estado").value=result["estado"];
        }
    });
}


//Cuando le damos click al boton de guardar, este llamara a la function Updateventa por medio del onclick******
function updateVenta() {
    var id_venta = document.getElementById("id_venta").value;

    let formData = {
        "cliente": document.getElementById("id_cliente").value,
        "total": document.getElementById("total").value,
        "fecha_venta": document.getElementById("fecha_venta").value,
        "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id_venta,
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
            
            listarVenta(); //Lista los ventas después de actualizar
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

function CargarFormulario() {
    cargarCliente();
}

function cargarCliente() {
    let urlCliente = "http://localhost:8082/api/v1/cliente/";
  
    $.ajax({
      url: urlCliente,
      type: "GET",
      success: function (result) {
        let cliente = document.getElementById("id_cliente");
        cliente.innerHTML = "";
        for (let i = 0; i < result.length; i++) {
          let nombreCliente = document.createElement("option");
          nombreCliente.value = result[i]["id_cliente"];
          nombreCliente.innerText = nombre_completo_cliente =
            result[i]["primer_nombre"] +
            " " +
            result[i]["primer_apellido"];
          cliente.appendChild(nombreCliente);
        }
    },
});
}



// funcion  de deshabilitar venta
function eliminarVenta(id_venta){
    swal.fire({
      title: '¿Estás seguro?',
      text: "Esta opción no tiene marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, !Eliminar!',
  
    }).then((result)=>{
      if (result.isConfirmed){
        $.ajax({
          url: url +id_venta,
          type: "DELETE",
          success: function(result){
            swal.fire(
              'Eliminado',
              'La venta ha sido eliminada ',
              'success'
            );
            listarVenta();//recarga la lista de ventas
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