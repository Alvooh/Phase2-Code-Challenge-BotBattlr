import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BotCollection from './components /BotCollection';
import YourBotArmy from './components /YourBotArmy';
import BotSpecs from './components /BotSpecs';
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BotCollection />} />
          <Route path="/your-bot-army" element={<YourBotArmy />} />
          <Route path="/bots/:botId" element={<BotSpecs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
