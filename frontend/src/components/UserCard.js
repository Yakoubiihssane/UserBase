import { useState } from 'react';

export default function UserCard({ user, onDetails, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ['#6366f1','#ec4899','#14b8a6','#f59e0b','#8b5cf6','#06b6d4'];
  const color = colors[user.name.charCodeAt(0) % colors.length];

  return (
    <div className="user-card">
      <div className="card-avatar" style={{ background: color }}>{initials}</div>
      <div className="card-info">
        <p className="card-name">{user.name}</p>
        <p className="card-email">{user.email}</p>
        {user.age && <span className="card-age">{user.age} ans</span>}
      </div>
      <div className="card-actions">
        <button className="btn-details" onClick={() => onDetails(user._id)}>
          Détails
        </button>
        {!confirming ? (
          <button className="btn-delete" onClick={() => setConfirming(true)}>
            Supprimer
          </button>
        ) : (
          <div className="confirm-row">
            <span className="confirm-text">Sûr ?</span>
            <button className="btn-confirm-yes" onClick={() => onDelete(user._id, user.name)}>Oui</button>
            <button className="btn-confirm-no" onClick={() => setConfirming(false)}>Non</button>
          </div>
        )}
      </div>
    </div>
  );
}