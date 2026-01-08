import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { API } from "../api";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  summary: string;
  url: string;
}

interface DashboardProps {
    readOnly?: boolean;
}

export const Dashboard = ({ readOnly = false }: DashboardProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("latest");
  const limit = 12;
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API}/api/articles?page=${page}&limit=${limit}&sort=${sort}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(res.data.data.data);
        setTotalPages(res.data.data.totalPages);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [token, page, sort]);

  const handleSave = async (articleId: number) => {
    try {
      const res = await axios.post(
        `${API}/api/saved/${articleId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Article saved");
    } catch (err) {
      console.error("Failed to save article:", err);
      toast.error("Could not save article");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading articles...</p>;

  if (articles.length === 0)
    return <p style={{ padding: "2rem" }}>No articles available.</p>;

  return (
    <div className="min-h-screen bg-navy text-gray-light px-6 py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-accent">Your Dashboard</h1>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="bg-gray-dark text-gray-light border border-gray-light rounded-md px-3 py-2"
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

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
                className="bg-gray-dark rounded-xl shadow-md hover:shadow-accent/30 p-5 transition-transform duration-200 hover:scale-[1.02] flex flex-col"
              >
                <h2 className="text-xl font-semibold text-accent mb-2">{a.title}</h2>
                <p className="text-gray-light text-sm mb-1">
                  <strong>Source:</strong> {a.source}
                </p>
                <p className="text-gray-light text-sm mb-3">
                  <strong>Date:</strong> {formatDate(a.published_at)}
                </p>
                <p className="text-gray-light mb-4 text-justify leading-relaxed hyphens-auto">{a.summary}</p>
                <div className="flex justify-between items-center mt-auto">
                  {readOnly ? (
                    <div className="relative group">
                      <button
                        onClick={() => navigate("/login")}
                        className="bg-gray-600 text-navy px-3 py-2 rounded-md font-semibold
                                  cursor-pointer group-hover:bg-gray-500 transition"
                      >
                        Save
                      </button>

                      {/* Custom Tooltip */}
                      <span
                        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                                  bg-gray-800 text-gray-100 text-xs rounded-md px-2 py-1
                                  opacity-0 group-hover:opacity-100 transition
                                  whitespace-nowrap shadow-lg"
                      >
                        Login to save articles
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSave(a.id)}
                      className="bg-accent text-navy px-3 py-2 rounded-md font-semibold hover:bg-gray-light transition"
                    >
                      Save
                    </button>
                  )}

                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold hover:underline cursor-pointer"
                  >
                    Read more →
                  </a>
                </div>
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
