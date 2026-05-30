import { useState, useEffect } from "react";
import styles from "./UserModal.module.css";

const EMPTY = { nom: "", prenom: "", email: "", role: "Utilisateur" };
const ROLES  = ["Utilisateur", "Modérateur", "Admin"];

function UserModal({ editingUser, onSubmit, onClose }) {
  const [form, setForm]     = useState(EMPTY);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(editingUser ? { nom: editingUser.nom, prenom: editingUser.prenom, email: editingUser.email, role: editingUser.role } : EMPTY);
    setError("");
  }, [editingUser]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.nom.trim() || !form.prenom.trim() || !form.email.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Adresse email invalide.");
      return;
    }
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{editingUser ? "Modifier" : "Nouveau"}</p>
            <h2 className={styles.title}>
              {editingUser ? `${editingUser.prenom} ${editingUser.nom}` : "Utilisateur"}
            </h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Prénom</label>
              <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Youssef" />
            </div>
            <div className={styles.field}>
              <label>Nom</label>
              <input name="nom" value={form.nom} onChange={handleChange} placeholder="Alami" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="youssef@email.com" />
          </div>
          <div className={styles.field}>
            <label>Rôle</label>
            <select name="role" value={form.role} onChange={handleChange}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Annuler</button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "..." : editingUser ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
