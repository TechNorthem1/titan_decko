import React from 'react'

const Whatsapp = ({title = null, price = null, url = null}) => {
    const numeroWhatsApp = "3203764679";

    const encodeMessage = (title: string, price: number, url: string) => {
        const mensaje = `Hola Buen día\nQuiero comprar el producto\n${title}\n${price}\n${url}`;
        return encodeURI(mensaje);
    };

    const mensajeWhatsApp = encodeMessage(title, price, url);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;

    return (
        <a href={urlWhatsApp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Compra este producto por Whatsapp
        </a>
    );
}


export default Whatsapp;