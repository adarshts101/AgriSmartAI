# backend/db/seed_db.py
from services.guide_service import init_guides_db
if __name__ == "__main__":
    init_guides_db()
    print("Guides DB seeded.")
