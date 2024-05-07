package com.shoestoreCristian.Shoestore.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shoestoreCristian.Shoestore.model.cliente;

@Repository
public interface Icliente extends CrudRepository<cliente,String>{
    @Query("SELECT c FROM cliente c WHERE "
			
			+ "c.id_cliente LIKE %?1% OR "
			+ "c.primer_nombre LIKE %?1% OR "
			+ "c.ciudad_residencia LIKE %?1% OR "
			+ "c.estado LIKE % :filtroCliente%")
	
	List<cliente> filtroCliente(@Param("filtroCliente") String filtro_cliente);

    @Query ("SELECT c FROM cliente c "
                +"WHERE c.numero_documento=?1 "
            )
    
            List<cliente> filtroNumeroDocumento (String numero_documento);
    
}
