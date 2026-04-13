export default function Header({ count, onAdd }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">UserBase</span>
        </div>
        <span className="user-count">{count} membre{count !== 1 ? 's' : ''}</span>
      </div>
      <button className="btn-add" onClick={onAdd}>
        <span className="btn-icon">+</span>
        Nouveau
      </button>
    </header>
  );
}