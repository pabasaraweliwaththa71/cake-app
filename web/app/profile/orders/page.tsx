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
         // Make a GET request to fetch orders of the current user
        fetch(`http://localhost:5000/v1/api/orders/user/${user.id}`)
          .then((response) => response.json())
          // Update state with fetched data
          .then((data) => setOrders(data))
          .catch((error) => console.error("Error fetching user orders:", error)); // Log any errors
      }
    };

// useEffect to fetch user orders when the component mounts or user data changes
    useEffect(() => {
        // Fetch orders when the component mounts or when user changes
        fetchUserOrders(); // Dependency array ensures this runs when `user` changes
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
            // Make a DELETE request to delete the specified order
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
                console.error("Failed to delete order"); // Log error if deletion fails
              }
        } catch (error) {
            console.error("Error:", error); // Log any errors that occur during the fetch
          }
        };

        // Render the list of user's orders
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

                {orders.map((order: any) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">
                {order.cakes.map((cake: any) => (
                  <div
                    className="bg-slate-200 p-1 m-1 rounded-md truncate"
                    key={cake._id}
                  >
                    {cake.name}
                  </div>
                ))}



            );
}