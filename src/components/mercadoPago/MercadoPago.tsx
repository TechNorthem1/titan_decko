'use client'
import React, { useEffect } from 'react'


const MercadoPago = () => {
    useEffect(() => {
        // Agregar el script de Mercado Pago
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
        // script.setAttribute('data-preference-id', idPreferencia);
    
        // Agregar el script al DOM
        document?.getElementById('boton-pago')?.appendChild(script);
    });
    
    return <div id="boton-pago" />;
}

export default MercadoPago;
