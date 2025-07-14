import { useState } from "react";
import { AnalysisData } from "../types";
import sampleData from "../data/sampleData";

// Conditionally fetch data from API or use sample
const fetchAnalysisData = async (url: string): Promise<AnalysisData> => {
  if (url === "https://example.com") {
    // Simulate delay for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleData);
      }, 1000);
    });
  }

  const apiUrl = `https://web-doctor-playwright.onrender.com/analyze?url=${encodeURIComponent(url)}`;




  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const useAnalysis = () => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);

  const analyzeUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchAnalysisData(url);
      setData(result);
      setAnalyzedUrl(url);
    } catch (err) {
      setError("Failed to analyze website. Please try again.");
      console.error("Error analyzing website:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    analyzedUrl,
    analyzeUrl,
  };
};
