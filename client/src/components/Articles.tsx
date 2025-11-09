import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  summary: string;
}

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/articles")
      .then((res) => setArticles(res.data.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <h1>Security Pulse Articles</h1>
        {isAuthenticated && (
          <button onClick={handleLogout} style={{ height: "2rem" }}>
            Logout
          </button>
        )}
      </div>
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
