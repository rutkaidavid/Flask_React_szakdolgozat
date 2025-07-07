from app import db, Service, app
with app.app_context():
    db.create_all()

    if Service.query.count() == 0:  # csak ha még nincsenek adatok
        services = [
            Service(title="Webfejlesztés", description="Modern weboldalak készítése."),
            Service(title="SEO optimalizálás", description="Keresőoptimalizált tartalom."),
            Service(title="Karbantartás", description="Weboldalak üzemeltetése.")
        ]
        db.session.add_all(services)
        db.session.commit()
        print("Szolgáltatások betöltve!")
