import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HospitalResourcePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [manualInputs, setManualInputs] = useState({
    icuBeds: '',
    oxygenTanks: '',
    medications: ''
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

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
                Upload hospital usage logs with resource consumption data
              </p>
              {isLoading && <div className="mt-4 text-blue-500 font-medium">Processing...</div>}
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

        {/* Resource Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resource Forecast Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">ICU Beds</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Forecast will be generated after analysis
              </div>
              <p className="mt-2 text-sm text-gray-500">Forecast for next 7 days</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Oxygen Supply</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Forecast will be generated after analysis
              </div>
              <p className="mt-2 text-sm text-gray-500">Forecast for next 7 days</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Medications</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-center text-sm text-gray-600">
                Forecast will be generated after analysis
              </div>
              <p className="mt-2 text-sm text-gray-500">Forecast for next 7 days</p>
            </div>
          </div>
        </section>

        {/* Visualization Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resource Demand vs Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">ICU Bed Demand</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Bar chart will be generated after analysis</p>
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Oxygen Supply Demand</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Bar chart will be generated after analysis</p>
              </div>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Medication Demand</h3>
              <div className="h-[300px] bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600">Bar chart will be generated after analysis</p>
              </div>
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
              <p className="text-sm text-gray-600">Oxygen supply may run out in 3 days</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🔴 ICU Bed Alert
              </h3>
              <p className="text-sm text-gray-600">Prepare 10 more ICU beds</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                ℹ️ Medication Alert
              </h3>
              <p className="text-sm text-gray-600">Critical medication stock running low</p>
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
              <p className="text-sm text-gray-600">Allocate more ICU beds in Zone Y</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                💊 Medication Management
              </h3>
              <p className="text-sm text-gray-600">Request additional meds A and B</p>
            </div>
            <div className="bg-[#F5FAFE] rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🏥 Capacity Planning
              </h3>
              <p className="text-sm text-gray-600">Prepare for increased patient load in Emergency Department</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
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
