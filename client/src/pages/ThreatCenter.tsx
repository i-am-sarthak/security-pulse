import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

interface Threat {
  id: number;
  name: string;
  slug: string;
  description: string;
  risk_level: "low" | "medium" | "high" | "critical";
  default_guidance: string;
}

export const ThreatCenter = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const res = await axios.get(`${API}/api/threats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setThreats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch threats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Loading threat intelligence...</p>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen px-6 py-8 animate-fadeIn
        bg-surface-muted text-charcoal
        dark:bg-navy dark:text-gray-light
      "
    >
      <h1 className="text-3xl font-bold text-folly dark:text-accent mb-6">
        Threat Center
      </h1>

      <p className="mb-8 text-sm opacity-80 max-w-2xl">
        A high-level view of the most common cyber threats, their impact, and how users can stay protected.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {threats.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/threat-center/${t.slug}`)}
            className="
              cursor-pointer rounded-xl p-5 shadow-md
              transition-transform duration-200 hover:scale-[1.02]
              bg-gray-card text-gray-muted
              dark:bg-gray-dark dark:text-gray-light
            "
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-folly dark:text-accent">
                {t.name}
              </h2>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${getSeverityBadge(
                  t.risk_level
                )}`}
              >
                {t.risk_level.toUpperCase()}
              </span>
            </div>

            <p className="text-sm leading-relaxed line-clamp-4">
              {t.description}
            </p>

            <div className="mt-4 text-xs text-accent font-semibold">
              Learn more →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getSeverityBadge = (level: string) => {
  switch (level) {
    case "critical":
      return "bg-red-700 text-white";
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-orange-400 text-navy";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};
