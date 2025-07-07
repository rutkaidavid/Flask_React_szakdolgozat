# Flask_React_szakdolgozat
WebProject
Full-stack webalkalmazás Flask backenddel és React frontenddel.
Egy weboldal oldal szolgáltatáslistával, admin felülettel, felhasználói regisztrációval és bejelentkezéssel.

Projekt funkciók jelenleg:
Szolgáltatások listázása
Szolgáltatás hozzáadása, szerkesztése, törlése (admin)
Kapcsolatfelvételi űrlap
Admin belépés jelszóval
Felhasználói regisztráció email validációval
Felhasználói bejelentkezés

Tech stack:
Backend: Python, Flask, Flask-CORS, SQLAlchemy, SQLite
Frontend: React.js, fetch API, CSS

Adatbázis modell:
Service    id, title, description
ContactMessage	 id, name, email, message
User	  id, username, email, password (hashed)

Api végpontok:
GET	/api/test	Backend teszt
GET	/api/services	Összes szolgáltatás lekérése
POST	/api/services	Új szolgáltatás hozzáadása
PUT	/api/services/<id>	Szolgáltatás frissítése
DELETE	/api/services/<id>	Szolgáltatás törlése
POST	/api/contact	Kapcsolatfelvételi üzenet küldése
POST	/api/admin/login	Admin belépés
POST	/api/register	Felhasználói regisztráció
POST	/api/login	Felhasználói bejelentkezés


Regisztrációs szabályok:
Felhasználónév: 4-16 karakter
Jelszó: 6-16 karakter
Email: érvényes email formátum, egyedi
