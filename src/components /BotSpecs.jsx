import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BotSpecs() {
  const { botId } = useParams();
  const [bot, setBot] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/bots/${botId}`)
      .then(response => {
        setBot(response.data);
      })
      .catch(error => {
        console.error('Error fetching bot details: ', error);
      });
  }, [botId]);

  const handleEnlist = () => {
    const enlistedBots = JSON.parse(localStorage.getItem('enlistedBots')) || [];
    if (enlistedBots.includes(bot.id)) {
      alert('This bot is already enlisted.');
    } else {
      const updatedEnlistedBots = [...enlistedBots, bot.id];
      localStorage.setItem('enlistedBots', JSON.stringify(updatedEnlistedBots));
      alert('Bot enlisted successfully!');
    }
  };

  return (
    <div>
      <h1>Bot Specs</h1>
      {bot && (
        <div>
          <h2>{bot.name}</h2>
          <p>Health: {bot.health}</p>
          <p>Damage: {bot.damage}</p>
          <p>Armor: {bot.armor}</p>
          <p>Class: {bot.bot_class}</p>
          <button onClick={handleEnlist}>Enlist</button>
          <Link to="/">Back to List View</Link>
        </div>
      )}
    </div>
  );
}

export default BotSpecs;
