"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]) as any;

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/workshops")
      .then((response) => response.json())
      .then((data) => setWorkshops(data))
      .catch((error) => console.error("Error fetching workshops:", error));
  }, []);
export default WorkshopList;
