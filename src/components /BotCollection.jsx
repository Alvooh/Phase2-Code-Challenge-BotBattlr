// BotCollection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotCard from './BotCard';
import SortBar from './SortBar'; // Import the SortBar component

function BotCollection() {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/bots')
      .then(response => {
        setBots(response.data);
      })
      .catch(error => {
        console.error('Error fetching bots: ', error);
      });
  }, []);

  // Sorting logic
  const handleSort = (criteria) => {
    const sortedBots = [...bots].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setBots(sortedBots);
  };

  const handleEnlist = (botId) => {
    const botToEnlist = bots.find(bot => bot.id === botId);
    setEnlistedBots(prevBots => [...prevBots, botToEnlist]);
  };

  // Function to handle bot deletion
  const handleDelete = (botId) => {
    axios.delete(`http://localhost:3000/bots/${botId}`)
      .then(response => {
        setBots(prevBots => prevBots.filter(bot => bot.id !== botId));
        alert('Bot deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting bot: ', error);
      });
  };

  return (
    <div>
      <h1>Bot Collection</h1>
      <h2>Enlisted Bots</h2>
      <div className="enlisted-bots">
        {enlistedBots.map(bot => (
          <div key={bot.id}>
            <p>{bot.name}</p>
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p> {bot.health}</p>
            <p>{bot.damage}</p>
            <p>{bot.armor}</p>
            <button onClick={() => setEnlistedBots(prevBots => prevBots.filter(item => item.id !== bot.id))}>Remove</button>
          </div>
        ))}
      </div>
      {/* Render the SortBar component */}
      <SortBar onSort={handleSort} />
      <div className="bot-collection">
        {bots.map(bot => (
          <BotCard key={bot.id} bot={bot} onEnlist={() => handleEnlist(bot.id)} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
