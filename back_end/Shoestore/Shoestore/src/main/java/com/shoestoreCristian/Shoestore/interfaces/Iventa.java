package com.shoestoreCristian.Shoestore.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shoestoreCristian.Shoestore.model.venta;

@Repository
public interface Iventa extends CrudRepository<venta,String>{
    
}
