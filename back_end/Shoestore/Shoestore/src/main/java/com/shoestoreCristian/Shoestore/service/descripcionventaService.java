package com.shoestoreCristian.Shoestore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.interfaceService.IdescripcionventaService;
import com.shoestoreCristian.Shoestore.interfaces.Idescripcionventa;
import com.shoestoreCristian.Shoestore.model.descripcionventa;

@Service
public class descripcionventaService implements IdescripcionventaService{

    @Autowired
    private Idescripcionventa data;

    @Override
    public String save (descripcionventa descripcionventa){
        data.save(descripcionventa);
        return descripcionventa.getId_descripcionventa();
    }

    @Override
    public List<descripcionventa> findAll(){
        List<descripcionventa> listadescripcionventa=(List<descripcionventa>) data.findAll();
        return listadescripcionventa;
    }

    @Override
    public Optional<descripcionventa> findOne(String id_descripcionventa){
        Optional<descripcionventa> descripcionventa=data.findById(id_descripcionventa);
        return descripcionventa;
    }


    //ELIMINADO FISICO: Se elimina directamente de la base de datos*****

    @Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}

   

}

