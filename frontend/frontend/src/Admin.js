import React, { useState, useEffect } 
from "react";import "./admin.css";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [msg, setMsg] = useState("");
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const SESSION_DURATION = 5 * 60 * 1000;

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    const expiry = parseInt(localStorage.getItem("adminExpiry"), 10);

    if (adminStatus && expiry && Date.now() < expiry) {
      setLoggedIn(true);
    } else {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminExpiry");
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) fetchServices();
  }, [loggedIn]);

  const fetchServices = () => {
    fetch("http://127.0.0.1:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.access) {
        setLoggedIn(true);
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminExpiry", (Date.now() + SESSION_DURATION).toString());
        setMsg("✅ Sikeres belépés!");
        fetchServices();
      } else {
        setMsg("❌ Hibás jelszó!");
      }
    } catch {
      setMsg("⚠️ Hiba történt a bejelentkezéskor.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminExpiry");
    setLoggedIn(false);
    setMsg("👋 Kijelentkeztél.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://127.0.0.1:5000/api/services/${editingId}`
      : "http://127.0.0.1:5000/api/services";
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg || "Mentve!");
        setTitle("");
        setDescription("");
        setEditingId(null);
        fetchServices();
      });
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setEditingId(service.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Biztosan törlöd ezt a szolgáltatást?")) {
      fetch(`http://127.0.0.1:5000/api/services/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => fetchServices());
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold text-center mb-6">Admin belépés</h2>

      {!loggedIn ? (
        <div className="bg-white shadow p-4 rounded">
          <input
            type="password"
            placeholder="Admin jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-2"
          />
          <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Belépés</button>
          <p className="text-sm text-red-600 mt-2">{msg}</p>
        </div>
      ) : (
        <div className="bg-gray-50 shadow p-6 rounded space-y-6">
          <div className="text-right">
            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Kilépés</button>
          </div>

          <h3 className="text-xl font-semibold">{editingId ? "Szolgáltatás szerkesztése" : "Új szolgáltatás"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Cím"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <textarea
              placeholder="Leírás"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {editingId ? "Mentés" : "Hozzáadás"}
            </button>
          </form>

          <h3 className="text-xl font-semibold mt-6">Szolgáltatások</h3>
          <ul className="space-y-4">
            {services.map((s) => (
              <li key={s.id} className="bg-white p-4 rounded shadow">
                <div className="font-bold text-lg">{s.title}</div>
                <div className="text-gray-700 mb-2">{s.description}</div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(s)} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">✏️</button>
                  <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admin;