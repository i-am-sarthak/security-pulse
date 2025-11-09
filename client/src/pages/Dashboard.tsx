import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  summary: string;
}

export const Dashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/articles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(res.data.data.data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [token]);

  const handleSave = async (articleId: number) => {
    try {
      await axios.post(
        `http://localhost:4000/api/saved/${articleId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Article saved!");
    } catch (err) {
      console.error("Failed to save article:", err);
      alert("Failed to save article");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading articles...</p>;

  if (articles.length === 0)
    return <p style={{ padding: "2rem" }}>No articles available.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📰 Security Pulse Dashboard</h1>
      {articles.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h2>{a.title}</h2>
          <p>
            <strong>Source:</strong> {a.source}
          </p>
          <p>
            <strong>Date:</strong> {a.published_at}
          </p>
          <p>{a.summary}</p>
          <button onClick={() => handleSave(a.id)}>Save</button>
        </div>
      ))}
    </div>
  );
};
