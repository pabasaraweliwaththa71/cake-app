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
  return (
    <div className="flex flex-col items-center justify-center   py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Upcoming Workshops
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop: any) => (
          <div key={workshop._id} className="p-6 bg-white rounded-lg shadow-md">
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src={workshop.image}
              alt={workshop.title}
            />
export default WorkshopList;
