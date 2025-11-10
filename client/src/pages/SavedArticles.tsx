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

export const SavedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchSavedArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/saved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch saved articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedArticles();
  }, [token]);

  const handleRemove = async (articleId: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/saved/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      alert("Article removed!");
    } catch (err) {
      console.error("Failed to remove article:", err);
      alert("Failed to remove article.");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading saved articles...</p>;

  if (articles.length === 0)
    return <p style={{ padding: "2rem" }}>You haven’t saved any articles yet.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>💾 Your Saved Articles</h1>
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
          <button onClick={() => handleRemove(a.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
