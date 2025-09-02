# backend/services/market_service.py
import pandas as pd
import os
from sklearn.linear_model import LinearRegression
import joblib

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "market_prices.csv")
MODEL_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "price_model.pkl")

def get_market_prices(crop: str):
    """
    Read today's market price from CSV sample by crop name (case-insensitive).
    """
    if not os.path.exists(DATA_FILE):
        return {"error":"no_data"}
    df = pd.read_csv(DATA_FILE)
    df['crop'] = df['crop'].str.lower()
    crop = crop.lower()
    row = df[df['crop']==crop]
    if row.empty:
        return {"crop": crop, "price": None}
    rec = row.iloc[-1].to_dict()
    return {"crop": rec['crop'], "price_rupee_per_quintal": rec['price_rupee_per_quintal'], "date": rec['date']}

def train_price_model():
    df = pd.read_csv(DATA_FILE)
    # just a simple time-series -> day index model per crop combined
    df = df.copy()
    df['day_index'] = (pd.to_datetime(df['date']) - pd.to_datetime(df['date']).min()).dt.days
    X = df[['day_index']]
    y = df['price_rupee_per_quintal']
    model = LinearRegression()
    model.fit(X, y)
    joblib.dump(model, MODEL_FILE)
    return model

def predict_future_price(crop: str, days_future: int):
    """
    Simple demo predictor: linear model trained on CSV across all crops combined.
    """
    if not os.path.exists(DATA_FILE):
        return None
    if not os.path.exists(MODEL_FILE):
        train_price_model()
    model = joblib.load(MODEL_FILE)
    df = pd.read_csv(DATA_FILE)
    df['day_index'] = (pd.to_datetime(df['date']) - pd.to_datetime(df['date']).min()).dt.days
    last_day = df['day_index'].max()
    target_day = last_day + days_future
    pred = model.predict([[target_day]])[0]
    return float(round(pred, 2))
