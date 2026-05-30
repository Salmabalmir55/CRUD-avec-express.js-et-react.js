# 👥 UserPanel — Gestion des utilisateurs (CRUD)

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.18-000000?style=flat-square&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?style=flat-square&logo=css3&logoColor=white)

Application web complète de **gestion des utilisateurs** avec opérations CRUD.  
Back-end REST en **Express.js** · Front-end en **React.js** (hooks `useState` / `useEffect`).

---

## 📸 Aperçu

### Vue principale — liste des utilisateurs
```
<img width="1882" height="882" alt="image" src="image1" />

```

### Modal — Ajout / Modification d'un utilisateur
```

<img width="1882" height="882" alt="image" src="https://github.com/user-attachments/assets/1fce55c5-6a82-4c49-af20-11c6f067c1c0" />

<img width="1747" height="845" alt="image" src="https://github.com/user-attachments/assets/71cae9f6-23a4-4764-92f4-d8004b81933a" />



```

---

## ⚙️ Stack technique

| Côté | Technologie | Rôle |
|------|------------|------|
| Back-end | **Express.js** | API REST (GET, POST, PUT, DELETE) |
| Back-end | **CORS** | Autoriser les requêtes cross-origin |
| Front-end | **React 18** | Interface utilisateur dynamique |
| Front-end | **useState** | Gestion de l'état local |
| Front-end | **useEffect** | Chargement des données au montage |
| Front-end | **CSS Modules** | Styles scopés par composant |
| Données | **Tableau JS** | Stockage en mémoire (pas de BDD) |

---

## 📁 Structure du projet

```
usermgr-v2/
├── backend/
│   ├── server.js          ← Serveur Express + 5 routes CRUD
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js           ← Point d'entrée React
        ├── index.css          ← Variables CSS globales
        ├── App.jsx            ← Composant principal (state + logique CRUD)
        ├── App.module.css
        ├── UserCard.jsx       ← Carte d'un utilisateur
        ├── UserCard.module.css
        ├── UserModal.jsx      ← Modal ajout / modification
        ├── UserModal.module.css
        └── api.js             ← Service fetch() vers l'API
```

---

## 🚀 Installation & lancement

### Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm v8 ou supérieur

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/usermgr-v2.git
cd usermgr-v2
```

### 2. Démarrer le back-end

```bash
cd backend
npm install
node server.js
# ✅ API sur http://localhost:5000
```

### 3. Démarrer le front-end

```bash
cd frontend
npm install
npm start
# ✅ Application sur http://localhost:3000
```

> ⚠️ Les deux serveurs doivent tourner en même temps dans deux terminaux séparés.

---

## 🔌 API REST — Endpoints

| Méthode | Route | Description | Corps (JSON) |
|---------|-------|-------------|--------------|
| `GET` | `/api/users` | Récupérer tous les utilisateurs | — |
| `GET` | `/api/users/:id` | Récupérer un utilisateur | — |
| `POST` | `/api/users` | Créer un utilisateur | `{ nom, prenom, email, role }` |
| `PUT` | `/api/users/:id` | Modifier un utilisateur | `{ nom, prenom, email, role }` |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur | — |

### Exemple — Créer un utilisateur

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nom":"Alami","prenom":"Youssef","email":"youssef@email.com","role":"Admin"}'
```

### Réponse attendue

```json
{
  "id": 5,
  "nom": "Alami",
  "prenom": "Youssef",
  "email": "youssef@email.com",
  "role": "Admin",
  "avatar": "YA"
}
```

---

## ⚛️ Concepts React utilisés

```jsx
// 1. useState — gérer l'état local
const [users, setUsers] = useState([]);
const [showModal, setShowModal] = useState(false);

// 2. useEffect — charger les données au montage du composant
useEffect(() => {
  fetchUsers().then(data => setUsers(data));
}, []); // [] = exécuté une seule fois

// 3. Props — communication parent → enfant
<UserCard
  user={user}
  onEdit={openEdit}
  onDelete={handleDelete}
/>
```

---

## ✅ Fonctionnalités

- [x] Afficher tous les utilisateurs en grille de cartes
- [x] Filtrer par rôle (Admin, Modérateur, Utilisateur)
- [x] Recherche en temps réel (nom, prénom, email)
- [x] Ajouter un utilisateur via modal
- [x] Modifier un utilisateur (formulaire pré-rempli)
- [x] Supprimer un utilisateur (avec confirmation)
- [x] Validation du formulaire (champs obligatoires, email valide)
- [x] Notifications toast (succès / erreur)
- [x] Design responsive (mobile & desktop)

---

## 👨‍💻 Auteur

Réalisé dans le cadre du TP React.js — Express.js  
Concepts abordés : hooks React, appels API avec `useEffect`, architecture CRUD REST.
