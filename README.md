# Propel Crowdfunding Platform

A full-stack crowdfunding platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Authentication**: JWT-based authentication with role-based access (donor/creator/admin)
- **Project Management**: Create, view, and manage crowdfunding campaigns
- **Donation System**: Support projects with integrated payment processing
- **Dashboard**: Track your projects and donation history
- **Real-time Progress**: Live funding progress tracking
- **Search & Filter**: Find projects by category, status, and keywords

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer for emails
- Mock payment service (ready for Stripe/PayPal integration)

### Frontend
- React.js with Vite
- Tailwind CSS
- React Router
- Axios for API calls
- Context API for state management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "c:\Users\perfe\Desktop\Propel Ca"
   ```

2. **Backend Setup**
   ```bash
   cd propel-backend
   npm install
   ```

   Create a `.env` file (already configured):
   ```
   MONGODB_URI=mongodb://localhost:27017/crowdfunding
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   EMAIL_USER=needsforc@gmail.com
   EMAIL_PASS=mgir emgv lumo oadw
   REQUIRE_EMAIL_VERIFICATION=false
   ```

3. **Frontend Setup**
   ```bash
   cd ../propel-frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB**
   Make sure MongoDB is running on `localhost:27017`

2. **Start Backend Server**
   ```bash
   cd propel-backend
   npm start
   ```
   The API will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd propel-frontend
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected, creator only)
- `PUT /api/projects/:id` - Update project (protected, creator only)
- `DELETE /api/projects/:id` - Delete project (protected, creator only)
- `POST /api/projects/:id/updates` - Add project update (protected)

### Donations
- `POST /api/donations/create-payment-intent` - Create payment intent (protected)
- `POST /api/donations/confirm` - Confirm donation (protected)
- `GET /api/donations/user/:userId` - Get user donations (protected)
- `GET /api/donations/project/:projectId` - Get project donations

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (protected)
- `GET /api/users/:id/projects` - Get user's projects

## Default User Roles

- **donor**: Can browse and donate to projects
- **creator**: Can create and manage projects + donate
- **admin**: Full access to all features

## Payment Integration

Currently uses a mock payment service. To integrate real payments:

1. Install Stripe SDK: `npm install stripe`
2. Update `utils/paymentService.js` with actual Stripe API calls
3. Add Stripe keys to `.env`

## Project Structure

```
propel-backend/
├── controllers/     # Request handlers
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Authentication & validation
├── utils/           # Helper functions
└── server.js        # Main server file

propel-frontend/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── context/     # React context
│   └── App.jsx      # Main app component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
