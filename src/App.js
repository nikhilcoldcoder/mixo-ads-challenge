import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CampaignDetails from "./pages/CampaignDetails";

function App() {
  return (
   <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/campaign/:id" element={<CampaignDetails />} />
    </Routes>

  );
}

export default App;
