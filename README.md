# 🌾 AgriSmartAI

AgriSmartAI is a smart agriculture assistant platform that integrates **AI-powered crop disease detection, market price prediction, and weather forecasting**. It provides farmers and agricultural stakeholders with real-time insights through a modern frontend and robust backend.

---

## 🚀 Features

* **Crop Disease Detection** 🦠 – Upload crop images and detect potential diseases using deep learning models.
* **Weather Forecasting** ☁️ – Get real-time and 7-day weather predictions for better crop planning.
* **Market Price Prediction** 📈 – AI-driven predictions of commodity market prices.
* **Interactive Dashboard** 📊 – Clean and responsive frontend with visualization.
* **Scalable Backend** ⚙️ – Modular Python backend with Flask/FastAPI integration.
* **Firebase Integration** 🔥 – Realtime database for syncing app data.

---

## 🗂️ Project Structure

```
AgriSmartAI/
├── backend/
│   ├── app.py                # Main backend API
│   ├── requirements.txt      # Python dependencies
│   ├── services/             # AI and API services
│   │   ├── weather_service.py
│   │   ├── market_service.py
│   │   ├── guide_service.py
│   │   ├── disease_service.py
│   └── models/               # Trained ML/DL models
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main pages (Home, Dashboard, Upload)
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json          # Frontend dependencies
│
├── dataset/                  # Training datasets (if public)
├── docs/                     # Documentation & design files
└── README.md                 # Project documentation
```

---

## 🛠️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/adarshts101/AgriSmartAI.git
cd AgriSmartAI
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Run backend server:

```bash
python app.py
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Now visit 👉 `http://localhost:3000`

---

## 📊 Tech Stack

* **Frontend**: React.js, TailwindCSS
* **Backend**: Flask / FastAPI
* **Database**: Firebase Realtime DB, SQLite (local)
* **ML/DL Models**: TensorFlow / PyTorch
* **Hosting**: GitHub Pages / Heroku / Vercel

---

## 📷 Screenshots
![WhatsApp Image 2025-09-01 at 6 04 53 PM](https://github.com/user-attachments/assets/ba71ad49-14da-4a32-9c68-8e78616be7c0) 
![WhatsApp Image 2025-09-01 at 6 05 17 PM](https://github.com/user-attachments/assets/34adb41c-2f62-42c4-8545-aea4c84ab206)
![WhatsApp Image 2025-09-01 at 6 05 38 PM](https://github.com/user-attachments/assets/274a84a3-1063-4a6b-b071-deaa47e5ef49)



---

## 📌 Roadmap

* [x] Crop Disease Detection (baseline model)
* [x] Weather API integration
* [ ] Market price prediction model (time-series)
* [ ] Mobile app integration
* [ ] Deploy on cloud

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit changes
4. Push and create a PR

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Adarsh TS**
B.Tech Student | Software & Hardware Designer

🔗 [GitHub](https://github.com/adarshts101)  |  [LinkedIn](#)

---

✨ *Empowering Farmers with AI for a Smarter Tomorrow!* 🌱
