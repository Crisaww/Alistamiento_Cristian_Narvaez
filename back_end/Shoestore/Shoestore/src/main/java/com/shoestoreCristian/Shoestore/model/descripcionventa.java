package com.shoestoreCristian.Shoestore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name="descripcionventa")
public class descripcionventa {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_descripcionventa", nullable = false, length = 36)
    private String id_descripcionventa; 

    @Column(name = "cantidad", nullable = false)
    private int cantidad; 

    @Column(name = "precio", nullable = false, length = (int) 9.2)
    private double precio; 

    @Column(name = "descuento", nullable = false, length = (int) 9.2)
    private double descuento; 

    @Column(name = "subtotal", nullable = false, length = (int) 9.2)
    private double subtotal; 



    //MANY TO ONE ********
    @ManyToOne
    @JoinColumn(name="id_venta")
    private venta venta;

    //MANY TO ONE ********
    @ManyToOne
    @JoinColumn(name="id_producto")
    private producto producto;

    


    public descripcionventa() {
        super();
    }


    public descripcionventa(String id_descripcionventa, int cantidad, double precio, double descuento, double subtotal, venta venta, producto producto) {
        this.id_descripcionventa = id_descripcionventa;
        this.cantidad = cantidad;
        this.precio = precio;
        this.descuento = descuento;
        this.subtotal = subtotal;
        this.venta = venta;
        this.producto = producto;
    }


    public String getId_descripcionventa() {
        return id_descripcionventa;
    }

    public void setId_descripcionventa(String id_descripcionventa) {
        this.id_descripcionventa = id_descripcionventa;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public venta getVenta() {
        return venta;
    }

    public void setVenta(venta venta) {
        this.venta = venta;
    }

    public producto getProducto() {
        return producto;
    }

    public void setProducto(producto producto) {
        this.producto = producto;
    }



}
