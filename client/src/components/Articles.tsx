import { useEffect, useState } from "react";
import axios from "axios";
// import { useAuth } from "../context/useAuth";
// import { useNavigate } from "react-router-dom";
import "../index.css";

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  summary: string;
}

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  // const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/articles")
      .then((res) => setArticles(res.data.data.data))
      .catch((err) => console.error(err));
  }, []);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  return (
    <div className="min-h-screen bg-navy text-gray-light px-6 py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-accent">Security Pulse Articles</h1>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <p className="text-gray-light text-lg">No articles found.</p>
      ) : (
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
              {/* <button className="bg-accent text-navy px-3 py-2 rounded-md font-semibold hover:bg-gray-light transition">
                Save
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
