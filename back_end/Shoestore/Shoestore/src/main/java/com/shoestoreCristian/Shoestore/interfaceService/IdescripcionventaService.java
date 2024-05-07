package com.shoestoreCristian.Shoestore.interfaceService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.model.descripcionventa;

@Service
public interface IdescripcionventaService {

    public String save (descripcionventa descripcionventa);
    public List <descripcionventa>findAll();
    public Optional <descripcionventa> findOne (String id_descripcionventa);
    public int delete (String id_descripcionventa);
    
}
