import styles from "./UserCard.module.css";

const ROLE_STYLE = {
  Admin:       "admin",
  Modérateur:  "mod",
  Utilisateur: "user",
};

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={`${styles.avatar} ${styles[ROLE_STYLE[user.role] ?? "user"]}`}>
          {user.avatar}
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{user.prenom} {user.nom}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        <span className={`${styles.badge} ${styles[ROLE_STYLE[user.role] ?? "user"]}`}>
          {user.role}
        </span>
      </div>
      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={() => onEdit(user)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Modifier
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(user.id)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default UserCard;
