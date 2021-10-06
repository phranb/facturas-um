import { setBlockTracking } from "@vue/runtime-core";
import React, { useEffect, useState } from "react";

export const PostRequestF = () => {
  const [facturas, setFacturas] = useState({});
  const [fecha, setFecha] = useState(Date());
  const [fechaTop, setFechaTop] = useState(Date());

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
        // setFacturas(json);
        setFacturas(json.fc);
        //console.log(facturas);
      } catch (error) {
        console.log("error", error);
        console.log("error", error.message);
      }
    };
    fetchData();
  }, [fecha]);

  let myfield;
  let myfieldTop;

  const handleChange = (e) => {
    e.preventDefault();
    myfield = e.target.value;
  };

  const handleChangeTop = (e) => {
    e.preventDefault();
    myfieldTop = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFecha(myfield);
    setFechaTop(myfieldTop);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container box mt-6 has-background-light">
          <div className="hero title">
            <h1 className="title mt-4">Filtro SGI - Factura Compra</h1>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-parent is-vertical is-6">
              <div className="tile is-child box">
                <p>Año y Mes de imputación (start):</p>
                <input
                  className="input"
                  type="month"
                  onChange={handleChange}></input>
              </div>
            </div>
            <div className="tile is-parent is-vertical is-6">
              <div className="tile is-child box">
                <p>Año y Mes de imputación (end):</p>
                <input
                  className="input"
                  type="month"
                  onChange={handleChangeTop}></input>
              </div>
            </div>
          </div>
          <button className="button is-large" type="submit">
            Filtrar
          </button>
        </div>
      </form>
      <div>
        <div className="columns">
          <div className="column">Numero de factura </div>
          <div className="column">Fecha de imputación</div>
          <div className="column">Fecha de vencimiento</div>
          <div className="column">Monto</div>
        </div>
        <div className="">
          {facturas.length &&
            facturas
              .filter(
                (facturas) =>
                  facturas.mes_anio_imputacion >= fecha &&
                  facturas.mes_anio_imputacion <= fechaTop
              )
              .map((factura) => (
                <div key={factura.id} className="columns">
                  <li className="column">{factura.numero_factura}</li>

                  <li className="column">{factura.mes_anio_imputacion}</li>

                  <li className="column">{factura.estado}</li>

                  <li className="column">{factura.total}</li>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};