import React from 'react';

function SortBar({ onSort }) {
  const handleSort = (criteria) => {
    onSort(criteria);
  };

  return (
    <div>
      <button onClick={() => handleSort('health')}>Sort by Health</button>
      <button onClick={() => handleSort('damage')}>Sort by Damage</button>
      <button onClick={() => handleSort('armor')}>Sort by Armor</button>
    </div>
  );
}

export default SortBar;
