import datetime
import functools
import jwt
from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import Bcrypt
from models import db, User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")
bcrypt = Bcrypt()

def generate_token(user_id, role):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7),
        "iat": datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, current_app.config["JWT_SECRET_KEY"], algorithm="HS256")

def token_required(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Authorization header is missing"}), 401
        
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Invalid authorization token format"}), 401

        token = parts[1]
        try:
            data = jwt.decode(token, current_app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
            if not current_user:
                return jsonify({"error": "User no longer exists"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired, please log in again"}), 401
        except Exception as e:
            return jsonify({"error": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = generate_token(user.id, user.role)
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": user.to_dict()
    }), 200

@auth_bp.route("/me", methods=["GET"])
@token_required
def get_current_user(current_user):
    return jsonify({"user": current_user.to_dict()}), 200

@auth_bp.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "Successfully logged out"}), 200
