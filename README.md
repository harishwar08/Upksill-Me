# SkillSwapHub 🎓✨

> **"Teach what you know. Learn what you need. Swap skills. Grow together."**

SkillSwapHub is a peer-to-peer skill-exchange platform where users trade their time and expertise rather than pay money. The platform facilitates matchmaking, communication, resource sharing, and recognition (via badges and analytics) to build a community of reciprocal learning and teaching.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features
- **User Authentication** - Secure signup/login with JWT tokens
- **User Profiles** - Customizable profiles with skills offered/needed, bio, location
- **Browse Listings** - Search and filter skill swap requests
- **Create Requests** - Post what you can teach and what you want to learn
- **Smart Matching** - Algorithm-based matching between complementary users
- **Real-time Chat** - Communicate with matched users
- **Rating & Review System** - Rate partners after skill swaps
- **Resource Library** - Share and access learning resources
- **Badges & Achievements** - Gamified progress tracking
- **Analytics Dashboard** - Visual insights into your skill swap journey
- **Notifications** - Stay updated on matches, messages, and achievements
- **Location Filtering** - Find local or remote skill swap partners

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Icons** - Icon library
### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Icons** - Icon library
- **Framer Motion** - Animations
- **Vite** - Build tool

### Styling Architecture
- **Global CSS** (`/src/styles/global.css`) - Shared styles, utilities, and common components
- **Page-Specific CSS** - Each page has its own CSS file (e.g., `browse.css`, `dashboard.css`)
- **Import Pattern**: Import both global.css and page-specific CSS in each React component

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Socket.io** - Real-time features (optional)

---

## 📁 Project Structure

```
SkillSwapHub/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── server.js         # Entry point
│
└── frontend/
    ├── public/           # Static files
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── contexts/     # React contexts
    │   ├── hooks/        # Custom hooks
    │   ├── services/     # API services
    │   └── styles/       # CSS files
    │       ├── global.css      # Shared styles (buttons, cards, badges, utilities)
    │       ├── browse.css      # Browse page specific styles
    │       ├── dashboard.css   # Dashboard page specific styles
    │       └── [page].css      # Other page-specific styles
    └── index.html
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/skillswaphub.git
cd skillswaphub
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillswaphub?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SkillSwapHub
```

---

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend (use PM2 or similar)
cd backend
npm start
```

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatepassword` - Update password

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/search` - Search users

### Request Endpoints
- `POST /api/requests` - Create swap request
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get single request
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Delete request

### Match Endpoints
- `POST /api/matches` - Create match
- `GET /api/matches` - Get user matches
- `GET /api/matches/:id` - Get match details
- `PUT /api/matches/:id/status` - Update match status
- `POST /api/matches/:id/rate` - Rate match
- `POST /api/matches/:id/messages` - Add message

### Resource Endpoints
- `POST /api/resources` - Upload resource
- `GET /api/resources/match/:matchId` - Get match resources
- `POST /api/resources/:id/rate` - Rate resource

### Badge Endpoints
- `GET /api/badges` - Get all badges
- `GET /api/badges/user/:userId` - Get user badges

### Notification Endpoints
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Analytics Endpoints
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/analytics/history` - Get swap history
- `GET /api/analytics/skills` - Get skills breakdown

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the spirit of collaborative learning
- Built with passion for education and community

---

## 📧 Contact

For questions or suggestions, please open an issue or contact at your.email@example.com

---

**Happy Skill Swapping! 🎉**
