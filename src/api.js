const BASE = "http://localhost:5000/api";

export const fetchUsers = async () => {
  const r = await fetch(`${BASE}/users`);
  if (!r.ok) throw new Error("Impossible de charger les utilisateurs");
  return r.json();
};

export const createUser = async (data) => {
  const r = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(json.message);
  return json;
};

export const updateUser = async (id, data) => {
  const r = await fetch(`${BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(json.message);
  return json;
};

export const deleteUser = async (id) => {
  const r = await fetch(`${BASE}/users/${id}`, { method: "DELETE" });
  const json = await r.json();
  if (!r.ok) throw new Error(json.message);
  return json;
};
