"use client";

import { useState } from "react";

export default function CreateTutorialPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [urlError, setUrlError] = useState("");

  const validateUrl = (url: string) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate the URL
    if (!validateUrl(url)) {
      setUrlError("Please enter a valid YouTube URL.");
      setLoading(false);
      return;
    } else {
      setUrlError("");
    }

    const tutorialData = {
      title,
      description,
      url,
      published,
    };
