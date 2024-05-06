// BotCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function BotCard({ bot, onEnlist, onDelete }) {
  const handleEnlistClick = () => {
    onEnlist(bot.id); 
  };

  const handleDeleteClick = () => {
    onDelete(bot.id); // Call onDelete function with bot id
  };

  return (
    <div className="bot-card">
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <button onClick={handleEnlistClick}>Enlist</button>
      <button onClick={handleDeleteClick}>Delete</button> {/* Add delete button */}
      <Link to={`/bots/${bot.id}`}>View Details</Link>
    </div>
  );
}

export default BotCard;
