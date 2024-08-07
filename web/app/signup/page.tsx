// Enable client-side rendering
"use client";

// Importing useState from React
import { useState } from "react";

// Exporting the default Page component
export default function Page() {
  const [errors, setErrors] = useState({} as any); // Initializing state to store form errors

// Function to validate the form data
  function validateForm(data: any) {
    let errors = {} as any;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Regex for validating email
    const phoneRegex = /^[0-9]{10}$/; // Regex for validating phone number

    // Check if name is provided
    if (!data.get("name")) {
      errors.name = "Name is required";
    }

// Check if email is provided and valid
    if (!data.get("email")) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(data.get("email"))) {
      errors.email = "Invalid email address";
    }

    // Check if address is provided
    if (!data.get("address")) {
      errors.address = "Address is required";
    }

    // Check if phone number is provided and valid
    if (!data.get("phone")) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(data.get("phone"))) {
      errors.phone = "Invalid phone number";
    }

    // Check if province is selected
    if (!data.get("province")) {
      errors.province = "Province is required";
    }

    // Check if password is provided and meets length requirement
    if (!data.get("password")) {
      errors.password = "Password is required";
    } else if (data.get("password").length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Check if confirm password is provided and matches password
    if (!data.get("confirmPassword")) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.get("password") !== data.get("confirmPassword")) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors; // Return the errors object
  }

  // Function to handle form submission
  function handleSubmit(event: any) {
    event.preventDefault(); // Prevent default form submission
    const data = new FormData(event.target); // Collect form data

    const errors = validateForm(data); // Validate form data
    if (Object.keys(errors).length > 0) {
        // Set errors if validation fails
      setErrors(errors);
      return;
    }

    data.append("role", "user"); // Append role to form data
    const value = Object.fromEntries(data.entries()); // Convert form data to object

    // Send form data to server
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
          window.location.href = "/login"; // Redirect to login page on success
        } else {
          alert(data.error); // Show error message on failure
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log errors to console
      });
  }

  // Render the signup form
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

 {/* Name input field */}
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

{/* Email input field */}
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

 {/* Address input field */}
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

 {/* Province select field */}
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

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >

 {/* Phone input field */}
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Phone"
            />
            
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >

  {/* Password input field */}
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Password"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

  {/* Confirm Password input field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >

              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Confirm Password"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >

            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
