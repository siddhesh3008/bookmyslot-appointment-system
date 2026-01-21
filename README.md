# 📅 BookMySlot - Appointment Booking System

A professional full-stack appointment booking system with user and admin panels. Built with **React.js**, **Node.js/Express**, **MongoDB**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)

---

## 🌟 Features

### User Panel
- ✅ Clean, modern booking form with real-time validation
- ✅ Calendar date picker for February 2026
- ✅ Time slot selection (1-hour slots from 9 AM - 6 PM)
- ✅ Phone validation (exactly 10 digits)
- ✅ Beautiful success confirmation modal
- ✅ Fully responsive design (mobile + desktop)

### Admin Panel
- ✅ Secure username/password login
- ✅ Dashboard with total bookings count
- ✅ Data table with all booking records
- ✅ Search/filter across all fields
- ✅ Sort dropdown (Newest, Oldest, Name, Date)
- ✅ **Export to Excel (.xlsx)** with one click
- ✅ Professional, clean UI design

---

## 🎨 Design

The app features a vibrant **cyan-to-purple gradient** theme:
- Primary: `#30cfd0` → `#330867`
- Export Button: `#304352` → `#0f9b0f`

---

## 🏗️ Project Structure

```
bookmyslot/
│
├── client/                    # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.svg        # Custom calendar icon
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── BookingForm.jsx    # Main booking form
│   │   │   ├── SuccessModal.jsx   # Confirmation modal
│   │   │   ├── AdminLogin.jsx     # Admin authentication
│   │   │   ├── AdminDashboard.jsx # Admin main view
│   │   │   ├── BookingsTable.jsx  # Data table component
│   │   │   └── Navbar.jsx         # Navigation bar
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx       # User landing page
│   │   │   └── AdminPage.jsx      # Admin container
│   │   ├── utils/
│   │   │   └── validation.js      # Form validation logic
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind + custom styles
│   ├── index.html             # HTML with SEO meta tags
│   ├── vercel.json            # Vercel deployment config
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── models/
│   │   └── Booking.js         # MongoDB schema
│   ├── routes/
│   │   └── bookings.js        # API endpoints
│   ├── server.js              # Express server setup
│   ├── .env.example           # Environment template
│   └── package.json
│
└── README.md
```

---

## 🔧 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + Vite | Fast, modern UI development |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Routing** | React Router 7 | Client-side navigation |
| **HTTP Client** | Axios | API communication |
| **Backend** | Node.js + Express | RESTful API server |
| **Database** | MongoDB Atlas | Cloud NoSQL database |
| **ODM** | Mongoose | MongoDB object modeling |
| **Excel Export** | ExcelJS | Generate .xlsx files |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier works!)
- npm or yarn package manager

### Step 1: Clone & Install

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Step 2: Setup MongoDB Atlas (Free)

> **📘 MongoDB Atlas Setup Guide (5 minutes)**

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and sign up

2. **Create a Cluster**
   - Select "Shared" (Free tier, M0)
   - Choose cloud provider: AWS (or any)
   - Select region closest to you
   - Click "Create Cluster" (takes 1-3 minutes)

3. **Setup Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username: `admin` (or any)
   - Enter password: create a strong password
   - Save the password! You'll need it.
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (Overview)
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name before `?`: `/appointment-booking?`

### Step 3: Configure Environment

1. Create `.env` file in the `server` folder:

```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/appointment-booking?retryWrites=true&w=majority
PORT=5000
```

2. Replace `YOUR_PASSWORD` with your MongoDB password

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Open http://localhost:5173 in your browser.

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push `client` folder to GitHub
2. Go to [vercel.com](https://vercel.com) and import repository
3. Set **Root Directory** to `client`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL` = Your Render backend URL

### Backend (Render)

1. Push `server` folder to GitHub
2. Go to [render.com](https://render.com) and create Web Service
3. Set **Root Directory** to `server`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variable:
   - `MONGODB_URI` = Your MongoDB Atlas connection string

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create new booking |
| `GET` | `/api/bookings` | Get all bookings |
| `GET` | `/api/bookings/export` | Download Excel file |
| `DELETE` | `/api/bookings/:id` | Delete single booking |
| `DELETE` | `/api/bookings` | Delete all bookings |
| `GET` | `/api/health` | Server health check |

### Example: Create Booking

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "date": "2026-02-15",
    "timeSlot": "10:00 AM - 11:00 AM"
  }'
```

---

## 🔐 Admin Access

**Default Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

To change credentials, edit `AdminLogin.jsx`:
```javascript
const ADMIN_USERNAME = 'your-username';
const ADMIN_PASSWORD = 'your-password';
```

---

## 🎨 Key Features

### Form Validation
- Real-time validation as user types
- Phone number: exactly 10 digits
- Email format validation
- All fields required

### Sort & Filter
- Sort dropdown with multiple options
- Search across all booking fields
- Responsive data table

### Excel Export
- Downloads `.xlsx` file with all bookings
- Formatted headers with colors
- Alternating row colors
- Includes booking timestamps

### Responsive Design
- Mobile-first approach
- Hamburger menu on mobile
- Cards and tables adapt to screen size
- Touch-friendly inputs

---

## 📂 Code Architecture

### Frontend Components

| Component | Purpose |
|-----------|---------|
| `BookingForm` | Main form with calendar date picker |
| `SuccessModal` | Shows after successful booking |
| `AdminLogin` | Username/password authentication |
| `AdminDashboard` | Stats, search, export functionality |
| `BookingsTable` | Sortable data table |
| `Navbar` | Navigation with mobile menu |

### Backend Structure

| File | Purpose |
|------|---------|
| `server.js` | Express setup, MongoDB connection |
| `models/Booking.js` | Mongoose schema with validation |
| `routes/bookings.js` | All API endpoint handlers |

---

## 📝 Environment Variables

### Server (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `PORT` | Server port (default: 5000) | No |

---

## 💡 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check your connection string and IP whitelist |
| Port already in use | Change PORT in .env or kill process on that port |
| CORS error | Ensure backend is running on port 5000 |
| Form not submitting | Check browser console for validation errors |
| Login not working | Ensure username is `admin` and password is `admin123` |

---

## 👨‍💻 Author

**Siddhesh Haldankar**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
