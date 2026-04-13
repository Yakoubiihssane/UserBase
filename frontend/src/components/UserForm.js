import { useState } from 'react';

export default function UserForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (form.age && (form.age < 1 || form.age > 120)) e.age = 'Âge invalide';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch {
      setErrors({ global: 'Erreur lors de l\'ajout' });
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { key: 'name', label: 'Nom complet', type: 'text', placeholder: 'ex: Yassine Benali' },
    { key: 'email', label: 'Adresse email', type: 'email', placeholder: 'ex: yassine@mail.com' },
    { key: 'age', label: 'Âge', type: 'number', placeholder: 'ex: 24' },
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="form-panel" onClick={e => e.stopPropagation()}>
        <div className="form-header">
          <h2>Nouvel utilisateur</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {errors.global && <div className="error-banner">{errors.global}</div>}

        <form onSubmit={handleSubmit} className="user-form">
          {fields.map(({ key, label, type, placeholder }) => (
            <div className="field" key={key}>
              <label>{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => {
                  setForm(prev => ({ ...prev, [key]: e.target.value }));
                  setErrors(prev => ({ ...prev, [key]: '' }));
                }}
                className={errors[key] ? 'input-error' : ''}
              />
              {errors[key] && <span className="field-error">{errors[key]}</span>}
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}