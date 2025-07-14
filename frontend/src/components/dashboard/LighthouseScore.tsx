import React from "react";

interface Lighthouse {
  performance: number;
  accessibility: number;
  best_practices: number;
  seo: number;
}

interface LighthouseScoreProps {
  lighthouse: Lighthouse;
  url: string;
}

const scoreLabels: Record<string, string> = {
  performance: "Performance",
  accessibility: "Accessibility",
  best_practices: "Best Practices",
  seo: "SEO",
};

const scoreKeys = [
  "performance",
  "accessibility",
  "best_practices",
  "seo",
] as const;

const LighthouseScore: React.FC<LighthouseScoreProps> = ({
  lighthouse = {
    performance: 75,
    accessibility: 85,
    best_practices: 92,
    seo: 88,
  },
  url = "",
}) => {
  // Calculate overall as the average of the other scores
  const values = scoreKeys.map((k) => lighthouse[k] || 0);
  const overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

  const getArc = (score: number) => {
    const r = 90;
    const c = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(score, 100)) / 100;
    return {
      dash: `${pct * c} ${(1 - pct) * c}`,
      c,
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-50 border-green-200";
    if (score >= 50) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getOverallStatus = (score: number) => {
    if (score >= 90)
      return { emoji: "🎉", text: "Excellent", color: "text-green-600" };
    if (score >= 70)
      return { emoji: "👍", text: "Good", color: "text-blue-600" };
    if (score >= 50)
      return { emoji: "👌", text: "Fair", color: "text-yellow-600" };
    return { emoji: "👎", text: "Needs Work", color: "text-red-600" };
  };

  const status = getOverallStatus(overall);

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
      {/* Header */}
      <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Lighthouse Analysis
            </h2>
            <p className="max-w-md text-sm font-medium text-blue-100 truncate">
              {url}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Overall Score Circle */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                className="transform -rotate-90"
              >
                {/* Background circle */}
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  strokeWidth="20"
                  fill="none"
                  className="stroke-gray-200"
                />
                {/* Foreground circle with gradient */}
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgb(37, 99, 235)" />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  strokeWidth="20"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeDasharray={getArc(overall).dash}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    animation: "drawCircle 2s ease-out forwards",
                  }}
                />
              </svg>

              {/* Score text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-1 text-5xl font-bold text-gray-800">
                  {overall}
                </div>
                <div className="text-lg font-medium text-gray-500">/100</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">
                Overall Score
              </h3>
              <div
                className={`flex items-center justify-center gap-2 ${status.color} font-semibold text-lg`}
              >
                <span className="text-2xl">{status.emoji}</span>
                <span>{status.text}</span>
              </div>
            </div>
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {scoreKeys.map((key, index) => (
              <div
                key={key}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getScoreBg(
                  lighthouse[key]
                )}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "slideIn 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                    {scoreLabels[key]}
                  </h4>
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                    {key === "performance" && "⚡"}
                    {key === "accessibility" && "♿"}
                    {key === "best_practices" && "🛡️"}
                    {key === "seo" && "🔍"}
                  </div>
                </div>

                <div className="flex items-end gap-3">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(
                      lighthouse[key]
                    )}`}
                  >
                    {lighthouse[key]}
                  </div>
                  <div className="mb-1 font-medium text-gray-500">/100</div>
                </div>

                {/* Mini progress bar */}
                <div className="w-full h-2 mt-3 bg-gray-200 rounded-full">
                  <div
                    className="h-2 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{
                      width: `${lighthouse[key]}%`,
                      animationDelay: `${index * 0.2 + 0.5}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="p-6 mt-8 border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <h3 className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-800">
            <span className="text-blue-600">💡</span>
            Performance Insights
          </h3>
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="font-semibold text-gray-700">Avg Score</div>
              <div className="text-xl font-bold text-blue-600">{overall}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">Best Metric</div>
              <div className="text-xl font-bold text-green-600">
                {Math.max(...values)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">Needs Work</div>
              <div className="text-xl font-bold text-red-600">
                {Math.min(...values)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">Range</div>
              <div className="text-xl font-bold text-gray-600">
                {Math.max(...values) - Math.min(...values)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 ${getArc(100).c};
          }
          to {
            stroke-dasharray: ${getArc(overall).dash};
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LighthouseScore;
