import React, { useEffect, useState } from "react";
import { MainDatePicker } from "../components/MainDatePicker";

export const PostRequestF = () => {
  const [facturas, setFacturas] = useState({});
  const [fecha, setFecha] = useState(Date());

  let myfield;
  let myfieldTop;
  let today = new Date();
  let todaysDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    const url = "http://apisgi.umbot.com.ar/v1/fc/filter";
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
    };
    const body = {
      field: "mes_anio_imputacion",
      value: fecha,
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, headers, body);
        const json = await response.json();
        setFacturas(json.fc);
      } catch (error) {
        console.log("error", error);
        console.log("error", error.message);
      }
    };
    fetchData();
  }, [fecha]);

  const handleChange = (e) => {
    e.preventDefault();
    myfield = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFecha(myfield);
  };

  return (
    <div className="app-border container">
      <form onSubmit={handleSubmit}>
        <div className="column">
          <div className="hero title">
            <h1 className="title mt-4">Filtro SGI - Factura Compra</h1>
          </div>
          <div className="tile is-ancestor mb-2">
            <div className="tile is-parent is-vertical is-5">
              <div className="tile is-child box">
                <p>Año y Mes de imputación (start):</p>
                <input
                  className="input"
                  type="month"
                  onChange={handleChange}></input>
              </div>
            </div>
            <div className="tile is-parent is-vertical is-5">
              <div className="tile is-child box">
                <p>Tipo de comprobante:</p>
              </div>
            </div>
            <div className="tile is-parent is-vertical is-2">
              <div className="tile is-child box">
                <button className="button is-medium m-2" type="submit">
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        <div className="panel is-primary">
          <div className="columns panel-heading">
            <div className="tile subtitle m-auto">
              <strong className="has-text-white m-auto">
                Numero de factura
              </strong>{" "}
            </div>
            <div className="tile subtitle m-auto">
              <strong className="has-text-white m-auto">
                Fecha de imputación
              </strong>
            </div>
            <div className="tile subtitle m-auto">
              <strong className="has-text-white m-auto">Estado</strong>
            </div>
            <div className="tile subtitle m-auto">
              <strong className="has-text-white m-auto">Monto</strong>
            </div>
          </div>
        </div>

        {facturas.length &&
          facturas
            .filter(
              (facturas) =>
                facturas.mes_anio_imputacion >= fecha &&
                facturas.mes_anio_imputacion <= todaysDate
              // && facturas.mes_anio_imputacion <= fechaTop
            )
            .map((factura) => (
              <div key={factura.id} className="columns  m-1">
                <div className="column m-auto panel-block">
                  {factura.numero_factura}
                </div>

                <div className="column m-auto panel-block force-overflow">
                  {factura.mes_anio_imputacion}
                </div>

                <div className="column m-auto panel-block">
                  {factura.estado}
                </div>

                <div className="column m-auto panel-block force-panel">
                  <span>{factura.total}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
