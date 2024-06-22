"use client";

import { useEffect, useState } from "react";
import useUserData from "@/hook/useUser";

export default function UserOrdersPage() {
    const user = useUserData();
    const [orders, setOrders] = useState([]) as any;
  
    const fetchUserOrders = async () => {
      if (user) {
        fetch(`http://localhost:5000/v1/api/orders/user/${user.id}`)
          .then((response) => response.json())
          .then((data) => setOrders(data))
          .catch((error) => console.error("Error fetching user orders:", error));
      }
    };






}