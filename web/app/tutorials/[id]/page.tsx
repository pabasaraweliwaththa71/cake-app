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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

 

}
