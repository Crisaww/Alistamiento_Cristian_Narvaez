//Se almacena la URL de la API
let url="http://localhost:8082/api/v1/producto/";

function listarProducto() {
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
            let cuerpoTablaProducto = document.getElementById("cuerpoTablaProducto");
            cuerpoTablaProducto.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaNombreProducto = document.createElement("td");
                let celdaDescripcionProducto = document.createElement("td");
                let celdaCantidad = document.createElement("td");
                let celdaPrecioUnitario = document.createElement("td");
                let celdaIva = document.createElement("td");
                let celdaDescuento = document.createElement("td");
                let celdaEstado = document.createElement("td");
               
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_producto"];
                celdaNombreProducto.innerText= result[i]["nombre_producto"];
                celdaDescripcionProducto.innerText = result[i]["descripcion"];
                celdaCantidad.innerText = result[i]["cantidad"];
                celdaPrecioUnitario.innerText = result[i]["precio"];
                celdaIva.innerText = result[i]["porcentaje_iva"];
                celdaDescuento.innerText = result[i]["porcentaje_descuento"];
                celdaEstado.innerText = result[i]["estado"];
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaNombreProducto);
                trRegistro.appendChild(celdaDescripcionProducto);
                trRegistro.appendChild(celdaCantidad);
                trRegistro.appendChild(celdaPrecioUnitario);
                trRegistro.appendChild(celdaIva);
                trRegistro.appendChild(celdaDescuento);
                trRegistro.appendChild(celdaEstado);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarProducto= document.createElement("button");
                botonEditarProducto.value=result[i]["id_producto"];
                botonEditarProducto.innerHTML="<i class='fa-solid fa-user-pen'></i> Editar"; 

                botonEditarProducto.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarProductoID(this.value); 
                }
                botonEditarProducto.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarProducto); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaProducto.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonEliminarProducto= document.createElement("button");
                 botonEliminarProducto.innerHTML="<i class='fa-solid fa-eye-slash'></i> Eliminar"; 
                 botonEliminarProducto.className="btn btn-dark"; 
 
                 let ProductoIdParaEliminar= result[i]["id_producto"]; 
                 botonEliminarProducto.onclick=function(){
                   eliminarProducto(ProductoIdParaEliminar);
                 }
                 celdaOpcion.appendChild(botonEliminarProducto); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

function RegistrarProducto() {
    
    let nombre_producto = document.getElementById("nombre_producto").value;
    let descripcion =document.getElementById("descripcion").value;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("precio").value;
    let porcentaje_iva = document.getElementById("porcentaje_iva").value;
    let porcentaje_descuento = document.getElementById("porcentaje_descuento").value;
    let estado = document.getElementById("estado").value;
  
    
    let formData = {
        
        "nombre_producto": nombre_producto,
        "descripcion": descripcion,
        "cantidad": cantidad,
        "precio": precio,
        "porcentaje_iva": porcentaje_iva,
        "porcentaje_descuento": porcentaje_descuento,
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
              text: "Su producto se guardó correctamente",
              icon: "success"
            });
            // window.location.href= "http://127.0.0.1:5500/front_end/ProductoRegistro.html";
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
   
   
    var nombre_producto = document.getElementById("nombre_producto");  
    var descripcion = document.getElementById("descripcion");  
    var cantidad = document.getElementById("cantidad");  
    var precio = document.getElementById("precio");  
    var porcentaje_iva = document.getElementById("porcentaje_iva");  
    var porcentaje_descuento = document.getElementById("porcentaje_descuento");  
    var estado = document.getElementById("estado");  
   
    

    return validarNombreProducto(nombre_producto) && validarDescripcion(descripcion) && validarCantidad(cantidad) 
         && validarPrecio(precio) && validarPorcentajeIva(porcentaje_iva) && validarPorcentajeDescuento(porcentaje_descuento)
         && validarEstado(estado) ;
}

function validarNombreProducto(nombreProducto) {
    if (!nombreProducto || !nombreProducto.value) {
        return false;
    }

    let valor = nombreProducto.value;
    let valido = true;
    if (valor.length < 3 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        nombreProducto.className = "form-control is-valid";
    } else {
        nombreProducto.className = "form-control is-invalid";
    }
    return valido;
}

function validarDescripcion(Descripcion) {
    if (!Descripcion || !Descripcion.value) {
        return false;
    }

    let valor = Descripcion.value;
    let valido = true;
    if (valor.length < 3 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        Descripcion.className = "form-control is-valid";
    } else {
        Descripcion.className = "form-control is-invalid";
    }
    return valido;
}


function validarCantidad(Cantidad){
    var valido=true;
    if(Cantidad.value.length <= 0 || Cantidad.value.length > 10){
        valido=false;
    }

    if (valido) {
        Cantidad.className = "form-control is-valid"
    }
    else{
        Cantidad.className = "form-control is-invalid"
    }
    return valido;
}

function validarPrecio(Precio){
    var valido=true;
    if(Precio.value.length <=0 || Precio.value.length > 10){
        valido=false;
    }

    if (valido) {
        Precio.className = "form-control is-valid"
    }
    else{
        Precio.className = "form-control is-invalid"
    }
    return valido;
}


function validarPorcentajeIva(Iva) {
    
    let valor = Iva.value;
    let valido = true;
    if (valor.length <= 0 || valor.length >3) {
        valido = false
    }

    if (valido) {
        Iva.className = "form-control is-valid"
    }
    else{
        Iva.className = "form-control is-invalid"
    }
    return valido;
}


function validarPorcentajeDescuento(Descuento){
    let valor = Descuento.value;
    let valido = true;
    if (valor.length <=0 || valor.length >3) {
        valido = false
    }
    if (valido) {
        Descuento.className = "form-control is-valid"
    }
    else{
        Descuento.className = "form-control is-invalid"
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

// celdaId.innerText = result[i]["id_producto"];
    // celdaNombreProducto.innerText= result[i]["nombre_producto"];
    // celdaDescripcionProducto.innerText = result[i]["descripcion"];
    // celdaCantidad.innerText = result[i]["cantidad"];
    // celdaPrecioUnitario.innerText = result[i]["precio"];
    // celdaIva.innerText = result[i]["porcentaje_iva"];
    // celdaDescuento.innerText = result[i]["porcentaje_descuento"];
    // celdaEstado.innerText = result[i]["estado"];

function LimpiarProducto(){
    document.getElementById("nombre_producto").className="form-control";
    document.getElementById("descripcion").className="form-control";
    document.getElementById("cantidad").className="form-control";
    document.getElementById("precio").className="form-control";
    document.getElementById("porcentaje_iva").className="form-control";
    document.getElementById("porcentaje_descuento").className="form-control";
    document.getElementById("estado").className="form-control";

    document.getElementById("nombre_producto").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("porcentaje_iva").value = "";
    document.getElementById("porcentaje_descuento").value = "";
    document.getElementById("estado").value="";
}

/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del Producto por id
function consultarProductoID(id_producto){
    //alert(id);
    $.ajax({
        url:url+id_producto,
        type:"GET",
        success: function(result){
            
            
            document.getElementById("nombre_producto").value=result["nombre_producto"];
            document.getElementById("descripcion").value=result["descripcion"];
            document.getElementById("cantidad").value=result["cantidad"];
            document.getElementById("precio").value=result["precio"];
            document.getElementById("porcentaje_iva").value=result["porcentaje_iva"];
            document.getElementById("porcentaje_descuento").value=result["porcentaje_descuento"];
            document.getElementById("estado").value=result["estado"];
        }
    });
}

//Cuando le damos click al boton de guardar, este llamara a la function UpdateProducto por medio del onclick******
function updateProducto() {
    var id_producto = document.getElementById("id_producto").value;

    let formData = {
        "nombre_producto": document.getElementById("nombre_producto").value,
        "descripcion": document.getElementById("descripcion").value,
        "cantidad": document.getElementById("cantidad").value,
        "precio": document.getElementById("precio").value,
        "porcentaje_iva": document.getElementById("porcentaje_iva").value,
        "porcentaje_descuento": document.getElementById("porcentaje_descuento").value,
        "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id_producto,
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
            
            listarProducto(); //Lista los Productos después de actualizar
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

// funcion  de deshabilitar Producto
function eliminarProducto(id_producto){
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
          url: url +id_producto,
          type: "DELETE",
          success: function(result){
            swal.fire(
              'Deshabilitado',
              'El Producto ha sido eliminado ',
              'success'
            );
            listarProducto();//recarga la lista de Productos
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














