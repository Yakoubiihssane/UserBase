export default function EmptyState({ onAdd }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">◎</div>
      <h3>Aucun utilisateur</h3>
      <p>Commence par ajouter le premier membre.</p>
    </div>
  );
}