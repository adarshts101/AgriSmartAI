import React from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import MarketCard from "./components/MarketCard";
import GuidesCard from "./components/GuidesCard";
import ChatbotCard from "./components/ChatbotCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <WeatherCard />
        <MarketCard />
        <GuidesCard />
        <ChatbotCard />
      </div>
    </div>
  );
}
