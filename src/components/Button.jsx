import React from "react";

const Button = ({ text, action }) => {
  return (
    <div>
      <button onClick={action} className="b-color sec-bg hover-bg ">
        {text}
      </button>
    </div>
  );
};

export default Button;
