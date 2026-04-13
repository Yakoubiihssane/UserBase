export default function UserModal({ user, onClose }) {
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="modal-avatar">{initials}</div>
        <h2 className="modal-name">{user.name}</h2>
        <div className="modal-fields">
          <div className="modal-field">
            <span className="field-label">Email</span>
            <span className="field-value">{user.email}</span>
          </div>
          <div className="modal-field">
            <span className="field-label">Âge</span>
            <span className="field-value">{user.age || '—'}</span>
          </div>
          <div className="modal-field">
            <span className="field-label">ID</span>
            <span className="field-value field-id">{user._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}