"use client";

import { useEffect, useState } from "react";
import useUserData from "@/hook/useUser";

// Component for displaying user's orders
export default function UserOrdersPage() {
    // Fetch user data using custom hook
    const user = useUserData();
    // State to store the user's orders
    const [orders, setOrders] = useState([]) as any;
  
    // Function to fetch user's orders from the server
    const fetchUserOrders = async () => {
        // Check if user data is available
      if (user) {
        fetch(`http://localhost:5000/v1/api/orders/user/${user.id}`)
          .then((response) => response.json())
          // Update state with fetched data
          .then((data) => setOrders(data))
          .catch((error) => console.error("Error fetching user orders:", error));
      }
    };


    useEffect(() => {
        fetchUserOrders();
      }, [user]);
    
      if (!user) {
        return (
          <div className="text-2xl font-semibold h-screen flex items-center justify-center">
            Please log in to view your orders.
          </div>
        );
      }

      const deleteOrder = async (orderId: string) => {
        try {

        } catch (error) {
            console.error("Error:", error);
          }
        };
}