# GigFlow – Smart Leads Dashboard

A full-stack CRM-style dashboard built as part of the ServiceHive Full Stack Development Internship assignment.

---

## 🎥 Demo Video

Watch the complete project walkthrough here:  
https://drive.google.com/file/d/1ykghqhBYYBlXveIQE32KKzUqQUaNyRYF/view?usp=sharing

---

## 🌐 Live Demo

### Frontend
https://ashokkrishnanersu.github.io/Smart-Leads-Dashboard1/

### Backend API
https://smart-leads-dashboard1-1-7gw1.onrender.com

### GitHub Repository
https://github.com/ashokkrishnanersu/Smart-Leads-Dashboard1

---

## 🚀 Project Overview

GigFlow is a full-stack lead management dashboard designed to help users efficiently manage customer leads through a secure and intuitive CRM-style interface.

The application provides authentication, protected routes, lead tracking, analytics, filtering, sorting, and CSV export functionality.

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Dashboard Routes

### Lead Management
- Create New Leads
- View All Leads
- Edit Lead Information
- Delete Leads
- Update Lead Status

### Dashboard Functionalities
- Search Leads
- Filter by Status
- Sort Leads
- CSV Export

### Security
- Password Hashing
- Token Verification Middleware
- Secure Protected API Routes

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

### Deployment
- GitHub Pages
- Render

---

## 📂 Project Structure

```bash
Smart-Leads-Dashboard1/
│
├── client/          # Frontend (React)
│
├── server/          # Backend (Node + Express)
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ashokkrishnanersu/Smart-Leads-Dashboard1.git
cd Smart-Leads-Dashboard1
```

---

### 2. Backend Setup

Navigate to backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file inside server folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

### 3. Frontend Setup

Open another terminal and navigate to client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

**Register User**

```http
POST /api/auth/register
```

**Login User**

```http
POST /api/auth/login
```

---

### Leads

**Get All Leads**

```http
GET /api/leads
```

**Create Lead**

```http
POST /api/leads
```

**Update Lead**

```http
PUT /api/leads/:id
```

**Delete Lead**

```http
DELETE /api/leads/:id
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend validates credentials
3. JWT token is generated
4. Token is stored in localStorage
5. Protected routes verify authentication
6. User gains dashboard access

---

## 📊 Dashboard Workflow

- Login/Register
- Access Dashboard
- Create Lead
- Update Lead Status
- Search / Filter / Sort Leads
- Export Leads as CSV
- Delete Leads
- Logout

---

## 🔮 Future Improvements

- Role-based access control
- Lead analytics charts
- Email notifications
- Activity logs
- Pagination

---

## 👨‍💻 Author

**ASHOK KRISHNA NERSU**

ServiceHive Full Stack Development Internship Assignment Submission

---
