import React from "react";

export const MenuBar = (props) => {
  const {
    handleSubmit,
    handleDateChange,
    handleInputChange,
    disableButton,
    loading,
    loadingClass,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="column">
        <div className="hero title">
          <h1 className="title mt-4">Filtro SGI - Factura Compra</h1>
        </div>
        <div className="tile is-ancestor mb-2">
          <div className="tile is-parent is-vertical is-3">
            <div className="tile is-child box">
              <p>Año y Mes de imputación</p>
              <input
                className="input"
                type="month"
                onChange={handleDateChange}></input>
            </div>
          </div>
          <div className="tile is-parent is-vertical is-3">
            <div className="tile is-child box">
              <p>Tipo de comprobante:</p>
              <div className="select">
                <select>
                  <option>Comprobante 1</option>
                  <option>Comprobante 2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="tile is-parent is-vertical is-3">
            <div className="tile is-child box">
              <p>Numero de factura</p>
              <input className="input" onChange={handleInputChange}></input>
            </div>
          </div>
          <div className="tile is-parent is-vertical is-3">
            <div className="tile is-child box">
              <button
                className={
                  loading
                    ? loadingClass + " button is-medium m-2 "
                    : "button is-medium m-2"
                }
                disabled={disableButton}
                type="submit">
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
