/**
 * Player component
 * @param {string} initialName - The initial name of the player
 * @param {string} symbol - The symbol of the player
 * @param {boolean} isActive - Whether the player is active
 * @param {function} onChangeName - The function to call when the player's name changes
 * @returns {JSX.Element} The Player component
 * @example
 * <Player
 *   initialName="Player 1"
 *   symbol="X"
 *   isActive={true}
 *   onChangeName={handlePlayerNameChange}
 * />
 * 
 */

/**
 * You're calling the onChangeName function within the if (isEditing) block, which gets executed during every render when isEditing is true. 
 * This causes setPlayers in the App component to be called repeatedly, triggering a re-render of the Player component
 * Which in turn keeps calling onChangeName, creating an infinite loop.
 */

import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    if (isEditing) {
      // Only call onChangeName when the user is saving the edited name
      onChangeName(playerName, symbol);
    }
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-symbol">{symbol}</span>
        {editablePlayerName}
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}