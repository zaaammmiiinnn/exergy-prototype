from flask import Blueprint, jsonify
from sqlalchemy import func
from models import db, Lead, ChatLog
from routes.auth import token_required

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/admin/analytics")

@analytics_bp.route("", methods=["GET"])
@token_required
def get_dashboard_analytics(current_user):
    # Total leads
    total_leads = Lead.query.count()
    
    # Status breakdown
    status_counts = dict(
        db.session.query(Lead.status, func.count(Lead.id))
        .group_by(Lead.status)
        .all()
    )

    # Source breakdown
    source_counts = dict(
        db.session.query(Lead.source, func.count(Lead.id))
        .group_by(Lead.source)
        .all()
    )

    # Service / Reason breakdown
    reason_counts = dict(
        db.session.query(Lead.reason_for_connecting, func.count(Lead.id))
        .group_by(Lead.reason_for_connecting)
        .all()
    )

    # Chat statistics
    total_chat_messages = ChatLog.query.count()
    total_chat_sessions = (
        db.session.query(func.count(func.distinct(ChatLog.session_id))).scalar() or 0
    )
    escalated_sessions = (
        db.session.query(func.count(func.distinct(ChatLog.session_id)))
        .filter(ChatLog.escalated.is_(True))
        .scalar() or 0
    )

    # Recent 5 leads
    recent_leads = [
        lead.to_dict()
        for lead in Lead.query.order_by(Lead.created_at.desc()).limit(5).all()
    ]

    # Quick metrics
    new_leads_count = status_counts.get("New", 0)
    conversion_rate = (
        round((status_counts.get("Qualified", 0) + status_counts.get("Closed", 0)) / total_leads * 100, 1)
        if total_leads > 0 else 0
    )

    return jsonify({
        "metrics": {
            "total_leads": total_leads,
            "new_leads": new_leads_count,
            "total_chat_sessions": total_chat_sessions,
            "total_chat_messages": total_chat_messages,
            "escalated_sessions": escalated_sessions,
            "conversion_rate_percent": conversion_rate
        },
        "status_distribution": status_counts,
        "source_distribution": source_counts,
        "reason_distribution": reason_counts,
        "recent_leads": recent_leads
    }), 200
