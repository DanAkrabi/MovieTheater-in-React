import "./Loader.css";
import React from "react";

function Loader({ className, children }) {
  return <p className={className}>{children}</p>;
}

export default Loader;
