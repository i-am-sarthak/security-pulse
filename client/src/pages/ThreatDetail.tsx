import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../context/useAuth";
import { formatDate } from "../utils/formatDate";

interface Threat {
  id: number;
  name: string;
  slug: string;
  description: string;
  risk_level: "low" | "medium" | "high" | "critical";
  default_guidance: string;
}

interface Article {
  id: number;
  title: string;
  source: string;
  published_at: string;
  url: string;
}

interface ThreatDetailResponse {
  threat: Threat;
  articles: Article[];
}


export const ThreatDetail = () => {
  const { slug } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ThreatDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreat = async () => {
      try {
        const res = await axios.get(`${API}/api/threats/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch threat details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreat();
  }, [slug, token]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Loading threat intelligence...</p>
      </div>
    );

    if (!data) return null;

    const { threat, articles } = data;

  return (
    <div
      className="
        min-h-screen px-6 py-8 animate-fadeIn
        bg-surface-muted text-charcoal
        dark:bg-navy dark:text-gray-light
      "
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-accent hover:underline"
      >
        ← Back to Threat Center
      </button>

      <h1 className="text-3xl font-bold text-folly dark:text-accent mb-4">
        {threat.name}
      </h1>

      <div className="max-w-3xl space-y-6">
        <section>
          <h3 className="font-semibold mb-2">What is this threat?</h3>
          <p className="opacity-90 leading-relaxed">
            {threat.description}
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Why this matters</h3>
          <p className="opacity-90 leading-relaxed">
            {threat.default_guidance}
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">
            Related Real-World Incidents
          </h3>

          {articles.length === 0 ? (
            <p className="text-sm opacity-70">
              No linked incidents yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {articles.map((a: Article) => (
                <div
                  key={a.id}
                  className="
                    bg-gray-card dark:bg-gray-dark
                    rounded-lg p-4 shadow-sm
                  "
                >
                  <h4 className="font-semibold mb-1">
                    {a.title}
                  </h4>
                  <p className="text-xs opacity-70 mb-2">
                    {a.source} • {formatDate(a.published_at)}
                  </p>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent text-sm font-semibold hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
