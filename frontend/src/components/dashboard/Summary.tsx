import React from 'react';

interface SummaryProps {
  summary: string;
}

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700">{summary}</p>
      </div>
    </div>
  );
};

export default Summary;