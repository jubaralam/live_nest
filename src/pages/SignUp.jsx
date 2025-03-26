import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const SingUp = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  // const [error, setError] = useState("");
  // const [leading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      const res = await fetch(`${baseURL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Registration successful!");
        setFormData({ name: "", email: "", username: "", password: "" });
      } else {
        alert(data.error || "Something went wrong.");
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen w-full bg-color">
      <form className="signup-form font-color  ">
        <Input
          text="Name"
          type="text"
          placeholder="Enter your name"
          formData={formData}
          setFormData={setFormData}
          name="name"
        />

        <Input
          text="Username"
          type="text"
          placeholder="Enter your username"
          name="username"
          formData={formData}
          setFormData={setFormData}
        />
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

        <Button text="Register" action={handleRegister} />

        <Link className="font-color redirect-to-login" to="/login">
          I have an Accound! Signin
        </Link>
      </form>
    </div>
  );
};

export default SingUp;
