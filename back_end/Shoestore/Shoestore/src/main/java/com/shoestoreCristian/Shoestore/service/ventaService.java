package com.shoestoreCristian.Shoestore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.interfaceService.IventaService;
import com.shoestoreCristian.Shoestore.interfaces.Iventa;
import com.shoestoreCristian.Shoestore.model.venta;

@Service
public class ventaService implements IventaService{

    @Autowired
    private Iventa data;

    @Override
    public String save (venta venta){
        data.save(venta);
        return venta.getId_venta();
    }

    @Override
    public List<venta> findAll(){
        List<venta> listaventa=(List<venta>) data.findAll();
        return listaventa;
    }

     @Override
	public List<venta> filtroVenta(String filtro_venta) {
		List<venta>listaventa=data.filtroVenta(filtro_venta);
		return listaventa;
	}

    // la variable que almacena los registros
	// @Override
	// public List<venta> filtroEstado(String id_cliente) {
	// 	List<venta>listaventa=data.filtroEstado(id_cliente);
	// 	return listaventa;
	// }

    @Override
    public Optional<venta> findOne(String id_venta){
        Optional<venta> venta=data.findById(id_venta);
        return venta;
    }




    //ELIMINADO FISICO: Se elimina directamente de la base de datos*****

    @Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}

   

}

