package com.shoestoreCristian.Shoestore.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shoestoreCristian.Shoestore.model.descripcionventa;

@Repository
public interface Idescripcionventa extends CrudRepository<descripcionventa,String>{
    
}
