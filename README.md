# 🩺 AI-Medical-Assist

**AI-Medical-Assist** is an AI-powered web-based healthcare platform designed to provide users with preliminary health insights based on their symptoms and medical reports. It bridges the gap between early diagnosis and healthcare access by offering AI-driven assessments and seamless doctor appointment bookings.

---

## 🚀 Demo

🔗 [Live Demo on Vercel](#) *(Add your live URL here)*
📸 *Screenshots and walkthroughs coming soon!*

---

## 📌 Table of Contents

* [📖 Overview](#-overview)
* [⚙️ Features](#-features)
* [🧠 Tech Stack](#-tech-stack)
* [🗂️ Folder Structure](#️-folder-structure)
* [📸 Demo](#-demo)
* [📦 Installation](#-installation)
* [🛠️ Usage](#️-usage)
* [🧪 AI Models](#-ai-models)
* [📃 License](#-license)

---

## 📖 Overview

Since the COVID-19 outbreak in 2020, people have become more conscious about health and early disease diagnosis. Many hesitate to visit doctors for minor symptoms due to time, cost, or accessibility.

**AI-Medical-Assist** aims to:

* Offer preliminary health assessments using AI/ML.
* Analyze medical reports and suggest next steps.
* Let users book doctor consultations directly if symptoms are severe.

---

## ⚙️ Features

* 🧠 **AI-Powered Health Prediction**
  Get disease predictions for liver, heart, dengue, and skin conditions.

* 🩺 **Symptom Checker**
  Quickly get health suggestions without logging in.

* 📑 **Medical Report Analyzer**
  Upload reports and get instant AI-driven insights.

* 🧾 **Doctor Appointment Booking**
  Schedule consultations based on your condition.

* 🧩 **Modern UI/UX**
  Intuitive design built using Tailwind CSS and React.

---

## 🧠 Tech Stack

### 🌐 Frontend

* HTML, CSS, JavaScript
* React.js
* Tailwind CSS

### 🔙 Backend

* Node.js, Express.js
* MongoDB
* Redis (for caching)
* Python (for ML model integration)

### 🧪 AI/ML

* Python, Scikit-learn, Pandas, NumPy, PyTorch
* Trained models for Liver Disease, Heart Disease, Skin Issues, Dengue

---

## 🗂️ Folder Structure

```
AI-Medical-Assist/
├───backend/
│   ├───aimodels/
│   ├───Controllers/
│   │   └─── healthPredict.js
│   ├───HealthPredict/
│   ├───Routes/
│   │   └─── healthPredict.js
│   ├─── heart.py
│   ├─── liver.py
│   ├─── symptoms.py
│   ├─── index.js
│   ├─── package.json
│   ├─── package-lock.json
│   └─── requirements.txt
└───frontend/
    ├───public/
    └───src/
        ├───assets/
        ├───components/
        │   ├───FindADoctor/
        │   │   └─── Findadoctor.jsx
        │   ├───Footer/
        │   │   └─── Footer.jsx
        │   ├───Home/
        │   │   └─── Home.jsx
        │   └───Navbar/
        │       └─── Navbar.jsx
        ├───pages/
        │   ├───Home/
        │   │   └─── Home.jsx
        │   ├───PredictHealth/
        │   │   └─── PredictHealth.jsx
        │   └───SignUp/
        │       └─── SignUp.jsx
        ├─── App.css
        ├─── App.jsx
        ├─── index.css
        ├─── main.jsx
        ├─── index.html
        ├─── .gitignore
        ├─── eslint.config.js
        ├─── package.json
        ├─── package-lock.json
        └─── vite.config.js
```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Medical-Assist.git
cd AI-Medical-Assist
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
npm install
pip install -r requirements.txt
node index.js
```

> Make sure MongoDB and Redis servers are running locally or configured in `.env`.

---

## 🛠️ Usage

1. Visit the homepage.
2. Use the **Symptom Checker** for basic insights.
3. Navigate to **Predict Health** to upload reports.
4. Book doctor appointments if advised.

---

## 🧪 AI Models

* **Heart Disease**: Uses clinical parameters like ECG results, cholesterol levels, and blood pressure to assess the risk of cardiovascular conditions such as heart attacks or arrhythmias.
* **Liver Disease**: Analyzes liver enzymes, bilirubin levels, and albumin ratios from blood reports to detect early signs of liver-related disorders like hepatitis or cirrhosis.
* **Dengue Detection**: Evaluates key hematological features such as hemoglobin count, platelet levels, and PDW (Platelet Distribution Width) to identify possible dengue infections.
* **Skin Disease**: Uses image-based deep learning techniques to classify various skin conditions (e.g., monkeypox, chickenpox etc) by analyzing uploaded skin images.



Trained on NIH & NIAID, kaggle open datasets. Integrated using Flask and Python APIs into Node backend.

---

## 🧑‍💻 Contributors

* **AI/ML & Backend**: Model training, API integration, health prediction
* **Frontend Development**: UI/UX with React, Tailwind, routing
* **Backend & Database**: Auth, MongoDB, Redis cache, appointment API

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
