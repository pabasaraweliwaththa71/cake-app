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
    
      // Function to handle canceling a custom cake request
      const handleCancelRequest = async (id: string) => {
        try {
          const response = await fetch(
            `http://localhost:5000/v1/api/customCakes/${id}`,
            {
              method: "DELETE",
            }
          );
    
          if (response.ok) {
            alert("Customized cake request canceled successfully");
            fetchUserRequests(); // Refresh the requests list
          } else {
            console.error("Failed to cancel customized cake request");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      // Render a message if there are no requests
      if (requests.length === 0) {
        return (
          <div className="text-2xl font-semibold h-screen flex items-center justify-center">
            You have not made any customized cake requests yet.
          </div>
        );
      }

      return (
        <div className="p-8   min-h-screen">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">
            My Customized Cake Requests
          </h1>

          </div>
  );
}
