
import React from 'react';
import { Link } from 'react-router-dom';

function BotCard({ bot }) {
  return (
    <div className="bot-card">
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <Link to={`/bots/${bot.id}`}>View Details</Link>
    </div>
  );
}

export default BotCard;
