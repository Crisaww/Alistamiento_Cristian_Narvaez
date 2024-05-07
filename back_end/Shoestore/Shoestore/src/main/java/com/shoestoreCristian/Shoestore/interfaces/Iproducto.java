package com.shoestoreCristian.Shoestore.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shoestoreCristian.Shoestore.model.producto;


@Repository
public interface Iproducto extends CrudRepository<producto,String>{
    
}
