// pages/tutorials/[id].tsx

"use client";

import useUserData from "@/hook/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function Page({ params }: { params: { id: string } }) {
  const [tutorial, setTutorial] = useState(null) as any;
  const [loading, setLoading] = useState(true);

  const userData = useUserData();

  useEffect(() => {
    if (params.id) {
      fetch(`http://localhost:5000/v1/api/tutorials/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setTutorial(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tutorial:", error);
          setLoading(false);
        });
    }
  }, [params.id]);
  const handleDelete = () => {
    fetch(`http://localhost:5000/v1/api/tutorials/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Tutorial deleted successfully");
          alert("Tutorial deleted successfully");
          // Redirect
          window.location.href = "/tutorials";
        } else {
          alert("Failed to delete the Tutorial");
          console.error("Failed to delete the Tutorial");
        }
      })
      .catch((error) => console.error("Error deleting Tutorial:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }
  return (
    <div className="p-8   min-h-screen">
      <div className="flex justify-between items-center ">
        <Link
          href="/tutorials"
          className="text-orange-700 hover:text-indigo-800"
        >
          Back to Tutorials
        </Link>
        {userData.role === "admin" && (
          <>
            <div className="flex justify-end gap-1 items-center">
              <Link
                href={`/tutorials/edit/${tutorial._id}`}
                className="py-2 px-4 bg-yellow-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this tutorial?"
                    )
                  ) {
                    handleDelete;
                  }
                }}
}
