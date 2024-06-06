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

  return (
    <div className=" flex items-center justify-center ">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Sign up</h1>
        <form className="mt-4 space-y-4 w-96" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >

            Name
            </label>
            
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >

              Email address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Email address"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >

              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Address"
            />

            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >

              Province
            </label>
            <select
              id="province"
              name="province"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >

              <option value="Western">Western</option>
              <option value="Central">Central</option>
              <option value="Eastern">Eastern</option>
              <option value="North Central">North Central</option>
              <option value="Northern">Northern</option>
              <option value="North Western">North Western</option>
              <option value="Sabaragamuwa">Sabaragamuwa</option>
              <option value="Southern">Southern</option>
              <option value="Uva">Uva</option>
            </select>

          </div>