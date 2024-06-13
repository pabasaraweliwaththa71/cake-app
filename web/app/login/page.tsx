"use client";

export default function Page() {
  // handle form submission
  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());