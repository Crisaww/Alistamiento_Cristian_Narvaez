package com.shoestoreCristian.Shoestore.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shoestoreCristian.Shoestore.model.producto;


@Repository
public interface Iproducto extends CrudRepository<producto,String>{
    @Query("SELECT p FROM producto p WHERE "
			
    + "p.id_producto LIKE %?1% OR "
    + "p.nombre_producto LIKE %?1%") 
    List<producto> filtroProducto(@Param("filtroProducto")String filtro_producto);
}
