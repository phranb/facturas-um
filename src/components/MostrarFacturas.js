import React, { useEffect, useState, useRef } from "react";
import { Notifications } from "./Notifications";

export const MostrarFacturas = (props) => {
  const { facturas, date, numeroFactura, myField, isMobile } = props;
  const myContainer = useRef(null);
  const [results, setResults] = useState(false);

  useEffect(() => {
    myContainer.current.contains(
      document.getElementById("numeroFactura")
        ? setResults(true)
        : setResults(false)
    );
  }, [props]);

  return (
    <>
      <div ref={myContainer}>
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
                <div
                  className={
                    isMobile
                      ? "column m-auto panel-block number-table-head"
                      : "column m-auto panel-block"
                  }>
                  <span id="numeroFactura" className="has-text-weight-bold">
                    <span
                      className={
                        isMobile
                          ? "text is-italic has-text-weight-light"
                          : "hide text is-italic has-text-weight-light"
                      }>
                      Numero:{" "}
                    </span>
                    {factura.numero_factura.substring(0, 4)}
                  </span>
                  -<span>{factura.numero_factura.substring(5, 13)}</span>
                </div>

                <div className="column m-auto panel-block force-overflow">
                  <span className="has-text-weight-bold">
                    <span
                      className={
                        isMobile
                          ? "text is-italic has-text-weight-light"
                          : "hide text is-italic has-text-weight-light"
                      }>
                      Año:{" "}
                    </span>
                    {factura.mes_anio_imputacion.substring(0, 4)}
                  </span>
                  <span className="">
                    {factura.mes_anio_imputacion.substring(4, 7)}
                  </span>
                </div>

                <div className="column m-auto panel-block">
                  <span
                    className={
                      isMobile
                        ? "text is-italic has-text-weight-light"
                        : "hide text is-italic has-text-weight-light"
                    }>
                    Estado:{" "}
                  </span>
                  {factura.estado}
                </div>

                <div className="column m-auto panel-block force-panel">
                  <span
                    className={
                      isMobile
                        ? "text is-italic has-text-weight-light"
                        : "hide text is-italic has-text-weight-light"
                    }>
                    Monto:{" "}
                  </span>
                  <span className="text is-italic">$ </span> {factura.total}
                </div>
              </div>
            ))}
      </div>

      {!results && <Notifications />}
    </>
  );
};
