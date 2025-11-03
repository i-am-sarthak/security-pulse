import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  summary: string;
}

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/articles")
      .then((res) => setArticles(res.data.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Security Pulse Articles</h1>
      {articles.map((a) => (
        <div key={a.id} style={{ marginBottom: "1rem" }}>
          <h2>{a.title}</h2>
          <p>
            <strong>Source:</strong> {a.source}
          </p>
          <p>
            <strong>Date:</strong> {a.published_at}
          </p>
          <p>{a.summary}</p>
        </div>
      ))}
    </div>
  );
};
