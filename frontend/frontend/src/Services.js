import React, { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div>
      <h2>Szolgáltatások</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <strong>{service.title}</strong>: {service.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function sendContact(name, email, message) {
  fetch("http://127.0.0.1:5000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data.msg);
    })
    .catch(err => {
      console.error("Hiba történt:", err);
      alert("Hiba történt az elküldés során.");
    });
}

export default Services;
