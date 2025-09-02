# backend/services/chatbot_service.py
import os
import openai

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_KEY

SYSTEM_PROMPT = (
    "You are AgriSmartAI — a practical, concise AI assistant for farmers. "
    "Answer in simple language, include action steps and localised suggestions when possible."
)

def chat_with_ai(query: str):
    if not OPENAI_KEY:
        return "OpenAI API key not configured. Put OPENAI_API_KEY in .env"
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # if unavailable replace with "gpt-4o" or "gpt-3.5-turbo"
            messages=[
                {"role":"system", "content": SYSTEM_PROMPT},
                {"role":"user", "content": query}
            ],
            max_tokens=300,
            temperature=0.2
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        return f"AI error: {str(e)}"
