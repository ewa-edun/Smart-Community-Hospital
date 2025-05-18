# 🏥 Smart Community Hospital

## *“One Dashboard. Two Lives Saved.”*

---

## 🧠 Overview

**Smart Community Hospital** is a digital health intelligence dashboard built to improve access to **preventative healthcare** and **hospital resource management** — all in one place.

Our web app allows health workers, public health officers, and hospital admins to:

* Identify **critical community health issues** (like low vaccination or malnutrition rates)
* Predict **upcoming hospital resource demands** (beds, oxygen, medications)
* Get **actionable advice** and **AI-guided support** to take timely action.

> With just one dashboard, we aim to impact both community wellbeing and hospital readiness — because every insight can save lives.

---

## ✨ Features

🔹 **Dual-Module Interface**
Users can choose from two modules:

* **Community Health Analysis**
* **Hospital Resource Forecasting**

🔹 **CSV Upload & Instant Insights**
Upload health survey or hospital usage data to get real-time analytics and plain-language summaries.

🔹 **Data Visualization**
Interactive charts and graphs help make trends obvious — even for non-technical users.

🔹 **Machine Learning Forecasts**
Hospital data is analyzed with lightweight ML models to forecast upcoming needs.

🔹 **Smart CTA Flow**
Finished one module? Get nudged to check out the other, building full-picture preparedness.

🔹 **AI Chatbot (Stretch Goal)**
Ask follow-up questions or get emergency recommendations from a Gemini-powered chatbot.

---

## 🔧 How It Works

#### 📌 Step 1: Upload Your Data

* **Community Health Module**: Upload survey data (e.g., vaccination, malnutrition)
* **Hospital Resource Module**: Upload past hospital usage data (e.g., ICU beds, oxygen)

#### 📈 Step 2: See the Results

* Get key statistics and visual breakdowns
* Read insights in simple, actionable language
* Receive AI-generated predictions (hospital forecasting)

#### 🤖 Step 3: Get Support

* Chat with an AI assistant for recommendations (stretch goal)

---

## 🛠️ Tech Stack

| Area               | Tool                                  |
| ------------------ | ------------------------------------- |
| Frontend           | React.js, Tailwind CSS                |
| Data Visualization | Chart.js / Recharts                   |
| ML Model           | Scikit-learn (Regressor)              |
| Data Handling      | Pandas, Numpy                         |
| AI Assistant       | Gemini API                            |
| Hosting            | Vercel / Replit / Hugging Face Spaces |

---

## 👥 Team Roles

| Name      | Role                                                 |
| --------  | ---------------------------------------------------- |
| **Tanya** | Frontend Design & UX Flow                            |
| **Ishan** | Data Cleaning & Visualizations                       |
| **Ewa**   | Machine Learning, Firebase, & AI Chatbot Integration |

---

## 🧪 Example Datasets

We’ve included sample CSVs to test both modules:

* `community_data_sample.csv`
* `hospital_usage_sample.csv`

Each includes dummy but realistic entries so you can demo predictions instantly.

---

## 📍 Future Improvements

* User authentication
* Save session history
* Geo-tagged insights
* Community leaderboard for outreach impact
* Offline-first PWA version

---

## 💬 Tagline

> **“One Dashboard. Two Lives Saved.”**
> Community. Hospital. One solution.

### How to run it locally

1. Clone the repository
 ``` bash
     https://github.com/ewa-edun/Smart-Community-Hospital.git 
   ```


#### Frontend

2. Change directories
  ```bash
   cd Smart-Community-Hospital/frontend
   ```

3. Put your .env file in the frontend folder

```bash
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```

4. Install the necessary dependencies

```bash  
  npm install
  npm install react-router-dom
  npm install @google/generative-ai
  npm install firebase
  npm install recharts
```

5. Open the development server
```bash
    npm run dev
```
  This will open in [localhost:5173](http://localhost:5173/)

#### Backend
2. Change directories
  ```bash
   cd Smart-Community-Hospital/backend
   ```
  
3. Install dependencies

```bash  
  pip install flask pandas matplotlib seaborn pandasql
  pip install flask-cors
  pip install openpyxl
```

4. Open the development server
```bash
    python app.py
```