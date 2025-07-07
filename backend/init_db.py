import sqlite3

# Kapcsolódás (ha nem létezik a fájl, létrehozza)
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Tábla létrehozása, ha nem létezik
cursor.execute('''
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL
    )
''')

conn.commit()
conn.close()

print("Adatbázis inicializálva.")
