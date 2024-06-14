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
          errors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
        return errors;
      }