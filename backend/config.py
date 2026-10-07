import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "exergy-solutions-secret-key-2025-secure")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "exergy-jwt-secret-key-x993kld")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'exergy.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = "Content-Type"
