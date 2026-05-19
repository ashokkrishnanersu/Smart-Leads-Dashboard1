# Smart Leads Dashboard

## 🎥 Demo Video
Watch the project walkthrough here: [Loom Demo Video](https://drive.google.com/file/d/1ykghqhBYYBlXveIQE32KKzUqQUaNyRYF/view?usp=sharing)
## 🚀 Overview
A full-stack CRM-style dashboard to manage leads, authentication, and analytics.

## 🛠 Tech Stack
- React (Vite)
- Node.js + Express
- MongoDB Atlas
- JWT Authentication
- Axios

## 📦 Features
- User Register/Login
- JWT Protected Routes
- CRUD Leads
- Search + Filter + Sort
- CSV Export

## ⚙️ Setup Instructions

### 1. Clone repo
git clone <your-repo-url>

### 2. Backend setup
cd server
npm install

Create .env file:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=5000

npm run dev

### 3. Frontend setup
cd client
npm install
npm run dev

## 🔐 Authentication
Uses JWT-based authentication.

## 📊 API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/leads
- POST /api/leads
- PUT /api/leads/:id
- DELETE /api/leads/:id


## 👨‍💻 Author
Ashok Krishna Nersu
