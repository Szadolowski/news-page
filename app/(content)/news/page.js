"use client";

import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

export default function News() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState();

  useEffect(() => {
    async function fatchNews() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8090/news");

      if (!response.ok) {
        setError("Failed to fetch news.");
        setError(false);
      }
      const news = await response.json();
      setIsLoading(false);
      setNews(news);
    }

    fatchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let newsContent;

  if (news) {
    newsContent = <NewsList news={news} />;
  }

  return (
    <>
      <h1>News Page</h1>
      {newsContent}
    </>
  );
}
