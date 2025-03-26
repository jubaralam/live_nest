import React from "react";

const Input = ({ name, type, placeholder, text, formData, setFormData }) => {
  return (
    <label className="flex flex-col">
      {text}
      <input
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name]}
      />
    </label>
  );
};

export default Input;
