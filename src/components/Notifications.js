import React, { useState, useEffect } from "react";

export const Notifications = () => {
  const [message] = useState("No se encontraron resultados.");

  useEffect(() => {}, []);

  return (
    <>
      <div className="notification is-warning is-light">
        <span>{message}</span>
      </div>
    </>
  );
};
