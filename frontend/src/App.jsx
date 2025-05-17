// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CommunityHealthPage from "./pages/CommunityHealthPage";
import HospitalResourcePage from "./pages/HospitalResourcePage";
import ChatbotPage from "./pages/ChatbotPage";
import ChatbotButton from "./components/ChatbotButton";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/community-health" element={<CommunityHealthPage />} />
          <Route path="/hospital-forecast" element={<HospitalResourcePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
        <ChatbotButton />
      </div>
    </Router>
  );
}

export default App;
