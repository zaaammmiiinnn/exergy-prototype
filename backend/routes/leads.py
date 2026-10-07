from flask import Blueprint, request, jsonify
from models import db, Lead
from routes.auth import token_required

leads_bp = Blueprint("leads", __name__)

@leads_bp.route("/api/leads", methods=["POST"])
def create_lead():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    reason = (data.get("reason_for_connecting") or "").strip()
    source = (data.get("source") or "Contact Form").strip()
    notes = (data.get("notes") or "").strip()

    if not name or not email or not phone or not reason:
        return jsonify({
            "error": "Missing required fields. Name, email, mobile number, and reason for connecting are required."
        }), 400

    lead = Lead(
        name=name,
        email=email,
        phone=phone,
        reason_for_connecting=reason,
        source=source,
        notes=notes if notes else None,
        status="New"
    )

    db.session.add(lead)
    db.session.commit()

    return jsonify({
        "message": "Thank you! Your inquiry has been received. An Exergy Solutions specialist will contact you shortly.",
        "lead": lead.to_dict()
    }), 201

@leads_bp.route("/api/admin/leads", methods=["GET"])
@token_required
def get_admin_leads(current_user):
    search = request.args.get("search", "").strip().lower()
    status = request.args.get("status", "").strip()
    reason = request.args.get("reason", "").strip()

    query = Lead.query

    if status and status != "All":
        query = query.filter(Lead.status == status)

    if reason and reason != "All":
        query = query.filter(Lead.reason_for_connecting.ilike(f"%{reason}%"))

    if search:
        query = query.filter(
            (Lead.name.ilike(f"%{search}%")) |
            (Lead.email.ilike(f"%{search}%")) |
            (Lead.phone.ilike(f"%{search}%")) |
            (Lead.reason_for_connecting.ilike(f"%{search}%"))
        )

    leads = query.order_by(Lead.created_at.desc()).all()
    return jsonify({
        "leads": [lead.to_dict() for lead in leads],
        "total": len(leads)
    }), 200

@leads_bp.route("/api/admin/leads/<int:lead_id>", methods=["PATCH"])
@token_required
def update_lead(current_user, lead_id):
    lead = Lead.query.get(lead_id)
    if not lead:
        return jsonify({"error": "Lead not found"}), 404

    data = request.get_json() or {}
    if "status" in data:
        lead.status = data["status"]
    if "notes" in data:
        lead.notes = data["notes"]

    db.session.commit()
    return jsonify({
        "message": "Lead updated successfully",
        "lead": lead.to_dict()
    }), 200

@leads_bp.route("/api/admin/leads/<int:lead_id>", methods=["DELETE"])
@token_required
def delete_lead(current_user, lead_id):
    lead = Lead.query.get(lead_id)
    if not lead:
        return jsonify({"error": "Lead not found"}), 404

    db.session.delete(lead)
    db.session.commit()
    return jsonify({"message": "Lead deleted successfully"}), 200
