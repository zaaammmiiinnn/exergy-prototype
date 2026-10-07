import os
import json
import re
import math
from collections import Counter

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KB_PATH = os.path.join(BASE_DIR, "knowledge_base.json")

STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
    "any", "are", "as", "at", "be", "because", "been", "before", "being", "below",
    "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down",
    "during", "each", "few", "for", "from", "further", "had", "has", "have", "having",
    "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i",
    "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", "most",
    "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
    "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she",
    "should", "so", "some", "such", "than", "that", "the", "their", "theirs", "them",
    "themselves", "then", "there", "these", "they", "this", "those", "through", "to",
    "too", "under", "until", "up", "very", "was", "we", "were", "what", "when",
    "where", "which", "while", "who", "whom", "why", "with", "would", "you", "your",
    "yours", "yourself", "yourselves"
}

def tokenize(text):
    words = re.findall(r"[a-zA-Z0-9\-\+]+", text.lower())
    return [w for w in words if w not in STOPWORDS and len(w) > 1]

class RAGEngine:
    def __init__(self, kb_path=KB_PATH):
        self.kb_path = kb_path
        self.documents = []
        self.load_knowledge_base()

    def load_knowledge_base(self):
        try:
            with open(self.kb_path, "r", encoding="utf-8") as f:
                self.kb = json.load(f)
        except Exception as e:
            print(f"Error loading knowledge base: {e}")
            self.kb = {}
            return

        self.documents = []

        # 1. Services
        for s in self.kb.get("services", []):
            text_corpus = f"{s['title']} {' '.join(s.get('keywords', []))} {s['summary']} {s['details']} {' '.join(s.get('benefits', []))}"
            self.documents.append({
                "type": "service",
                "id": s["id"],
                "title": s["title"],
                "content": f"{s['title']}:\n{s['summary']}\n\nKey Details:\n{s['details']}\n\nBenefits:\n• " + "\n• ".join(s.get("benefits", [])),
                "keywords": s.get("keywords", []),
                "corpus": text_corpus,
                "tokens": tokenize(text_corpus),
                "suggestions": ["What is your methodology?", "Can I speak with an engineer?", "Tell me about Waste-Heat Recovery"]
            })

        # 2. Methodology
        meth = self.kb.get("company", {}).get("methodology", {})
        meth_steps = meth.get("steps", [])
        steps_text = "\n\n".join([f"**{st['step']}**: {st['description']}" for st in meth_steps])
        self.documents.append({
            "type": "methodology",
            "id": "methodology",
            "title": "Diagnose, Model, Design, Implement Methodology",
            "content": f"At Exergy Solutions, we deploy our proprietary 4-stage engineering methodology:\n\n{steps_text}",
            "keywords": ["methodology", "diagnose", "model", "design", "implement", "audit", "approach", "process"],
            "corpus": f"methodology diagnose model design implement audit engineering approach {steps_text}",
            "tokens": tokenize(f"methodology diagnose model design implement audit approach {steps_text}"),
            "suggestions": ["Cooling optimization details", "Industries you serve", "Request an energy audit"]
        })

        for st in meth_steps:
            step_corpus = f"{st['step']} {st['description']} methodology"
            self.documents.append({
                "type": "methodology_step",
                "id": f"step-{st['step'].lower()}",
                "title": f"Methodology: {st['step']}",
                "content": f"**Phase {st['step']}**:\n{st['description']}\n\nThis is part of our comprehensive 4-step framework (Diagnose → Model → Design → Implement).",
                "keywords": [st['step'].lower(), "methodology", "phase"],
                "corpus": step_corpus,
                "tokens": tokenize(step_corpus),
                "suggestions": ["What are the other methodology steps?", "Book an energy audit", "What services do you offer?"]
            })

        # 3. Industries
        for ind in self.kb.get("industries", []):
            ind_corpus = f"{ind['name']} {' '.join(ind.get('keywords', []))} {ind['solutions']}"
            self.documents.append({
                "type": "industry",
                "id": ind["id"],
                "title": f"Industry Solutions: {ind['name']}",
                "content": f"**{ind['name']} Sector Solutions**:\n{ind['solutions']}\n\nExergy Solutions tailors thermodynamic integration to meet sector-specific energy and water challenges.",
                "keywords": ind.get("keywords", []) + [ind["name"].lower()],
                "corpus": ind_corpus,
                "tokens": tokenize(ind_corpus),
                "suggestions": ["Process integration in our plant", "Waste heat recovery options", "Connect with an engineering specialist"]
            })

        # 4. FAQs
        for faq in self.kb.get("faqs", []):
            faq_corpus = f"{faq['question']} {' '.join(faq.get('keywords', []))} {faq['answer']}"
            self.documents.append({
                "type": "faq",
                "id": "faq",
                "title": faq["question"],
                "content": faq["answer"],
                "keywords": faq.get("keywords", []),
                "corpus": faq_corpus,
                "tokens": tokenize(faq_corpus),
                "suggestions": ["How can I get started?", "What services do you offer?", "Connect to Agent"]
            })

        # 5. Company Overview
        comp = self.kb.get("company", {})
        contact = comp.get("contact", {})
        comp_corpus = f"{comp.get('name')} {comp.get('mission')} {contact.get('address')} {contact.get('phone')} {contact.get('email')}"
        self.documents.append({
            "type": "company",
            "id": "about-exergy",
            "title": "About Exergy Solutions",
            "content": f"**{comp.get('name')}** is an energy and water efficiency consulting firm.\n\n**Mission**: {comp.get('mission')}\n\n**Offices**: {contact.get('address')}\n**Email**: {contact.get('email')}\n**Phone**: {contact.get('phone')}",
            "keywords": ["about", "mission", "company", "who are you", "location", "address", "phone", "contact"],
            "corpus": comp_corpus,
            "tokens": tokenize(comp_corpus),
            "suggestions": ["Tell me about your 4-step methodology", "Explore your 6 core services", "Connect with an engineer"]
        })

    def query(self, user_query: str):
        query_text = (user_query or "").strip().lower()
        if not query_text:
            return {
                "answer": "Hello! How can Exergy Solutions assist with your energy and water efficiency goals today?",
                "topic": "Greeting",
                "confidence": 1.0,
                "can_escalate": False,
                "suggestions": ["Tell me about Cooling optimization", "How does your 4-step methodology work?", "Which industries do you serve?"]
            }

        # Check for explicit human agent request
        escalate_triggers = ["human", "agent", "representative", "speak to someone", "call me", "talk to a person", "connect to agent", "contact human"]
        if any(trig in query_text for trig in escalate_triggers):
            return {
                "answer": "I would be happy to connect you with an Exergy Solutions engineering specialist. Please click the 'Connect to Agent' button below or leave your contact details so our technical team can reach out right away.",
                "topic": "Human Escalation Request",
                "confidence": 1.0,
                "can_escalate": True,
                "suggestions": ["Connect to Agent", "View Services", "Explore Methodology"]
            }

        # Check for casual greetings
        greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
        if query_text in greetings:
            return {
                "answer": "Hello and welcome to Exergy Solutions! We specialize in thermodynamic optimization, energy conservation, and water stewardship across industrial and commercial facilities. How can I help you today?",
                "topic": "Greeting",
                "confidence": 1.0,
                "can_escalate": False,
                "suggestions": ["What are your 6 core services?", "Explain the Diagnose-Model-Design-Implement approach", "What industries do you work with?"]
            }

        query_tokens = tokenize(query_text)
        if not query_tokens:
            return {
                "answer": "Could you please specify your question about our energy or water consulting services?",
                "topic": "Ambiguous Query",
                "confidence": 0.2,
                "can_escalate": True,
                "suggestions": ["Cooling optimization", "Waste-heat recovery", "Diagnose methodology"]
            }

        scores = []
        for doc in self.documents:
            score = 0.0
            doc_tokens = doc["tokens"]
            doc_token_counts = Counter(doc_tokens)
            doc_len = len(doc_tokens) or 1

            # Exact keyword phrase match boost
            for kw in doc.get("keywords", []):
                if kw in query_text:
                    score += 4.0

            # Token overlap scoring
            for qt in query_tokens:
                if qt in doc_token_counts:
                    tf = doc_token_counts[qt] / doc_len
                    score += 1.5 + (tf * 5.0)

            # Title match boost
            if any(qt in doc["title"].lower() for qt in query_tokens):
                score += 2.5

            scores.append((score, doc))

        scores.sort(key=lambda x: x[0], reverse=True)
        best_score, best_doc = scores[0] if scores else (0.0, None)

        if best_score >= 1.5 and best_doc:
            # High confidence answer
            can_escalate = best_score < 3.0 or "quote" in query_text or "cost" in query_text or "price" in query_text
            return {
                "answer": best_doc["content"],
                "topic": best_doc["title"],
                "confidence": round(min(best_score / 8.0, 0.99), 2),
                "can_escalate": can_escalate,
                "suggestions": best_doc.get("suggestions", ["Tell me more", "Connect to Agent", "Contact Exergy Solutions"])
            }
        else:
            # Low confidence fallback
            return {
                "answer": "I don't have full details on that specific query in my knowledge base. Our team of thermodynamic and water engineers can provide personalized assistance tailored to your facility.",
                "topic": "Unmatched Query",
                "confidence": 0.15,
                "can_escalate": True,
                "suggestions": ["Connect to Agent", "What services do you offer?", "Send an inquiry"]
            }

rag_engine = RAGEngine()
