import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { API } from "../api";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  summary: string;
  url: string;
}

export const SavedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");
  const { token } = useAuth();

  const fetchSavedArticles = async () => {
    try {
      const res = await axios.get(`${API}/api/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let list = res.data.data;
      if (sort === "latest") {
        list = [...list].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      }
      if (sort === "oldest") {
        list = [...list].sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
      }

      setArticles(list);
    } catch (err) {
      console.error("Failed to fetch saved articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedArticles();
  }, [token, sort]);

  const handleRemove = async (articleId: number) => {
    try {
      await axios.delete(`${API}/api/saved/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      toast.success("Article removed!");
    } catch (err) {
      console.error("Failed to remove article:", err);
      toast.error("Could not remove article.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-surface-muted text-charcoal dark:bg-navy dark:text-gray-light flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading saved articles...</p>
      </div>
    );

  if (articles.length === 0)
    return (
      <div className="min-h-screen bg-surface-muted text-charcoal dark:bg-navy dark:text-gray-light flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-accent mb-4">
          No Saved Articles
        </h1>
        <p className="text-gray-light text-lg">
          You haven’t saved any articles yet. Explore the dashboard to find some!
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-surface-muted text-charcoal dark:bg-navy dark:text-gray-light transition-colors px-6 py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-accent-light dark:text-accent">Your Saved Articles</h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            bg-surface-muted text-charcoal border border-accent-light
            dark:bg-gray-dark dark:text-gray-light dark:border-accent
            rounded-md px-3 py-2
            transition-colors
          "
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <div
        className="
          bg-warm/20
          dark:bg-transparent
          rounded-2xl
          p-6
        "
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.id}
              className="
                rounded-xl shadow-md p-5 flex flex-col
                transition-transform duration-200 hover:scale-[1.02]

                bg-surface-muted text-charcoal
                dark:bg-gray-dark dark:text-gray-light

                hover:shadow-accent-light/30
                dark:hover:shadow-accent/30
              "
            >
              <h2 className="text-xl font-semibold text-accent-light dark:text-accent mb-2">{a.title}</h2>
              <p className="text-gray-muted dark:text-gray-light text-sm mb-1">
                <strong>Source:</strong> {a.source}
              </p>
              <p className="text-gray-muted dark:text-gray-light text-sm mb-3">
                <strong>Date:</strong> {formatDate(a.published_at)}
              </p>
              <p className="text-gray-muted dark:text-gray-light mb-4 text-justify leading-relaxed hyphens-auto">{a.summary}</p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => window.confirm("Remove this article?") && handleRemove(a.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Remove
                </button>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-light dark:text-accent font-semibold hover:underline cursor-pointer"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
