import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CommunityHealthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DBEEF8] to-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Community Health Forecast</h1>
        
        {/* Upload Section */}
        <section className="bg-[#F5FAFE] rounded-xl p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Community Data</h2>
          <div className="border-2 border-dashed border-blue-500 rounded-lg p-8 text-center transition-all hover:border-green-500 hover:bg-blue-50">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-[#306F84] text-white rounded-lg cursor-pointer transition-colors hover:bg-[#2C6F85]"
            >
              {uploadedFile ? uploadedFile.name : 'Choose CSV or Excel file'}
            </label>
            <p className="mt-4 text-sm text-gray-600">
              Upload survey data with columns like age, location, disease, vaccination status, etc.
            </p>
            {isLoading && <div className="mt-4 text-blue-500 font-medium">Processing...</div>}
          </div>
        </section>

        {/* Summary Stats */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Summary Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Records</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Data will be displayed after analysis
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Regions Covered</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Data will be displayed after analysis
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Age Group Range</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Data will be displayed after analysis
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">% Vaccinated</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Data will be displayed after analysis
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Health Issues</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Data will be displayed after analysis
              </div>
            </div>
          </div>
        </section>

        {/* Data Visualizations */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Data Visualizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Vaccination Gaps</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Bar chart will be generated after analysis</p>
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Issues</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Pie chart will be generated after analysis</p>
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Disease Trends</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Line chart will be generated after analysis</p>
              </div>
            </div>
          </div>
        </section>

        {/* Health Insights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                ⚠️ Disease Outbreaks
              </h3>
              <p className="text-sm text-gray-600">Potential outbreaks will be identified after analysis</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🔴 High-Risk Groups
              </h3>
              <p className="text-sm text-gray-600">High-risk regions and groups will be identified after analysis</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                💡 Recommendations
              </h3>
              <p className="text-sm text-gray-600">Preventative suggestions will be generated after analysis</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="flex justify-center gap-4 mt-12">
          <Link
            to="/hospital-forecast"
            className="px-8 py-4 bg-[#306F84] text-white rounded-lg font-medium transition-all hover:bg-[#2C6F85] hover:-translate-y-0.5"
          >
            Run Hospital Forecast Next
          </Link>
          <Link
            to="/chatbot"
            className="px-8 py-4 bg-[#306F84] text-white rounded-lg font-medium transition-all hover:bg-[#2C6F85] hover:-translate-y-0.5"
          >
            Chat with HealthBot
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CommunityHealthPage;
