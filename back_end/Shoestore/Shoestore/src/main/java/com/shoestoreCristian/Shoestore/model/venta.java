package com.shoestoreCristian.Shoestore.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name="venta")
public class venta {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_venta", nullable = false, length = 36)
    private String id_venta; 

    @Column(name = "total", nullable = false, length = 45)
    private String total; 

    @Column (name = "fecha_venta", nullable = false)
    private LocalDate fecha_venta;

    @Column(name = "estado", nullable = false, length = 10)
    private estadoVenta estado; 



    //MANY TO ONE ********

    @ManyToOne
    @JoinColumn(name="id_cliente")
    private cliente cliente;




    
    public venta() {
        super();
    }


    public venta(String id_venta, cliente cliente,  String total, LocalDate fecha_venta, estadoVenta estado) {
        this.id_venta = id_venta;
        this.total = total;
        this.cliente= cliente;
        this.fecha_venta = fecha_venta;
        this.estado = estado;
        

        
    }


    public String getId_venta() {
        return id_venta;
    }

    public void setId_venta(String id_venta) {
        this.id_venta = id_venta;
    }

    public cliente getCliente() {
		return cliente;
	}

	public void setCliente(cliente cliente) {
		this.cliente = cliente;
	}

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public void setFecha_venta(LocalDate fecha_venta) {
        this.fecha_venta = fecha_venta;
    }

    public LocalDate getFecha_venta() {
        return fecha_venta;
    }


    public estadoVenta getEstado() {
        return estado;
    }


    public void setEstado(estadoVenta estado) {
        this.estado = estado;
    }

    

    




    


}
