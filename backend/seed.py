import uuid
from datetime import datetime, timedelta
from app import create_app
from models import db, User, Lead, ChatLog
from routes.auth import bcrypt

app = create_app()

def seed_database():
    with app.app_context():
        # Clear existing tables
        db.drop_all()
        db.create_all()

        print("Seeding database...")

        # 1. Admin User
        admin_pass_hash = bcrypt.generate_password_hash("admin123").decode("utf-8")
        admin = User(
            email="admin@exergy.com",
            password_hash=admin_pass_hash,
            name="Zamin & Exergy Leadership",
            role="admin"
        )
        db.session.add(admin)

        # 2. Sample Leads
        sample_leads = [
            Lead(
                name="Tariq Al-Mansoor",
                email="tariq.mansoor@gulfpaper.ae",
                phone="+971 50 491 8821",
                reason_for_connecting="Drying processes",
                source="Contact Form",
                status="Qualified",
                notes="Paper packaging facility in Ras Al Khaimah. Operating 3 rotary drying hoods; seeking 20% thermal recovery.",
                created_at=datetime.utcnow() - timedelta(days=5)
            ),
            Lead(
                name="Elena Rostova",
                email="elena.r@emaardistrictcooling.com",
                phone="+971 52 839 1042",
                reason_for_connecting="Cooling optimization",
                source="Contact Form",
                status="In Review",
                notes="4,500 TR commercial district cooling plant experiencing low Delta-T syndrome during peak summer months.",
                created_at=datetime.utcnow() - timedelta(days=3)
            ),
            Lead(
                name="Rashid bin Khalid",
                email="r.khalid@fujairahrefining.com",
                phone="+971 55 902 4431",
                reason_for_connecting="Waste-heat recovery",
                source="Contact Form",
                status="Contacted",
                notes="Refinery crude preheat train. Evaluating flue gas condensing economizers and ORC feasibility.",
                created_at=datetime.utcnow() - timedelta(days=2)
            ),
            Lead(
                name="Dr. Marcus Vance",
                email="marcus.vance@clevelandhealth.ae",
                phone="+971 54 311 9900",
                reason_for_connecting="Water quality",
                source="Contact Form",
                status="New",
                notes="Healthcare campus hospital seeking high-recovery reverse osmosis retrofit and cooling tower cycle optimization.",
                created_at=datetime.utcnow() - timedelta(days=1)
            ),
            Lead(
                name="Siddharth Patel",
                email="siddharth.p@almarai-industrial.com",
                phone="+971 56 718 2255",
                reason_for_connecting="Heating & steam",
                source="Chatbot",
                status="New",
                notes="Escalated from AI Chatbot. Inquired about boiler blowdown flash steam recovery and pressurized condensate return.",
                created_at=datetime.utcnow() - timedelta(hours=14)
            ),
            Lead(
                name="Sophie Laurent",
                email="slaurent@atlantisresorts.ae",
                phone="+971 50 672 3311",
                reason_for_connecting="Process integration",
                source="Chatbot",
                status="Qualified",
                notes="Escalated from AI Chatbot. Seeking combined pinch analysis for hotel central laundry, domestic hot water, and swimming pool heat pumps.",
                created_at=datetime.utcnow() - timedelta(hours=4)
            )
        ]
        db.session.bulk_save_objects(sample_leads)

        # 3. Sample Chat Logs
        session_1 = str(uuid.uuid4())
        session_2 = str(uuid.uuid4())

        logs = [
            # Session 1
            ChatLog(
                session_id=session_1,
                sender="user",
                message="How can your cooling optimization help our hotel chillers?",
                matched_topic="Cooling Optimization",
                escalated=False,
                created_at=datetime.utcnow() - timedelta(hours=6, minutes=30)
            ),
            ChatLog(
                session_id=session_1,
                sender="bot",
                message="We optimize chiller plants through variable primary flow conversion, condenser water reset, and cooling tower approach optimization, cutting power consumption by 20% to 35%.",
                matched_topic="Cooling Optimization",
                escalated=False,
                created_at=datetime.utcnow() - timedelta(hours=6, minutes=29)
            ),
            ChatLog(
                session_id=session_1,
                sender="user",
                message="Can an engineer visit our site in Palm Jumeirah?",
                matched_topic="Human Escalation Request",
                escalated=True,
                created_at=datetime.utcnow() - timedelta(hours=6, minutes=28)
            ),
            ChatLog(
                session_id=session_1,
                sender="bot",
                message="I would be happy to connect you with an Exergy Solutions engineering specialist. Please click the 'Connect to Agent' button below.",
                matched_topic="Human Escalation Request",
                escalated=True,
                created_at=datetime.utcnow() - timedelta(hours=6, minutes=27)
            ),
            # Session 2
            ChatLog(
                session_id=session_2,
                sender="user",
                message="What is your 4-step methodology?",
                matched_topic="Methodology",
                escalated=False,
                created_at=datetime.utcnow() - timedelta(hours=2)
            ),
            ChatLog(
                session_id=session_2,
                sender="bot",
                message="At Exergy Solutions, we deploy our proprietary 4-stage engineering methodology: Diagnose, Model, Design, and Implement.",
                matched_topic="Methodology",
                escalated=False,
                created_at=datetime.utcnow() - timedelta(hours=1, minutes=59)
            )
        ]
        db.session.bulk_save_objects(logs)

        db.session.commit()
        print("Database seeded successfully with default admin: admin@exergy.com / admin123")

if __name__ == "__main__":
    seed_database()
