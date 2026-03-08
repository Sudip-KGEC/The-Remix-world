# 🎧 AI Powered Remix & EDM Streaming Platform (Backend)

A scalable **Node.js + Express + MongoDB backend** for a DJ Remix and EDM streaming platform inspired by **Spotify + YouTube Creator Economy**.

This platform allows DJs to upload remix songs, users to stream using credits, and the company to distribute revenue based on song plays.

---

# 🚀 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Secure Cookie Authentication
* Stream Remix Songs
* Credit-based streaming system
* View profile & credits
* Browse approved remix songs

### 🎧 DJ Admin Features

* Upload remix songs
* View uploaded songs
* Track earnings
* Analytics based on plays

### 👑 Super Admin Features

* Create DJ Admin accounts
* Approve remix songs
* Platform analytics dashboard
* Revenue distribution system

### 💰 Monetization

* Credit based streaming
* Admin revenue sharing
* Platform analytics
* Revenue distribution logic

---

# 🏗 Tech Stack

Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

Authentication

* JWT
* bcrypt
* cookie-parser

Security

* helmet
* express-rate-limit
* cors

File Upload

* multer

Other Tools

* morgan (logging)

---

# 📂 Project Structure

```
server/
│
├── src/
│
│   ├── config/
│   │   ├── db.js
│
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   ├── songController.js
│   │   └── dashboardController.js
│
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│
│   ├── models/
│   │   ├── User.js
│   │   └── Song.js
│
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── songRoutes.js
│   │   └── dashboardRoutes.js
│
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── earnings.js
│
│   └── app.js
│
├── uploads/
├── server.js
├── package.json
└── README.md
```

---

# 🔐 Authentication

Authentication is handled using **JWT Tokens stored in HTTP-only cookies**.

Roles supported:

```
USER
ADMIN
SUPER_ADMIN
```

Role based middleware:

```
protect
authorize("ADMIN")
authorize("SUPER_ADMIN")
```

---

# 🌐 API Documentation

Base URL

```
http://localhost:5000/api
```

---

# 🔐 Auth APIs

### Register User

POST `/api/auth/register`

Request

```json
{
"name": "Sudip",
"email": "sudip@gmail.com",
"password": "123456"
}
```

Response

```json
{
"message": "User registered successfully"
}
```

---

### Login

POST `/api/auth/login`

Request

```json
{
"email": "sudip@gmail.com",
"password": "123456"
}
```

---

# 👤 User APIs

### Get Profile

GET `/api/user/me`

Header

```
Authorization: Bearer USER_TOKEN
```

---

### Get Credits

GET `/api/user/credits`

---

# 🎧 Song APIs

### Upload Song (Admin)

POST `/api/song/upload`

Header

```
Authorization: Bearer ADMIN_TOKEN
```

Body (form-data)

```
title : Remix Song
audio : file.mp3
```

---

### Approve Song (Super Admin)

PUT `/api/song/approve/:songId`

Header

```
Authorization: Bearer SUPER_ADMIN_TOKEN
```

---

### Stream Song

GET `/api/song/stream/:songId`

Header

```
Authorization: Bearer USER_TOKEN
```

Response

```json
{
"audioUrl": "...",
"remainingCredits": 99
}
```

---

### Get Approved Songs

GET `/api/song/approved`

---

# 👨‍🎤 Admin APIs

### View Earnings

GET `/api/admin/earnings`

---

### View Uploaded Songs

GET `/api/admin/my-songs`

---

# 👑 Super Admin APIs

### Create DJ Admin

POST `/api/admin/create`

Request

```json
{
"name": "DJ Ayan",
"email": "ayan@dj.com",
"password": "123456"
}
```

---

### Platform Stats

GET `/api/admin/stats`

---

### Total Plays

GET `/api/admin/platform-stats`

---

### Distribute Revenue

POST `/api/admin/distribute-revenue`

Request

```json
{
"monthlyRevenue": 100000
}
```

---

# 💰 Revenue Distribution Logic

Admin earnings are calculated based on total plays.

```
Admin Earnings =
(Admin Song Plays / Total Platform Plays)
× Monthly Revenue × 40%
```

Revenue split:

```
40% → DJ Admins
30% → Platform Infrastructure
30% → Company Profit
```

---

# 🔒 Security

Security measures implemented:

* Helmet (secure HTTP headers)
* Rate limiting
* JWT authentication
* Role-based access control
* Password hashing with bcrypt

---

# 🚀 Running the Project

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Server runs on

```
http://localhost:5000
```

---

# 🧪 API Testing

Recommended tools:

* Postman
* Thunder Client

---

# 🌟 Future Improvements

Planned features:

* Credit purchase system (Razorpay)
* Referral reward system
* Premium membership
* AI BPM detection
* Trending remix algorithm
* React frontend dashboard
* ImageKit cloud storage

---

# 👨‍💻 Author

Sudip Das

Full Stack Developer (MERN)

GitHub: https://github.com/yourusername

---

APIS

/api/auth/register
/api/auth/login

/api/user/me
/api/user/credits

/api/song/upload
/api/song/approved
/api/song/stream/:id
/api/song/my-songs

/api/admin/create
/api/admin/earnings
/api/admin/stats
/api/admin/platform-stats
/api/admin/distribute-revenue

/api/dashboard/user
/api/dashboard/admin
/api/dashboard/super