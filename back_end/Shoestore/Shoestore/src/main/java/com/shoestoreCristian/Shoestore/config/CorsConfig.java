package com.shoestoreCristian.Shoestore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    
        @Bean
        public CorsFilter corsFilter() {
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            CorsConfiguration config = new CorsConfiguration();

            //permitir solicitudes desde todos los origenes
            config.addAllowedOrigin("*");
            // config.addAllowedOrigin("http://127.0.0.1:64107/");
            // config.addAllowedOrigin("http://127.0.0.1:53844/");
            // config.addAllowedOrigin("http://127.0.0.1:54943/");
            // config.addAllowedOrigin("http://127.0.0.1:5500/");
            // config.addAllowedOrigin("http://127.0.0.1:51520/");
            // config.addAllowedOrigin("http://127.0.0.1:49889/");
            // config.addAllowedOrigin("http://127.0.0.1:55869/");

            //permitir solicitudes con estos metodos HTTP
            config.addAllowedMethod("GET");
            config.addAllowedMethod("POST");
            config.addAllowedMethod("PUT");
            config.addAllowedMethod("DELETE");

            //permitir el envio de ciertos encabezados en las solicitudes
            config.addAllowedHeader("Authorization");
            config.addAllowedHeader("Content-Type");

            source.registerCorsConfiguration("/**", config);
            return new CorsFilter(source);
    }

}
