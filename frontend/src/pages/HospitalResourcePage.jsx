import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { askGemini } from '../config/gemini'; // Adjust path if needed
import Suggestions from '../components/HospitalForecast/Suggestions'; 

function HospitalBarChart({ data, label }) {
  if (!data) return null;
  const chartData = Object.entries(data).map(([key, value]) => ({ name: key, value }));
  return (
    <div className="my-4">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
        {/* You can use recharts or any chart lib here */}
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </div>
    </div>
  );
}

const HospitalResourcePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [manualInputs, setManualInputs] = useState({
    icuBeds: '',
    oxygenTanks: '',
    medications: ''
  });

  const handleFileChange = (e) => setUploadedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!uploadedFile) {
      alert('Please select a file first.');
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch("http://localhost:5000/hospital-analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const data = await res.json();
      setChartData(data.chart);
      setStats(data.stats);

      // Generate prompt for Gemini
  const prompt = `Given these hospital stats: ${JSON.stringify(data.stats)}, generate actionable suggestions and critical alerts for hospital resource management with keys "oxygen_alert", "icu_alert", "medication_alert", "allocation_suggestion", "medication_suggestion", "capacity_suggestion", each containing a short actionable suggestion or alert. Respond in clear, concise bullet points. `;
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
    link.href = 'http://localhost:5000/download/hospital_analysis_report.xlsx';
    link.setAttribute('download', 'hospital_analysis_report.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
 const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DBEEF8] to-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Hospital Resource Forecast</h1>

            {/* Data Input Section */}
        <section className="bg-[#F5FAFE] rounded-xl p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resource Data Input</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-dashed border-blue-500 rounded-lg p-8 text-center transition-all hover:border-green-500 hover:bg-blue-50">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Usage Logs</h3>
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
               <p className="mt-4 text-sm text-gray-600">
                Upload hospital usage logs with resource consumption data
              </p>
            </div>
            {isLoading && <div className="mt-4 text-blue-500 font-medium">Processing...</div>}
            <div className="mt-6">
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Download Analysis Report
              </button>
            </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Current Resource Levels</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="icuBeds" className="block text-gray-700 font-medium mb-2">
                    ICU Beds Available
                  </label>
                  <input
                    type="number"
                    id="icuBeds"
                    name="icuBeds"
                    value={manualInputs.icuBeds}
                    onChange={handleManualInputChange}
                    placeholder="Enter number of ICU beds"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="oxygenTanks" className="block text-gray-700 font-medium mb-2">
                    Oxygen Tanks Available
                  </label>
                  <input
                    type="number"
                    id="oxygenTanks"
                    name="oxygenTanks"
                    value={manualInputs.oxygenTanks}
                    onChange={handleManualInputChange}
                    placeholder="Enter number of oxygen tanks"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="medications" className="block text-gray-700 font-medium mb-2">
                    Critical Medications Available
                  </label>
                  <input
                    type="number"
                    id="medications"
                    name="medications"
                    value={manualInputs.medications}
                    onChange={handleManualInputChange}
                    placeholder="Enter number of medication units"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Show chart and stats */}
        {chartData && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">ICU Bed Usage Chart</h2>
            <img src={`data:image/png;base64,${chartData}`} alt="ICU Bed Usage Chart" className="border rounded shadow mx-auto" />
          </div>
        )}

        {/* Resource Forecast Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resource Forecast Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">ICU Beds</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-lg text-blue-700">
                 {stats && stats.icu_beds_used != null ? stats.icu_beds_used : 'N/A'}
              </div>
              <p className="mt-2 text-sm text-gray-500">Forecast for next 7 days</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Oxygen Supply</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-lg text-blue-700">
                 {stats && stats.oxygen_used != null ? stats.oxygen_used : 'N/A'}
              </div>
              <p className="mt-2 text-sm text-gray-500">Forecast for next 7 days</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Medications</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-lg text-blue-700">
                 {stats && stats.medications_used != null ? stats.medications_used : 'N/A'}
              </div>
              <p className="mt-2 text-sm text-gray-500">Forecast for next 7 days</p>
            </div>
          </div>
        </section>

        {/* Critical Resource Alerts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Critical Resource Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                ⚠️ Oxygen Supply Alert
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
                {stats?.alerts?.oxygen || 'Oxygen supply alert will be generated after analysis'}
              </p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🔴 ICU Bed Alert
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
                {stats?.alerts?.icu || 'ICU bed alert will be generated after analysis'}
              </p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                ℹ️ Medication Alert
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
                {stats?.alerts?.medications || 'Medication alert will be generated after analysis'}
              </p>
            </div>
          </div>
        </section>

        {/* Actionable Suggestions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Actionable Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                📋 Resource Allocation
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
                {stats?.suggestions?.allocation || 'Resource allocation suggestions will be generated after analysis'}
              </p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                💊 Medication Management
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
                {stats?.suggestions?.medications || 'Medication management suggestions will be generated after analysis'}
              </p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🏥 Capacity Planning
              </h3>
              <Suggestions suggestions={aiSuggestions} loading={suggestionsLoading} />
              <p className="text-sm text-gray-600">
                {stats?.suggestions?.capacity || 'Capacity planning suggestions will be generated after analysis'}
              </p>
            </div>
          </div>
        </section>

        <section className="flex justify-center mt-12">
          <Link
            to="/chatbot"
            className="px-8 py-4 bg-[#306F84] text-white rounded-lg font-medium transition-all hover:bg-[#2C6F85] hover:-translate-y-0.5"
          >
            Need help? Chat with our Smart Health Assistant
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HospitalResourcePage;
