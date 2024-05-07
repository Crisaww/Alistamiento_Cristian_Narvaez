package com.shoestoreCristian.Shoestore.interfaceService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.model.venta;

@Service
public interface IventaService {
    public String save (venta venta);
    public List <venta>findAll();
    public Optional <venta> findOne (String id_venta);
    public int delete (String id_venta);
    
}
