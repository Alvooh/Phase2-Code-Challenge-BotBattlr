import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotCard from './BotCard';
import SortBar from './SortBar'; 

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
      <h1>Alvin's Bot Collection</h1>
     
      <div className="enlisted-bots">
      <h2 id='enlisted'>Enlisted Bots</h2>
        {enlistedBots.map(bot => (
          <div key={bot.id}>
            <p>{bot.name}</p>
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>Bot name : {bot.name}</h3>
            <p> Health : {bot.health}</p>
            <p>Damage : {bot.damage}</p>
            <p>Armor : {bot.armor}</p>
            <button onClick={() => setEnlistedBots(prevBots => prevBots.filter(item => item.id !== bot.id))}>Remove</button>
          </div>
        ))}
      </div>
     
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
