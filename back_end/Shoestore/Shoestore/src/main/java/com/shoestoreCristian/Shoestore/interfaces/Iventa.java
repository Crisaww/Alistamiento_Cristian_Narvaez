package com.shoestoreCristian.Shoestore.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shoestoreCristian.Shoestore.model.venta;

@Repository
public interface Iventa extends CrudRepository<venta,String>{
   @Query("SELECT v FROM venta v LEFT JOIN "
			
    + "v.cliente c "
    + " WHERE c.primer_nombre LIKE %?1% "
    + " OR c.primer_apellido LIKE %?1%") 
    List<venta> filtroVenta(@Param("filtroVenta")String filtro_venta); 

    //para no poder ingresar  una persona que ya existe en la base de datos
	// 		@Query ("SELECT v FROM venta v JOIN v.cliente c "
    //         +"WHERE c.id_cliente=?1 AND i.estado='Activo' "
    
    
    // )
    // List<venta> filtroEstado(String id_cliente);
}
