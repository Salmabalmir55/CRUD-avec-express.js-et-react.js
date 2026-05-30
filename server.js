const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Base de données en mémoire 
let users = [
  { id: 1, nom: "Balmir",   prenom: "Acil", email: "Acil.balmir@gmail.com",   role: "Admin",       avatar: "YA" },
  { id: 2, nom: "Benali",  prenom: "Celia",  email: "Celia.benali@gmail.com",   role: "Utilisateur", avatar: "FB" },
  { id: 3, nom: "Chraibi", prenom: "Mehdi",   email: "mehdi.chraibi@gmail.com",   role: "Modérateur",  avatar: "MC" },
  { id: 4, nom: "Idrissi", prenom: "Sara",    email: "sara.idrissi@gmail.com",    role: "Utilisateur", avatar: "SI" },
];
let nextId = 5;

// GET tous les utilisateurs 
app.get("/api/users", (req, res) => {
  res.json(users);
});

//  GET un utilisateur 
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
});

// POST créer 
app.post("/api/users", (req, res) => {
  const { nom, prenom, email, role } = req.body;
  if (!nom || !prenom || !email || !role)
    return res.status(400).json({ message: "Tous les champs sont requis" });

  if (users.some((u) => u.email === email))
    return res.status(409).json({ message: "Email déjà utilisé" });

  const avatar = `${prenom[0]}${nom[0]}`.toUpperCase();
  const newUser = { id: nextId++, nom, prenom, email, role, avatar };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT modifier 
app.put("/api/users/:id", (req, res) => {
  const idx = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Utilisateur introuvable" });

  const { nom, prenom, email, role } = req.body;
  if (!nom || !prenom || !email || !role)
    return res.status(400).json({ message: "Tous les champs sont requis" });

  if (users.some((u) => u.email === email && u.id !== parseInt(req.params.id)))
    return res.status(409).json({ message: "Email déjà utilisé" });

  const avatar = `${prenom[0]}${nom[0]}`.toUpperCase();
  users[idx] = { ...users[idx], nom, prenom, email, role, avatar };
  res.json(users[idx]);
});

// DELETE supprimer
app.delete("/api/users/:id", (req, res) => {
  const idx = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Utilisateur introuvable" });
  users.splice(idx, 1);
  res.json({ message: "Supprimé avec succès" });
});

app.listen(PORT, () => console.log(` API sur http://localhost:${PORT}`));
