package com.shoestoreCristian.Shoestore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoestoreCristian.Shoestore.interfaceService.IclienteService;
import com.shoestoreCristian.Shoestore.interfaces.Icliente;
import com.shoestoreCristian.Shoestore.model.cliente;

@Service
public class clienteService implements IclienteService{

    @Autowired
    private Icliente data;

    @Override
    public String save (cliente cliente){
        data.save(cliente);
        return cliente.getId_cliente();
    }

    @Override
    public List<cliente> findAll(){
        List<cliente> listacliente=(List<cliente>) data.findAll();
        return listacliente;
    }

    @Override
	public List<cliente> filtroCliente(String filtro_cliente) {
		List<cliente>listacliente=data.filtroCliente(filtro_cliente);
		return listacliente;
	}

    @Override
    public List<cliente> filtroNumeroDocumento(String numero_documento){
        List<cliente> listacliente=data.filtroNumeroDocumento(numero_documento);
        return listacliente;
    }

    @Override
    public Optional<cliente> findOne(String id_cliente){
        Optional<cliente> cliente=data.findById(id_cliente);
        return cliente;
    }


    //ELIMINADO FISICO: Se elimina directamente de la base de datos*****

    @Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}

   

}

