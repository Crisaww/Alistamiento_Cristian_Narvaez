package com.shoestoreCristian.Shoestore.interfaceService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.model.venta;

@Service
public interface IventaService {
    public String save (venta venta);
    public List <venta>findAll();
    public List<venta> filtroVenta(String filtro_venta);
    // public List<venta> filtroEstado(String id_cliente);
    public Optional <venta> findOne (String id_venta);
    public int delete (String id_venta);
    
}
