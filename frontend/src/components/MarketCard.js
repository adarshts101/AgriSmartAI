import React, { useState, useCallback } from "react";

// Mock API functions for demonstration
const fetchMarketPrices = async (crop) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockPrices = {
    wheat: { price_rupee_per_quintal: 2150, date: "2025-09-01", market: "APMC Delhi" },
    rice: { price_rupee_per_quintal: 3200, date: "2025-09-01", market: "APMC Delhi" },
    onion: { price_rupee_per_quintal: 1800, date: "2025-09-01", market: "APMC Delhi" },
    tomato: { price_rupee_per_quintal: 2500, date: "2025-09-01", market: "APMC Delhi" }
  };
  
  return mockPrices[crop];
};

const predictMarket = async (crop, days) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const mockPredictions = {
    wheat: { predicted_price: 2280, confidence: 0.85, trend: "up" },
    rice: { predicted_price: 3350, confidence: 0.78, trend: "up" },
    onion: { predicted_price: 1650, confidence: 0.72, trend: "down" },
    tomato: { predicted_price: 2650, confidence: 0.80, trend: "up" }
  };
  
  return mockPredictions[crop];
};

const CROP_OPTIONS = [
  { value: "wheat", label: "Wheat", icon: "🌾" },
  { value: "rice", label: "Rice", icon: "🍚" },
  { value: "onion", label: "Onion", icon: "🧅" },
  { value: "tomato", label: "Tomato", icon: "🍅" }
];

export default function MarketPricesSection() {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [marketData, setMarketData] = useState({
    price: null,
    prediction: null,
    isLoadingPrice: false,
    isLoadingPrediction: false,
    priceError: null,
    predictionError: null,
  });

  const handleFetchPrice = useCallback(async () => {
    setMarketData(prev => ({ ...prev, isLoadingPrice: true, priceError: null }));
    
    try {
      const priceData = await fetchMarketPrices(selectedCrop);
      setMarketData(prev => ({ ...prev, price: priceData, isLoadingPrice: false }));
    } catch (error) {
      setMarketData(prev => ({
        ...prev,
        priceError: "Failed to fetch market price. Please try again.",
        isLoadingPrice: false,
      }));
    }
  }, [selectedCrop]);

  const handleFetchPrediction = useCallback(async () => {
    setMarketData(prev => ({ ...prev, isLoadingPrediction: true, predictionError: null }));
    
    try {
      const predictionData = await predictMarket(selectedCrop, 7);
      setMarketData(prev => ({ ...prev, prediction: predictionData, isLoadingPrediction: false }));
    } catch (error) {
      setMarketData(prev => ({
        ...prev,
        predictionError: "Failed to fetch prediction. Please try again.",
        isLoadingPrediction: false,
      }));
    }
  }, [selectedCrop]);

  const handleCropChange = (event) => {
    const newCrop = event.target.value;
    setSelectedCrop(newCrop);
    setMarketData(prev => ({
      ...prev,
      price: null,
      prediction: null,
      priceError: null,
      predictionError: null,
    }));
  };

  const formatCurrency = (amount) => {
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '📈' : trend === 'down' ? '📉' : '📊';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280';
  };

  const { price, prediction, isLoadingPrice, isLoadingPrediction, priceError, predictionError } = marketData;
  const selectedCropData = CROP_OPTIONS.find(crop => crop.value === selectedCrop);

  return (
    <>
      <style>{`
        .market-section {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          margin: 1.5rem 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .crop-selector {
          position: relative;
          display: inline-block;
        }

        .crop-select {
          appearance: none;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          min-width: 120px;
          transition: all 0.2s ease;
        }

        .crop-select:hover {
          border-color: #9ca3af;
        }

        .crop-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .crop-selector::after {
          content: '▼';
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          color: #6b7280;
          pointer-events: none;
        }

        .market-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .market-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .market-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .card-icon {
          font-size: 1.25rem;
          margin-right: 0.5rem;
        }

        .card-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #6b7280;
          margin: 0;
        }

        .card-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0.25rem 0;
        }

        .card-subtitle {
          font-size: 0.75rem;
          color: #9ca3af;
          margin: 0;
        }

        .prediction-card .card-value {
          color: #10b981;
        }

        .trend-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .confidence-badge {
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.625rem;
          font-weight: 600;
          display: inline-block;
          margin-top: 0.5rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn {
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 120px;
        }

        .btn:hover:not(:disabled) {
          background: #16a34a;
          transform: translateY(-1px);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn--secondary {
          background: #3b82f6;
        }

        .btn--secondary:hover:not(:disabled) {
          background: #2563eb;
        }

        .loading-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-state {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 1rem;
          color: #dc2626;
          font-size: 0.875rem;
          text-align: center;
        }

        .empty-state {
          background: white;
          border: 1px dashed #d1d5db;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .last-updated {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 1rem;
        }

        .update-icon {
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .market-cards {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn {
            min-width: unset;
          }
        }
      `}</style>

      <div className="market-section">
        <div className="section-header">
          <h2 className="section-title">Market Prices & Prediction</h2>
          <div className="crop-selector">
            <select
              value={selectedCrop}
              onChange={handleCropChange}
              className="crop-select"
            >
              {CROP_OPTIONS.map((crop) => (
                <option key={crop.value} value={crop.value}>
                  {crop.icon} {crop.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="market-cards">
          {/* Current Price Card */}
          <div className="market-card">
            <div className="card-header">
              <span className="card-icon">💰</span>
              <h3 className="card-title">Current Price</h3>
            </div>
            
            {priceError ? (
              <div className="error-state">{priceError}</div>
            ) : price ? (
              <>
                <div className="card-value">
                  {formatCurrency(price.price_rupee_per_quintal)}
                </div>
                <p className="card-subtitle">per quintal</p>
                <p className="card-subtitle">
                  {price.market} • {formatDate(price.date)}
                </p>
              </>
            ) : (
              <div className="empty-state">
                <p>Click "Get Latest Price" to fetch current market rates</p>
              </div>
            )}
          </div>

          {/* Price Prediction Card */}
          <div className="market-card prediction-card">
            <div className="card-header">
              <span className="card-icon">🔮</span>
              <h3 className="card-title">7-Day Prediction</h3>
            </div>
            
            {predictionError ? (
              <div className="error-state">{predictionError}</div>
            ) : prediction ? (
              <>
                <div className="card-value">
                  {formatCurrency(prediction.predicted_price)}
                </div>
                <p className="card-subtitle">per quintal</p>
                <div className="trend-indicator" style={{ color: getTrendColor(prediction.trend) }}>
                  <span>{getTrendIcon(prediction.trend)}</span>
                  <span style={{ textTransform: 'capitalize' }}>{prediction.trend}ward trend</span>
                </div>
                <span className="confidence-badge">
                  {Math.round(prediction.confidence * 100)}% Confidence
                </span>
              </>
            ) : (
              <div className="empty-state">
                <p>Click "Predict (7 days)" to get price forecast</p>
              </div>
            )}
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={handleFetchPrice}
            disabled={isLoadingPrice}
            className="btn"
          >
            {isLoadingPrice && <span className="loading-spinner"></span>}
            {isLoadingPrice ? "Loading..." : "Get Latest Price"}
          </button>

          <button
            onClick={handleFetchPrediction}
            disabled={isLoadingPrediction}
            className="btn btn--secondary"
          >
            {isLoadingPrediction && <span className="loading-spinner"></span>}
            {isLoadingPrediction ? "Predicting..." : "Predict (7 days)"}
          </button>
        </div>

        {(price || prediction) && (
          <div className="last-updated">
            <span className="update-icon">🕐</span>
            <span>Last updated: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </div>
    </>
  );
}