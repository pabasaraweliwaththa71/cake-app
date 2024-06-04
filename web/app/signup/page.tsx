"use client";

import { useState } from "react";

export default function Page() {
  const [errors, setErrors] = useState({} as any);

  function validateForm(data: any) {
    let errors = {} as any;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.get("name")) {
      errors.name = "Name is required";
    }
    if (!data.get("email")) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(data.get("email"))) {
      errors.email = "Invalid email address";
    }
    if (!data.get("address")) {
      errors.address = "Address is required";
    }
    if (!data.get("phone")) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(data.get("phone"))) {
      errors.phone = "Invalid phone number";
    }
    if (!data.get("province")) {
      errors.province = "Province is required";
    }
    if (!data.get("password")) {
      errors.password = "Password is required";
    } else if (data.get("password").length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!data.get("confirmPassword")) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.get("password") !== data.get("confirmPassword")) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    data.append("role", "user");
    const value = Object.fromEntries(data.entries());

    fetch("http://localhost:5000/v1/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "successful") {
          console.log("Success:", data);
          window.location.href = "/login";
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
