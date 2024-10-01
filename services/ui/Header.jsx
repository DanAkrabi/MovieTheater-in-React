import "./Header.css";
import React from "react";

function Header({ children }) {
  return <h1 className="headline">{children} </h1>;
}

export default Header;
