import React from "react";

function Button({ onClick, className, children }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
