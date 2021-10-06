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
    <div className="container box mt-6 has-background-light">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="hero title">
            <h1 className="title mt-4">Filtro SGI - Factura Compra</h1>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-parent is-vertical is-12">
              <div className="tile is-child box">
                <p>Año y Mes de imputación (start):</p>
                <input
                  className="input"
                  type="month"
                  onChange={handleChange}></input>
              </div>
            </div>
            {/* <div className="tile is-parent is-vertical is-6">
              <div className="tile is-child box">
                <p>Año y Mes de imputación (end):</p>
                <input
                  className="input"
                  type="month"
                  onChange={handleChangeTop}></input>
              </div>
            </div> */}
          </div>
          <button className="button is-large mt-6 mb-6" type="submit">
            Filtrar
          </button>
        </div>
      </form>
      <div>
        <div className="hero">
          <div className="columns box has-background-white m-1">
            <div className="column subtitle m-auto">Numero de factura </div>
            <div className="column subtitle m-auto">Fecha de imputación</div>
            <div className="column subtitle m-auto">Estado</div>
            <div className="column subtitle m-auto">Monto</div>
          </div>
        </div>
        <div className="mt-2">
          {facturas.length &&
            facturas
              .filter(
                (facturas) => facturas.mes_anio_imputacion >= fecha
                // && facturas.mes_anio_imputacion <= fechaTop
              )
              .map((factura) => (
                <div key={factura.id} className="columns  m-1">
                  <div className="column m-auto">{factura.numero_factura}</div>

                  <div className="column m-auto">
                    {factura.mes_anio_imputacion}
                  </div>

                  <div className="column m-auto">{factura.estado}</div>

                  <div className="column m-auto">{factura.total}</div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
