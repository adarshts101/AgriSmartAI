# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# load env
load_dotenv()

from services.weather_service import get_weather
from services.market_service import get_market_prices, predict_future_price
from services.guide_service import get_guides, init_guides_db
from services.chatbot_service import chat_with_ai

app = Flask(__name__)
CORS(app)

# Ensure guides DB seeded
init_guides_db()

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status":"ok","service":"AgriSmartAI Backend"})

@app.route("/api/weather", methods=["GET"])
def api_weather():
    city = request.args.get("city", "").strip()
    if not city:
        return jsonify({"error":"city required"}), 400
    data = get_weather(city)
    return jsonify(data)

@app.route("/api/market/prices", methods=["GET"])
def api_market_prices():
    crop = request.args.get("crop", "wheat")
    prices = get_market_prices(crop)
    return jsonify(prices)

@app.route("/api/market/predict", methods=["GET"])
def api_market_predict():
    crop = request.args.get("crop", "wheat")
    days = int(request.args.get("days", "7"))
    pred = predict_future_price(crop, days)
    return jsonify({"crop": crop, "future_in_days": days, "predicted_price": pred})

@app.route("/api/guides", methods=["GET"])
def api_guides():
    topic = request.args.get("topic", "")
    return jsonify(get_guides(topic))

@app.route("/api/chat", methods=["POST"])
def api_chat():
    payload = request.get_json(force=True)
    query = payload.get("query", "")
    if not query:
        return jsonify({"error":"query required"}), 400
    answer = chat_with_ai(query)
    return jsonify({"query": query, "answer": answer})

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=os.getenv("FLASK_ENV")=="development")
