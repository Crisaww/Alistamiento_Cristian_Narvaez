package com.shoestoreCristian.Shoestore.controller;


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

import com.shoestoreCristian.Shoestore.interfaceService.IventaService;
import com.shoestoreCristian.Shoestore.model.venta;


@RequestMapping("/api/v1/venta")
@RestController
@CrossOrigin
public class ventaController {
 
    @Autowired
    private IventaService ventaService;

    @PostMapping("/")
    public ResponseEntity<Object> save(
        @ModelAttribute("venta") venta venta
    ){

        // condicion para cuando ya exista el  registro 
				// List<venta> listaClienteActivo=ventaService.filtroEstado(venta.getCliente().getId_cliente());
                // if(listaClienteActivo.size()!=0){
                //     //ya tiene un registro activo
                //     return new ResponseEntity<>("el cliente ya tiene una venta activa",HttpStatus.BAD_REQUEST);		
                // }

        if (venta.getTotal().equals("")){
            return new ResponseEntity<>("El total de la venta es obligatorio", HttpStatus.BAD_REQUEST);
        }

        // if (venta.getCliente().equals("")) {
            
        //     return new ResponseEntity<>("El campo cliente es obligatorio", HttpStatus.BAD_REQUEST);
        // }

        if (venta.getFecha_venta().equals("")){
            return new ResponseEntity<>("La fecha es obligatoria", HttpStatus.BAD_REQUEST);
        }

        if (venta.getEstado()==null) {
            return new ResponseEntity<>("El estado de la venta es obligatorio", HttpStatus.BAD_REQUEST);
        }
        ventaService.save(venta);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var listaventa=ventaService.findAll();
        return new ResponseEntity<>(listaventa, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro_venta}")
	public ResponseEntity<Object> findFiltro(@PathVariable String filtro_venta){
		var listaventa=ventaService.filtroVenta(filtro_venta);
		return new ResponseEntity<>(listaventa, HttpStatus.OK);
	}

     @GetMapping("/{id_venta}")
    public ResponseEntity<Object> findOne(@PathVariable String id_venta){
        var venta=ventaService.findOne(id_venta);
        return new ResponseEntity<>(venta, HttpStatus.OK);
    }

    //ELIMINADO FISICO:
    @DeleteMapping("/{id_venta}")
    public ResponseEntity<Object> delete(@PathVariable String id_venta){
        ventaService.delete(id_venta);
                return new ResponseEntity<>("Venta eliminado con éxito",HttpStatus.OK);
    }

    @PutMapping("/{id_venta}")
    public ResponseEntity<Object> update(@PathVariable String id_venta, @ModelAttribute("venta")venta ventaUpdate){
        var venta = ventaService.findOne(id_venta).get();
        if (venta != null) {
            venta.setCliente(ventaUpdate.getCliente());
            venta.setTotal(ventaUpdate.getTotal());
            venta.setFecha_venta(ventaUpdate.getFecha_venta());
            venta.setEstado(ventaUpdate.getEstado());
            ventaService.save(venta);
            return new ResponseEntity<>(venta, HttpStatus.OK);

        }
        else{
            return new ResponseEntity<>("Error, venta no encontrada", HttpStatus.BAD_REQUEST);
        }    
    }



}
