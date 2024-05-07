package com.shoestoreCristian.Shoestore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.interfaceService.IproductoService;
import com.shoestoreCristian.Shoestore.interfaces.Iproducto;
import com.shoestoreCristian.Shoestore.model.producto;

@Service
public class productoService implements IproductoService{

    @Autowired
    private Iproducto data;

    @Override
    public String save (producto producto){
        data.save(producto);
        return producto.getId_producto();
    }

    @Override
    public List<producto> findAll(){
        List<producto> listaproducto=(List<producto>) data.findAll();
        return listaproducto;
    }

    @Override
    public Optional<producto> findOne(String id_producto){
        Optional<producto> producto=data.findById(id_producto);
        return producto;
    }


    //ELIMINADO FISICO: Se elimina directamente de la base de datos*****

    @Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}

   

}

