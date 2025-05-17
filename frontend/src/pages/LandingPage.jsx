import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DBEFF9] to-[#F2F8FD]">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Cards */}
          <div className="space-y-8">
            <Link
              to="/community-health"
              className="group block bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-12 h-12 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-semibold text-[#2C6F85] mb-4">
                  Community Health
                </h2>
                <p className="text-lg text-gray-600">
                  Analyze community health data and predict potential health trends
                </p>
              </div>
            </Link>

            <Link
              to="/hospital-forecast"
              className="group block bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-semibold text-[#2C6F85] mb-4">
                  Hospital Resource
                </h2>
                <p className="text-lg text-gray-600">
                  Forecast resource needs and optimize hospital capacity
                </p>
              </div>
            </Link>
          </div>

          {/* Right Column - Medical Illustration with Floating Text */}
          <div className="relative group">
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Medical Professional"
                className="w-full h-[600px] object-cover rounded-2xl shadow-lg transition-all duration-300 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-12 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h1 className="text-5xl font-bold mb-4">
                  Smart Community Hospital
                </h1>
                <p className="text-2xl">
                  Empowering healthcare through data-driven insights and predictive analytics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#2C6F85] mb-4">Data Analytics</h3>
              <p className="text-lg text-gray-600">
                Advanced analytics to identify health trends and patterns
              </p>
            </div>
          </div>

          <div className="bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#2C6F85] mb-4">Real-time Insights</h3>
              <p className="text-lg text-gray-600">
                Instant access to critical health information and predictions
              </p>
            </div>
          </div>

          <div className="bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#2C6F85] mb-4">Resource Optimization</h3>
              <p className="text-lg text-gray-600">
                Smart allocation of hospital resources for better patient care
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-12 shadow-lg max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-[#2C6F85] mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#2C6F85] mb-3">Predictive Analytics</h3>
                <p className="text-lg text-gray-600">
                  Advanced machine learning models to forecast health trends
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#2C6F85] mb-3">Real-time Monitoring</h3>
                <p className="text-lg text-gray-600">
                  Continuous tracking of community health metrics
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#2C6F85] mb-3">Community Focus</h3>
                <p className="text-lg text-gray-600">
                  Tailored insights for local community health needs
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#2C6F85] mb-3">Resource Planning</h3>
                <p className="text-lg text-gray-600">
                  Smart allocation of hospital resources and staff
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="mt-16 text-center">
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 text-lg text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 