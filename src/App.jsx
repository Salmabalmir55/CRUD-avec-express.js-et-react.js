import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import UserModal from "./UserModal";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api";
import styles from "./App.module.css";

function App() {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal]   = useState(false);
  const [search, setSearch]         = useState("");
  const [filterRole, setFilterRole] = useState("Tous");
  const [toast, setToast]           = useState(null);

  // Chargement initial avec useEffect
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Créer ou modifier 
  const handleSubmit = async (formData) => {
    if (editingUser) {
      const updated = await updateUser(editingUser.id, formData);
      setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      showToast(`${updated.prenom} ${updated.nom} modifié !`);
    } else {
      const created = await createUser(formData);
      setUsers([...users, created]);
      showToast(`${created.prenom} ${created.nom} ajouté !`);
    }
    setEditingUser(null);
    setShowModal(false);
  };

  // Supprimer 
  const handleDelete = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!window.confirm(`Supprimer ${user.prenom} ${user.nom} ?`)) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      showToast("Utilisateur supprimé.", "info");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const openCreate = () => { setEditingUser(null); setShowModal(true); };
  const openEdit   = (user) => { setEditingUser(user); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditingUser(null); };

  //  Filtrage 
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.nom.toLowerCase().includes(q) ||
      u.prenom.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);
    const matchRole = filterRole === "Tous" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const counts = {
    total: users.length,
    admin: users.filter((u) => u.role === "Admin").length,
    mod:   users.filter((u) => u.role === "Modérateur").length,
    user:  users.filter((u) => u.role === "Utilisateur").length,
  };

  return (
    <div className={styles.app}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>⬡</span>
          <span className={styles.brandName}>UserPanel</span>
        </div>

        <nav className={styles.nav}>
          {["Tous", "Admin", "Modérateur", "Utilisateur"].map((r) => (
            <button
              key={r}
              className={`${styles.navItem} ${filterRole === r ? styles.active : ""}`}
              onClick={() => setFilterRole(r)}
            >
              <span className={styles.navLabel}>{r}</span>
              <span className={styles.navCount}>
                {r === "Tous" ? counts.total
                  : r === "Admin" ? counts.admin
                  : r === "Modérateur" ? counts.mod
                  : counts.user}
              </span>
            </button>
          ))}
        </nav>

        <button className={styles.addBtn} onClick={openCreate}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter un utilisateur
        </button>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className={styles.pageEyebrow}>Gestion</p>
            <h1 className={styles.pageTitle}>
              {filterRole === "Tous" ? "Utilisateurs" : filterRole + "s"}
            </h1>
          </div>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className={styles.search}
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div className={styles.center}>
            <div className={styles.spinner} />
            <p>Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <span>🔍</span>
            <p>Aucun utilisateur trouvé</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Modal ── */}
      {showModal && (
        <UserModal
          editingUser={editingUser}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === "success" ? "✓" : toast.type === "info" ? "ℹ" : "✕"} {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
