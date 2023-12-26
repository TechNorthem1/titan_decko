"use client";
import Container from '@component/Container';
import React from 'react'
import "./style.css"
import Grid from '@component/grid/Grid';
import Image from "next/image";

const Section3 = () => {

  const showDescirption = () => {
    let container_description:any = document.querySelector(".container-description")
    let btn_description:any = document.querySelector("#show_description");
    let content_description:any = document.querySelector(".content_description")
    let description:any = document.querySelector(".description");
    
    container_description.classList.add("active");
    btn_description.classList.add("hidden");
    content_description.classList.add("active");
    description.classList.add("active");
  }

  


  return (
    <Container className='container-description'>
      <Grid container spacing={2}>
        <Grid className='content_description' item lg={8} xs={12} >
          <hr />
          <h2>Descripcion</h2>

          <div className="description">
            <p>
              <span>
                Si tienes inquietudes, escríbenos por WhatsApp 3203764679
              </span>
            </p>
            <p>
              <span>
              *Somos régimen común, generamos factura electrónica, todos nuestros precios son con IVA incluido*
              </span>
            </p>
            <p>
              <span>
                Precio publicado: 1 moldura flexible de 2,3 cm de alto x 5 mts con pegante y escuadra de instalación
              </span>
            </p>
            <p>
              <span>
              (Por cada 2 rollos se envía un kit de pegante + 1 escuadra)
              </span>
            </p>
            <p>
              <span>
                Productos fabricado con caucho sintético EVA (etilvinilacetato)
              </span>
            </p>
            <p>
              <span>
                Superficies recomendadas: Paredes en ladrillo o bloque a la vista, cemento, cerámica, papel tapiz, madera, drywall, superboard, paredes viejas y con hongos. Puedes pintar usando pinturas a base de agua
              </span>
            </p>
            <p>
              <span>
                Limpieza: Fácil limpieza, se recomienda humedecer un paño o esponja suave (no usar elementos abrasivos). No soporta limpieza con ácido.
              </span>
            </p>
            <p>
              <span>
                Precauciones y cuidado:
              </span>
            </p>
            <ul>
              <li>
                No instalar sobre superficies con protuberancias. La superficie debe estar completamente lisa. Requiere aplicar un poco de pegante con un pincel tanto en la superficie en que la vas a pegar como en la moldura para que se pueda adherir mejor.
              </li>
              <li>
                Solo adherir una vez a la superficie, si retiras la moldura de forma constante perderá su pegamento.
              </li>
              <li>
                Sólo instala en interiores cubiertos.
              </li>
              <li>
                No instalar  recién sacado del empaque, Enrolla en el sentido contrario, cortas y dejas que los cortes se desdoblen un poco. Esperar aproximadamente  2 Horas.
              </li>
            </ul>
            <p>
              <span>
                Garantia y vida util
              </span>
            </p>
            <ul>
              <li>
                Garantía producto: 6 meses. La garantía cubre imperfecciones de fabrica, NO CUBRE mala manipulación del usuario
              </li>
              <li>
                Garantía de satisfacción: Puedes devolver este producto en un plazo máximo de 5 días, éste debe estar en perfecto estado: sin uso, manuales, elementos adicionales enviades  y embalaje original.
              </li>
              <li>
                Vida útil 10 a 15 años.
              </li>
            </ul>
          </div>

          <button className='show' id='show_description' onClick={showDescirption}>Ver descripcion completa</button>
        </Grid>
        <Grid item lg={4} xs={12} >
          <div className="container_guarantee">
            <h3>Garantias y devoluciones</h3>
            <p>Paga con tranquilidad si no te gusta devuelvelo</p>
            <p>
              Puedes devolver el producto dentro de 5 dias habiles siguientes a recibirlo
            </p>
            <hr />
            <h4>Medio de pago</h4>
            <h4>Tarjetas de credito</h4>
            <Image src="/assets/images/payments/carts.webp" alt="Medios de pagos" width={120} height={30}/>

            <h4>Transferencias bancarias</h4>
            <Image src="/assets/images/payments/pse.webp" alt="Medios de pagos"  width={120} height={30} style={{objectFit: "cover"}}/>

            <a className='show' href='#'>
              Ver mas medios de pago
            </a>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}



export default Section3