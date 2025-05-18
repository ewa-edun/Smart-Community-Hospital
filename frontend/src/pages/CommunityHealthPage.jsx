import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Charts from "../components/CommunityHealth/Charts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { askGemini } from '../config/gemini'; // Adjust path if needed
import Suggestions from '../components/HospitalForecast/Suggestions'; // or CommunityHealth/Suggestions

function YourBarChartComponent({ data }) {
  // Convert object to array for recharts
  const chartData = Object.entries(data).map(([key, value]) => ({ name: key, value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3182ce" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CommunityHealthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [insights, setInsights] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000";

  const handleFileChange = (e) =>  setUploadedFile(e.target.files[0]);

 const handleUpload = async () => {
    if (!uploadedFile) {
     alert('Please select a file first.');
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const data = await res.json();
       setChartData(data.chart);
       setStats(data.stats);
       setInsights(data.stats?.insights || null);

       // Generate prompt for Gemini
  const prompt = `Given these community health statistics: ${JSON.stringify(data.stats)}, generate actionable suggestions and critical alerts for improving community health outcomes. Focus on vaccination gaps, disease outbreaks, high-risk groups, and preventative recommendations. Respond in clear, concise bullet points.`;
  try {
    setSuggestionsLoading(true);
    // Call Gemini API
    const geminiResponse = await askGemini(prompt);
    // You can split by lines or parse as needed
    setAiSuggestions(geminiResponse.split('\n').filter(Boolean));
  } catch {
    setAiSuggestions(["Could not fetch AI suggestions."]);
    setSuggestionsLoading(false);
  }

      alert('File analyzed successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing file: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${BACKEND_URL}/download/analysis_report.xlsx`;
    link.setAttribute('download', 'analysis_report.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />

            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-[#306F84] text-white rounded-lg cursor-pointer transition-colors hover:bg-[#2C6F85]"
            >
              {uploadedFile ? uploadedFile.name : 'Choose CSV or Excel file'}
            </label>

            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={isLoading || !uploadedFile}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing...' : 'Upload & Analyze'}
              </button>
            </div>

            {isLoading && <div className="mt-4 text-blue-500 font-medium">Processing...</div>}

            <p className="mt-4 text-sm text-gray-600">
              Upload survey data with columns age, gender, location, disease, vaccination_status, symptoms, access_to_hospital, hospital_visits_last_year.
            </p>
              {/* Charts */}
        {chartData && <Charts chartData={chartData} />}

          {/* Download Section */}
          <div className="mt-6">
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Download Analysis Report
            </button>
          </div>
          </div>
        </section>


       {/* Updated Summary Stats section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Summary Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Records</h3>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              {stats ? (
                <span className="text-lg font-bold text-blue-700">{stats.total_records}</span>
              ) : (
                <span className="text-sm text-gray-600">Data will be displayed after analysis</span>
              )}
            </div>
          </div>
          
          <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">% Vaccinated</h3>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              {stats ? (
                <span className="text-lg font-bold text-blue-700">
                  {stats.vaccination_rate ? stats.vaccination_rate.toFixed(1) + '%' : 'N/A'}
                </span>
              ) : (
                <span className="text-sm text-gray-600">Data will be displayed after analysis</span>
              )}
            </div>
          </div>

            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Health Issues</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                {insights ? (
                  <span className="text-lg font-bold text-blue-700">
                    {insights.disease_outbreaks || 'N/A'}
                  </span>
                ) : (
                  <span className="text-sm text-gray-600">Data will be displayed after analysis</span>
                )}
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
                {stats?.vaccination_gaps ? (
                  <YourBarChartComponent data={stats.vaccination_gaps} />
                ) : (
                  <p className="text-sm text-gray-600">No vaccination data available</p>
                )}
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Issues</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                {stats?.nutrition_issues ? (
                  <YourBarChartComponent data={stats.nutrition_issues} />
                ) : (
                  <p className="text-sm text-gray-600">No nutrition data available</p>
                )}
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Disease Trends</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                {stats?.disease_trends ? (
                  <YourBarChartComponent data={stats.disease_trends} />
                ) : (
                  <p className="text-sm text-gray-600">No disease trend data available</p>
                )}
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
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
               {insights?.disease_outbreaks || 'Preventative suggestions will be generated after analysis'}
              </p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🔴 High-Risk Groups
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
               {insights?.high_risk_groups || 'High-risk regions and groups will be identified after analysis'}
              </p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                💡 Recommendations
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
              {insights?.recommendations || 'Preventative suggestions will be generated after analysis'}
             </p>
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
