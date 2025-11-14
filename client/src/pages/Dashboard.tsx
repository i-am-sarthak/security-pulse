import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { API } from "../api";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const { token } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API}/api/articles?page=${page}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(res.data.data.data);
        setTotalPages(res.data.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [token, page]);

  const handleSave = async (articleId: number) => {
    try {
      await axios.post(
        `${API}/api/saved/${articleId}`,
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
    <div className="min-h-screen bg-navy text-gray-light px-6 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-accent mb-8">Your Dashboard</h1>

      {loading ? (
        <p className="text-gray-light text-lg">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-light text-lg">No articles available.</p>
      ) : (
        <>
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
                  <strong>Date:</strong> {a.published_at}
                </p>
                <p className="text-gray-light mb-4">{a.summary}</p>
                <button
                  onClick={() => handleSave(a.id)}
                  className="bg-accent text-navy px-3 py-2 rounded-md font-semibold hover:bg-gray-light transition"
                >
                  Save
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-dark text-gray-light rounded-lg border border-accent disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-accent font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-dark text-gray-light rounded-lg border border-accent disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
