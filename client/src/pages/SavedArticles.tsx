import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { API } from "../api";
import { formatDate } from "../utils/formatDate";

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
      const res = await axios.get(`${API}/api/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data.data);
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
      await axios.delete(`${API}/api/saved/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      alert("Article removed!");
    } catch (err) {
      console.error("Failed to remove article:", err);
      alert("Failed to remove article.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-navy text-gray-light flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading saved articles...</p>
      </div>
    );

  if (articles.length === 0)
    return (
      <div className="min-h-screen bg-navy text-gray-light flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-accent mb-4">
          No Saved Articles
        </h1>
        <p className="text-gray-light text-lg">
          You haven’t saved any articles yet. Explore the dashboard to find some!
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-navy text-gray-light px-6 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-accent mb-8">Your Saved Articles</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <div
            key={a.id}
            className="bg-gray-dark rounded-xl shadow-md hover:shadow-accent/30 p-5 transition-transform duration-200 hover:scale-[1.02]"
          >
            <h2 className="text-xl font-semibold text-accent mb-2">{a.title}</h2>
            <p className="text-gray-light text-sm mb-1">
              <strong>Source:</strong> {a.source}
            </p>
            <p className="text-gray-light text-sm mb-3">
              <strong>Date:</strong> {formatDate(a.published_at)}
            </p>
            <p className="text-gray-light mb-4">{a.summary}</p>
            <button
              onClick={() => window.confirm("Remove this article?") && handleRemove(a.id)}
              className="bg-red-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
