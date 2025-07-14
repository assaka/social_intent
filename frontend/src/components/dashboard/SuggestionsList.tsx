import React from 'react';

interface SuggestionsListProps {
  suggestions: string[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
        <p className="text-gray-500">No recommendations available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3">
              {index + 1}
            </span>
            <span className="text-gray-700">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;