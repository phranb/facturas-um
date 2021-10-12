import React from "react";

export const MostrarFacturas = (props) => {
  const { facturas, date, numeroFactura, myField } = props;
  return (
    <div>
      {facturas.length &&
        facturas
          .filter(
            (facturas) =>
              (facturas.mes_anio_imputacion.substring(0, 7) === date &&
                numeroFactura === "") ||
              (facturas.numero_factura === numeroFactura &&
                facturas.mes_anio_imputacion.substring(0, 7) === date) ||
              (myField === "" && facturas.numero_factura === numeroFactura)
          )
          .map((factura) => (
            <div key={factura.id} className="columns m-1">
              <div className="column m-auto panel-block">
                {factura.numero_factura}
              </div>

              <div className="column m-auto panel-block force-overflow">
                <span className="has-text-weight-bold">
                  {factura.mes_anio_imputacion.substring(0, 4)}
                </span>
                <span className="i">
                  {factura.mes_anio_imputacion.substring(4, 7)}
                </span>
              </div>

              <div className="column m-auto panel-block">{factura.estado}</div>

              <div className="column m-auto panel-block force-panel subtitle">
                $ {factura.total}
              </div>
            </div>
          ))}
    </div>
  );
};
