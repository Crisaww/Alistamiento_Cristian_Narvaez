package com.shoestoreCristian.Shoestore.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shoestoreCristian.Shoestore.interfaceService.IclienteService;
import com.shoestoreCristian.Shoestore.model.cliente;


@RequestMapping("/api/v1/cliente")
@RestController
@CrossOrigin

public class clienteController {

    @Autowired
    private IclienteService clienteService;

    @PostMapping("/")
	public ResponseEntity<Object> save(
        @ModelAttribute("cliente") cliente cliente
        ){
            List<cliente>listaClienteValidacion=clienteService.filtroNumeroDocumento(cliente.getNumero_documento());
            if (listaClienteValidacion.size()!=0) {
                return new ResponseEntity<>("El cliente ya se encuentra registrado", HttpStatus.BAD_REQUEST);
            }
            if (cliente.getTipo_documento()==null) {
				return new ResponseEntity<>("El tipo documento es obligatorio", HttpStatus.BAD_REQUEST);
			}
			if (cliente.getNumero_documento().equals("")) {
				return new ResponseEntity<>("El número de documento es obligatorio", HttpStatus.BAD_REQUEST);
			}
			if (cliente.getPrimer_nombre().equals("")) {
				return new ResponseEntity<>("El primer nombre es obligatorio", HttpStatus.BAD_REQUEST);
			}
			if (cliente.getPrimer_apellido().equals("")) {
				return new ResponseEntity<>("El primer apellido es obligatorio", HttpStatus.BAD_REQUEST);
			}
            if (cliente.getCelular().equals("")) {
                return new ResponseEntity<>("El número celular es obligatorio", HttpStatus.BAD_REQUEST);
            }
            if (cliente.getDireccion_residencia().equals("")) {
                return new ResponseEntity<>("La dirección de residencia es obligatoria", HttpStatus.BAD_REQUEST);
            }
			if (cliente.getCiudad_residencia().equals("")) {
				return new ResponseEntity<>("La ciudad de residencia es obligatoria", HttpStatus.BAD_REQUEST);
			}
			if (cliente.getEstado()==null) {
				return new ResponseEntity<>("El estado del cliente es obligatorio", HttpStatus.BAD_REQUEST);
			}
		clienteService.save(cliente);
		return new ResponseEntity<>(cliente,HttpStatus.OK);
	}


    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var listacliente=clienteService.findAll();
        return new ResponseEntity<>(listacliente, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro_cliente}")
	public ResponseEntity<Object> findFiltro(@PathVariable String filtro_cliente){
		var listacliente=clienteService.filtroCliente(filtro_cliente);
		return new ResponseEntity<>(listacliente, HttpStatus.OK);
	}


    @GetMapping("/{id_cliente}")
    public ResponseEntity<Object> findOne(@PathVariable String id_cliente){
        var cliente=clienteService.findOne(id_cliente);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    //ELIMINADO FISICO:
    @DeleteMapping("/{id_cliente}")
	public ResponseEntity<Object> delete(@PathVariable String id_cliente){
		 clienteService.delete(id_cliente);
				return new ResponseEntity<>("Cliente eliminado con éxito",HttpStatus.OK);
	}

    @PutMapping("/{id_cliente}")
    public ResponseEntity<Object> update(@PathVariable String id_cliente, @ModelAttribute("cliente")cliente clienteUpdate){
        var cliente = clienteService.findOne(id_cliente).get();
        if (cliente != null) {
            cliente.setTipo_documento(clienteUpdate.getTipo_documento());
            cliente.setNumero_documento(clienteUpdate.getNumero_documento());
            cliente.setPrimer_nombre(clienteUpdate.getPrimer_nombre());
            cliente.setPrimer_apellido(clienteUpdate.getPrimer_apellido());
            cliente.setCelular(clienteUpdate.getCelular());
            cliente.setDireccion_residencia(clienteUpdate.getDireccion_residencia());
            cliente.setCiudad_residencia(clienteUpdate.getCiudad_residencia());
            cliente.setEstado(clienteUpdate.getEstado());
            clienteService.save(cliente);
            return new ResponseEntity<>(cliente, HttpStatus.OK);

        }
        else{
            return new ResponseEntity<>("Error, cliente no encontrado", HttpStatus.BAD_REQUEST);
        }    
}
}
