// This directive ensures the component is rendered on the client side
"use client";

// Importing hooks from React
import { useEffect, useState } from "react";
// Importing jwt-decode library for decoding JWT tokens
import { jwtDecode } from "jwt-decode";
// Importing Link from Next.js for client-side navigation
import Link from "next/link";

export default function Page() {
    // State for storing validation errors
    const [errors, setErrors] = useState({} as any);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      address: "",
      province: "",
      phone: "",
    }); // State for storing form data

    // Function to fetch user data from the server
    const getUserData = async () => {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            // Decode the token to get user ID
          const decodedToken = jwtDecode(token) as any;
          const response = await fetch(
            // Fetch user data using the user ID
            `http://localhost:5000/v1/api/user/${decodedToken.id}`
          );
          // Parse the response to JSON
          const data = await response.json();
          // Update form data with fetched user data
          setFormData(data);
        }
      };

      useEffect(() => {
        // Fetch user data when the component mounts
        getUserData();
      }, []);
    
      // validate password
      function validateForm() {
        let errors = {} as any;
    
        if (formData.password && formData.password.length < 6) {
            // Validate password length
          errors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            // Validate password confirmation
          errors.confirmPassword = "Passwords do not match";
        }
        return errors;
      }

      // Handle form update
      // Function to handle form update
  function handleUpdate() {
    // Validate form data
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
        // Set validation errors if any
      setErrors(errors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Get token from localStorage
    const token = localStorage.getItem("token") as string;
    // Decode the token to get user ID
    const decodedToken = jwtDecode(token) as any;

    fetch(`http://localhost:5000/v1/api/user/${decodedToken.id}`, {
      // Use PUT method to update user data
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Send updated form data
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "successful") {
          // Log success message
          console.log("Update Success:", data);
          // Update token in localStorage
          localStorage.setItem("token", data.token);
          // Refresh user data
          getUserData();
          alert("Profile updated successfully"); // Show success alert
        } else {
          alert("An error occurred. Please try again."); // Show error alert
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again."); // Show error alert
        console.error("Update Error:", error); // Log error
      });
  }

  // Function to handle profile deletion
  function handleDelete() {
    // Get token from localStorage
    const token = localStorage.getItem("token") as string;
    // Decode the token to get user ID
    const decodedToken = jwtDecode(token) as any;

    fetch(`http://localhost:5000/v1/api/user/${decodedToken.id}`, {
     // Use DELETE method to delete user data
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Clear local storage
        localStorage.removeItem("token"); // Clear token from localStorage
// Log success message
        console.log("Delete Success:", data);
        // Optionally handle UI update

        // Redirect
        window.location.href = "/"; // Redirect to home page
      })
      .catch((error) => {
        console.error("Delete Error:", error); // Log error
      });
  }

  // Handle input change
  function handleInputChange(event: any) { // Function to handle input change in the form
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      // Update form data with new value
      [name]: value,
    }));
  }

  return (
    <>
    {/* Navigation links */}
      <div className="flex justify-center items-center space-x-4 p-4">
        <Link
          href="/profile/orders"
          className="py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          View Orders
        </Link>
        <Link
          href="/profile/customized-cake-request"
          className="py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Customized Cake Request
        </Link>
      </div>

      {/* Profile form */}
      <div className="flex items-center justify-center h-screen mt-10  ">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Profile ({formData.role})
          </h1>
          <form className="mt-4 space-y-4">

             {/* Name input */}
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
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Name"
              />
            </div>

            {/* Email input */}
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
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Email address"
              />
            </div>

             {/* Address input */}
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
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Address"
              />
            </div>

             {/* Province select */}
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
                value={formData.province}
                onChange={handleInputChange}
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
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Phone"
              />
            </div>