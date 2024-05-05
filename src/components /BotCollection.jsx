import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotCard from './BotCard';
import SortBar from './SortBar'; // Import the SortBar component

function BotCollection() {
  const [bots, setBots] = useState([]);

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

  return (
    <div>
      <h1>Bot Collection</h1>
      {/* Render the SortBar component */}
      <SortBar onSort={handleSort} />
      <div className="bot-collection">
        {bots.map(bot => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
