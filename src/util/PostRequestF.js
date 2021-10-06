import React, { useEffect, useState } from "react";

export const PostRequestF = () => {
  const [facturas, setFacturas] = useState({});
  //const [id, setId] = useState(null);
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
        <input type="month" onChange={handleChange}></input>
        <input type="month" onChange={handleChangeTop}></input>

        <button type="submit">Submit</button>
      </form>
      {/* <div className="container">
        {facturas.length &&
          facturas.map((facturas) => (
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <p className="force">ID: {facturas.id}</p>
                    <p className="force">
                      Fecha: {facturas.mes_anio_imputacion}
                    </p>
                    <p className="force">Estado: {facturas.estado}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div> */}
      <div>
        {facturas.length &&
          facturas
            .filter(
              (facturas) =>
                facturas.mes_anio_imputacion >= fecha &&
                facturas.mes_anio_imputacion <= fechaTop
            )
            .map((factura) => (
              <div key={factura.id} className="card">
                <div className="card-body force">
                  <li>id: {factura.id}</li>
                  <li>numero_factura: {factura.numero_factura}</li>
                  <li>activo: {factura.activo}</li>
                  <li>estado: {factura.estado}</li>
                  <li>mes_anio_imputacion: {factura.mes_anio_imputacion}</li>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
