import React, { useState } from 'react';
import { useAnalysis } from '../hooks/useAnalysis';
import UrlForm from '../components/dashboard/UrlForm';
import Summary from '../components/dashboard/Summary';
import LighthouseScore from '../components/dashboard/LighthouseScore';
import TrackingProviderList from '../components/dashboard/TrackingProviderList';
import CookieList from '../components/dashboard/CookieList';
import JavaScriptList from '../components/dashboard/JavaScriptList';
import SuggestionsList from '../components/dashboard/SuggestionsList';

const DashboardPage: React.FC = () => {
  const { data, isLoading, analyzeUrl, analyzedUrl } = useAnalysis();
  const [showDemo, setShowDemo] = useState(false);

  const handleAnalyze = (url: string) => {
    analyzeUrl(url);
  };

  const loadDemoData = () => {
    setShowDemo(true);
    analyzeUrl('https://example.com');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Website Tracking Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Analyze any website to uncover tracking elements and privacy concerns.
          </p>
        </div>

        <div className="space-y-6">
          <UrlForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          
          {!data && !isLoading && !showDemo && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 mb-4">
                Enter a website URL above to start analyzing or see a demo of the tool's capabilities.
              </p>
              <button
                onClick={loadDemoData}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                View Demo Analysis
              </button>
            </div>
          )}

          {isLoading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-xl font-medium text-gray-800">Analyzing website...</p>
                <p className="text-gray-500 mt-2">This may take a few moments</p>
              </div>
            </div>
          )}

          {data && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Analysis Results for: <span className="text-blue-600">{analyzedUrl}</span>
                </h2>
              </div>

              <Summary summary={data.summarizer} />
              <LighthouseScore lighthouse={data.lighthouse} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrackingProviderList providers={data.tracking_providers} />
                <JavaScriptList javascripts={data.tracking_javascript} />
              </div>
              
              <CookieList cookies={data.tracking_cookies} />
              <SuggestionsList suggestions={data.suggestions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;