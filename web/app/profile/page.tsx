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