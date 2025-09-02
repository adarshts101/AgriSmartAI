# backend/services/guide_service.py
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "db", "guides.db")

def init_guides_db():
    os.makedirs(os.path.join(os.path.dirname(__file__), "..", "db"), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS guides (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            topic TEXT,
            content TEXT
        )
    """)
    # Insert sample if empty
    cur.execute("SELECT COUNT(*) FROM guides")
    count = cur.fetchone()[0]
    if count == 0:
        sample = [
            ("Neem Oil Spray", "pest control", "Mix 5ml neem oil per liter and spray in early morning."),
            ("Drip Irrigation", "irrigation", "Install drip lines at 1m spacing for row crops."),
            ("Balanced NPK", "fertilizers", "Apply NPK 10:26:26 at planting for rice.")
        ]
        cur.executemany("INSERT INTO guides (title, topic, content) VALUES (?, ?, ?)", sample)
    conn.commit()
    conn.close()

def get_guides(topic: str = ""):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    if topic:
        cur.execute("SELECT title, topic, content FROM guides WHERE topic LIKE ?", ('%'+topic+'%',))
    else:
        cur.execute("SELECT title, topic, content FROM guides")
    rows = cur.fetchall()
    conn.close()
    return [{"title": r[0], "topic": r[1], "content": r[2]} for r in rows]
