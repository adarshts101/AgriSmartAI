# backend/services/weather_service.py
import os
import requests

OPENWEATHER_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(city: str):
    """
    Returns simplified weather JSON for city using OpenWeather current API.
    """
    if not OPENWEATHER_KEY:
        return {"error":"OpenWeather API key not set. Place it in .env"}

    url = ("https://api.openweathermap.org/data/2.5/weather"
           f"?q={city}&units=metric&appid={OPENWEATHER_KEY}")
    r = requests.get(url, timeout=10)
    if r.status_code != 200:
        return {"error":"weather_fetch_failed", "details": r.text}
    d = r.json()
    return {
        "city": d.get("name"),
        "country": d.get("sys", {}).get("country"),
        "temp_c": d.get("main", {}).get("temp"),
        "feels_like_c": d.get("main", {}).get("feels_like"),
        "humidity": d.get("main", {}).get("humidity"),
        "condition": d.get("weather", [{}])[0].get("description")
    }
