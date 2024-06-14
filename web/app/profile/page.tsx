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