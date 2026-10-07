import uuid
from flask import Blueprint, request, jsonify
from models import db, ChatLog, Lead
from rag.rag_engine import rag_engine
from routes.auth import token_required

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    message = (data.get("message") or "").strip()
    session_id = (data.get("session_id") or "").strip() or str(uuid.uuid4())

    if not message:
        return jsonify({"error": "Message is required"}), 400

    # Query RAG Engine
    rag_result = rag_engine.query(message)

    # Save to ChatLog
    user_log = ChatLog(
        session_id=session_id,
        sender="user",
        message=message,
        matched_topic=rag_result.get("topic"),
        escalated=False
    )
    bot_log = ChatLog(
        session_id=session_id,
        sender="bot",
        message=rag_result.get("answer"),
        matched_topic=rag_result.get("topic"),
        escalated=rag_result.get("can_escalate", False)
    )

    db.session.add(user_log)
    db.session.add(bot_log)
    db.session.commit()

    return jsonify({
        "session_id": session_id,
        "answer": rag_result.get("answer"),
        "topic": rag_result.get("topic"),
        "confidence": rag_result.get("confidence"),
        "can_escalate": rag_result.get("can_escalate", False),
        "suggestions": rag_result.get("suggestions", [])
    }), 200

@chat_bp.route("/api/chat/escalate", methods=["POST"])
def escalate_to_agent():
    data = request.get_json() or {}
    session_id = (data.get("session_id") or "").strip() or str(uuid.uuid4())
    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    email = (data.get("email") or "").strip()
    reason = (data.get("reason") or "Direct Engineering Consultation (Chat Escalation)").strip()
    notes = (data.get("notes") or f"Chat session: {session_id}").strip()

    if not name or not phone:
        return jsonify({"error": "Name and phone number are required to connect with an agent."}), 400

    # Create high-priority Lead from Chatbot
    lead = Lead(
        name=name,
        email=email if email else f"{phone.replace(' ', '')}@chat-inquiry.com",
        phone=phone,
        reason_for_connecting=reason,
        source="Chatbot",
        status="New",
        notes=f"Escalated from AI Chatbot. Notes: {notes}"
    )
    db.session.add(lead)

    # Mark chat logs for this session as escalated
    ChatLog.query.filter_by(session_id=session_id).update({"escalated": True})
    db.session.commit()

    return jsonify({
        "message": "Thank you! You have been connected with our priority engineering queue. An Exergy Solutions specialist will contact you via phone or WhatsApp shortly.",
        "lead": lead.to_dict(),
        "session_id": session_id
    }), 200

@chat_bp.route("/api/admin/chat-logs", methods=["GET"])
@token_required
def get_chat_logs(current_user):
    limit = request.args.get("limit", 100, type=int)
    logs = ChatLog.query.order_by(ChatLog.created_at.desc()).limit(limit).all()
    return jsonify({
        "logs": [log.to_dict() for log in logs],
        "total": len(logs)
    }), 200
