import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import TalkingAvatar from "./components/avatars/TalkingAvatar";
import TextToSpeechAvatar from "./components/avatars/TextToSpeechAvatar";
import AdvancedAvatar from "./components/avatars/AdvancedAvatar";
import DIDVideoGenerator from "./components/avatars/DIDVideoGenerator";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<TalkingAvatar />} />
          <Route path="/speech" element={<TextToSpeechAvatar />} />
          <Route path="/advanced" element={<AdvancedAvatar />} />
          <Route path="/video" element={<DIDVideoGenerator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;