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

// useEffect to fetch user orders when the component mounts or user data changes
    useEffect(() => {
        fetchUserOrders();
      }, [user]);
    
      // Render a message if the user is not logged in
      if (!user) {
        return (
          <div className="text-2xl font-semibold h-screen flex items-center justify-center">
            Please log in to view your orders.
          </div>
        );
      }

      // Function to handle deleting an order
      const deleteOrder = async (orderId: string) => {
        try {
            const response = await fetch(
                `http://localhost:5000/v1/api/orders/${orderId}`,
                {
                  method: "DELETE",
                }
              );
        
              if (response.ok) {
                alert("Order deleted successfully");
                fetchUserOrders();// Refresh the orders list
              } else {
                console.error("Failed to delete order");
              }
        } catch (error) {
            console.error("Error:", error);
          }
        };

        return (
            <div className="p-8   min-h-screen">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h1>
              <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2">Items</th>
                    <th className="py-2 px-4 text-sm border-b-2">Q.</th>
                    <th className="py-2 px-4 text-sm border-b-2">Price(Rs)</th>
                    <th className="py-2 px-4 text-sm border-b-2">Date</th>
                    <th className="py-2 px-4 text-sm border-b-2">Address</th>
                    <th className="py-2 px-4 text-sm border-b-2">Delivery</th>
                    <th className="py-2 px-4 border-b-2">Status</th>
                    <th className="py-2 px-4 border-b-2">Actions</th>
                  </tr>
                </thead>
                <tbody>





            );
}