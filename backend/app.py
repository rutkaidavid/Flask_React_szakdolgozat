from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Service, ContactMessage, User
from werkzeug.security import generate_password_hash, check_password_hash
import re

ADMIN_PASSWORD = "titkos123"
EMAIL_REGEX = r"[^@]+@[^@]+\.[^@]+"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

@app.route("/api/test")
def test():
    return jsonify({"msg": "Backend él!"})

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    new_msg = ContactMessage(
        name=data.get("name"),
        email=data.get("email"),
        message=data.get("message")
    )
    db.session.add(new_msg)
    db.session.commit()
    return jsonify({"msg": "Üzenet mentve SQLAlchemy-vel"}), 200

@app.route("/api/services", methods=["GET"])
def get_services():
    services = Service.query.all()
    result = [
        {"id": s.id, "title": s.title, "description": s.description}
        for s in services
    ]
    return jsonify(result)

@app.route("/api/services", methods=["POST"])
def add_service():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"msg": "Hiányzó adatok!"}), 400

    new_service = Service(title=title, description=description)
    db.session.add(new_service)
    db.session.commit()

    return jsonify({"msg": "Szolgáltatás hozzáadva!"}), 200

@app.route("/api/services/<int:id>", methods=["DELETE"])
def delete_service(id):
    service = Service.query.get(id)
    if not service:
        return jsonify({"msg": "Nincs ilyen szolgáltatás!"}), 404

    db.session.delete(service)
    db.session.commit()
    return jsonify({"msg": "Törölve"})

@app.route("/api/services/<int:id>", methods=["PUT"])
def update_service(id):
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    service = Service.query.get(id)
    if not service:
        return jsonify({"msg": "Szolgáltatás nem található!"}), 404

    service.title = title
    service.description = description
    db.session.commit()
    return jsonify({"msg": "Frissítve"})

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json()
    if data.get("password") == ADMIN_PASSWORD:
        return jsonify({"msg": "Sikeres belépés", "access": True})
    return jsonify({"msg": "Hibás jelszó!", "access": False}), 401

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"msg": "Hiányzó adatok!"}), 400

    if not (4 <= len(username) <= 16):
        return jsonify({"msg": "A felhasználónév 4 és 16 karakter között kell legyen!"}), 400

    if not (6 <= len(password) <= 16):
        return jsonify({"msg": "A jelszónak 6 és 16 karakter között kell lennie!"}), 400

    if not re.match(EMAIL_REGEX, email):
        return jsonify({"msg": "Érvénytelen e-mail formátum!"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Ez az email már foglalt!"}), 409

    hashed_pw = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Sikeres regisztráció!"}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
