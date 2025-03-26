import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      const res = await fetch(`${baseURL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Registration successful!");
        setFormData({ email: "", password: "" });
      } else {
        alert(data.error || "Something went wrong.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen w-full bg-color">
      <form className="signup-form font-color  ">
        <Input
          text="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          formData={formData}
          setFormData={setFormData}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter Your password"
          text="Password"
          formData={formData}
          setFormData={setFormData}
        />

        <Button text="Login" action={handleLogin} />

        <Link className="font-color redirect-to-login" to="/signup">
          I don't have an Accound! SingUp
        </Link>
      </form>
    </div>
  );
};

export default Login;
