import React, { useEffect, useState } from "react";
import { MostrarFacturas } from "./MostrarFacturas";
import { MenuBar } from "./MenuBar";

export const FiltroFacturaCompra = () => {
  const [facturas, setFacturas] = useState({});
  const [date, setDate] = useState(Date());
  const [numeroFactura, setNumeroFactura] = useState("");
  const [myField, setMyField] = useState("");
  const [myFieldFactura, setMyFieldFactura] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const loadingClass = "is-loading";

  useEffect(() => {
    const url = "http://apisgi.umbot.com.ar/v1/fc/filter";
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
    };
    const body = {
      field: "mes_anio_imputacion",
      value: date,
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, headers, body);
        const json = await response.json();
        setFacturas(json.fc);
        handleLoading(false);
      } catch (error) {
        console.log("error", error);
        console.log("error", error.message);
        handleLoading(false);
      }
    };
    fetchData();
  }, [date]);

  const handleLoading = (bool) => {
    setLoading(bool);
    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setMyField(e.target.value);
    setDisableButton(false);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setMyFieldFactura(e.target.value);
    setDisableButton(false);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDate(myField);
    setNumeroFactura(myFieldFactura);
    handleLoading(true);
  };

  return (
    <div className="app-border container">
      <MenuBar
        handleDateChange={handleDateChange}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        disableButton={disableButton}
        loading={loading}
        loadingClass={loadingClass}
      />

      <div>
        <div className="panel is-primary">
          <div className="columns panel-heading">
            <div className="tile subtitle m-auto">
              <strong className="has-text-white m-auto">
                Numero de factura
              </strong>
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

        <MostrarFacturas
          facturas={facturas}
          date={date}
          numeroFactura={numeroFactura}
          myField={myField}
          myFieldFactura={myFieldFactura}
        />
      </div>
    </div>
  );
};
