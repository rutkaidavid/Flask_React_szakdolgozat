import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => alert("Üzenet elküldve!"));
  };

  return (
    <div>
      <h2>Kapcsolat</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Név" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <textarea name="message" placeholder="Üzenet" onChange={handleChange} /><br />
        <button type="submit">Küldés</button>
      </form>
    </div>
  );
}

export default Contact;
