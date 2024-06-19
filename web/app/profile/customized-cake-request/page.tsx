"use client";

import { useEffect, useState } from "react";
import useUserData from "@/hook/useUser";

// Component for displaying user's custom cake requests
export default function UserCustomCakeRequests() {
    // Fetch user data using custom hook
    const user = useUserData();
    // State to store the custom cake requests
    const [requests, setRequests] = useState([]);
  
    // Function to fetch user's custom cake requests from the server
    const fetchUserRequests = async () => {
      if (user.id) { // Check if user ID is available
        fetch(`http://localhost:5000/v1/api/customCakes/user/${user.id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setRequests(data); // Update state with fetched data
          })
          .catch((error) =>
            console.error("Error fetching user requests:", error)
          );
      }
    };

    // useEffect to fetch user requests when the component mounts or user data changes
    useEffect(() => {
        fetchUserRequests();
      }, [user]);
    
      // Render a message if the user is not logged in
      if (!user) {
        return (
          <div className="text-2xl font-semibold h-screen flex items-center justify-center">
            Please log in to view your customized cake requests.
          </div>
        );
      }
    