import React from 'react';

export const TRMINOS_Y_CONDICIONES_DEL_CUPN_DE_DESCUENTO = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
<p><strong>Valor del Descuento:</strong> Este cupón otorga un descuento de $30,000 COP (treinta mil pesos colombianos) en compras realizadas en categorías seleccionadas.</p>
<p><strong>Compra Mínima:</strong> Para hacer efectivo el descuento, el valor total de los productos seleccionados debe ser igual o superior a $200,000 COP (doscientos mil pesos colombianos).</p>
<p><strong>Categorías Seleccionadas:</strong> El descuento es aplicable únicamente en categorías seleccionadas. Dichas categorías serán especificadas en la promoción o en el lugar donde se ofrece el cupón. El descuento no es transferible y no puede ser canjeado por dinero en efectivo o cualquier otro beneficio.</p>
<p><strong>Uso Único:</strong> Este cupón es válido para un solo uso. Una vez utilizado, el cupón no puede ser reutilizado en otra compra.</p>
<p><strong>Vigencia:</strong> El cupón tiene una fecha de caducidad que será especificada en el mismo. No se aceptarán cupones después de su fecha de vencimiento.</p>
<p><strong>No Acumulable:</strong> Este cupón no es acumulable con otros descuentos, promociones o ofertas especiales.</p>
<p><strong>Limitaciones:</strong> El descuento no es aplicable a gastos de envío, impuestos u otros cargos adicionales.</p>
<p>NORTHEM GROUP SAS se reserva el derecho de modificar o cancelar este cupón o los términos y condiciones relacionados en cualquier momento, sin previo aviso.</p>
` }} />
  );
};
