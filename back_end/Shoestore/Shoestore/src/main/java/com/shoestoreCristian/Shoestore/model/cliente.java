package com.shoestoreCristian.Shoestore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity(name="cliente")
public class cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_cliente", nullable = false, length = 36)
    private String id_cliente; 

    @Column(name = "tipo_documento", nullable = false)
    private tipodocumento tipo_documento; 

    @Column(name = "numero_documento", nullable = false, length = 10)
    private String numero_documento; 

    @Column(name = "primer_nombre", nullable = false, length = 45)
    private String primer_nombre; 

    @Column(name = "primer_apellido", nullable = false, length = 45)
    private String primer_apellido; 

    @Column(name = "celular", nullable = false, length = 13)
    private String celular; 

    @Column(name = "direccion_residencia", nullable = false, length = 45)
    private String direccion_residencia; 

    @Column(name = "ciudad_residencia", nullable = false, length = 45)
    private String ciudad_residencia; 

    @Column(name = "correo_electronico", nullable = false, length = 100)
    private String correo_electronico;

    @Column(name = "estado", nullable = false, length = 10)
    private Estado estado; 


    public cliente() {
		super();
	}

	public cliente(String id_cliente, tipodocumento tipo_documento, String numero_documento, 
					String primer_nombre, String primer_apellido,
					String celular, String direccion_residencia, 
					String ciudad_residencia, String correo_electronico, Estado estado)
	{
		super();
		
		this.id_cliente = id_cliente;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.primer_nombre = primer_nombre;
		this.primer_apellido = primer_apellido;
		this.celular = celular;
		this.direccion_residencia = direccion_residencia;
		this.ciudad_residencia = ciudad_residencia;
        this.correo_electronico = correo_electronico;
		this.estado = estado;
	}

    public String getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(String id_cliente) {
        this.id_cliente = id_cliente;
    }

    public tipodocumento getTipo_documento() {
        return tipo_documento;
    }

    public void setTipo_documento(tipodocumento tipo_documento) {
        this.tipo_documento = tipo_documento;
    }

    public String getNumero_documento() {
        return numero_documento;
    }

    public void setNumero_documento(String numero_documento) {
        this.numero_documento = numero_documento;
    }

    public String getPrimer_nombre() {
        return primer_nombre;
    }

    public void setPrimer_nombre(String primer_nombre) {
        this.primer_nombre = primer_nombre;
    }

    public String getPrimer_apellido() {
        return primer_apellido;
    }

    public void setPrimer_apellido(String primer_apellido) {
        this.primer_apellido = primer_apellido;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getDireccion_residencia() {
        return direccion_residencia;
    }

    public void setDireccion_residencia(String direccion_residencia) {
        this.direccion_residencia = direccion_residencia;
    }

    public String getCiudad_residencia() {
        return ciudad_residencia;
    }

    public void setCiudad_residencia(String ciudad_residencia) {
        this.ciudad_residencia = ciudad_residencia;
    }

    public String getCorreo_electronico(){
        return correo_electronico;
    }

    public void setCorreo_electronico(String correo_electronico){
        this.correo_electronico = correo_electronico;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    



}
