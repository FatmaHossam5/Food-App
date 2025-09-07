# Food App 🍽️

A modern React-based food application built with Vite, featuring **Admin-only** user authentication via email, recipe management, and category organization.

## ⚠️ Admin Access Only

This application is designed specifically for **Admin users** with email-based authentication. The system includes comprehensive admin permissions for user and content management.

### Admin Roles & Permissions

The Admin user has the following roles and capabilities:

```json
{
  "roles": [
    "Admin",
    "canAddUser",
    "canUpdateUser", 
    "canDeleteUser",
    "canGetUserById",
    "canGetCurrentUser",
    "canGetAllUsers",
    "canChangePassword"
  ]
}
```

## Features

- 🔐 **Admin Email Authentication** (Login/Password Reset/Change Password)
- 📝 Recipe Management
- 📂 Category Organization
- 👥 **Full User Management** (DeleteUsers)
- 🎨 Modern UI with Bootstrap and React Bootstrap
- 📱 Responsive Design
- 🔄 Real-time Data with React Query
- 🔒 **Secure Admin Dashboard**

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Bootstrap 5, React Bootstrap
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Authentication**: JWT
- **Icons**: FontAwesome

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- **Admin email credentials** for authentication

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/food-app.git
cd food-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Admin Login

To access the application, you must log in with **Admin email credentials**. The system will authenticate your email and grant access based on your admin roles and permissions.

### 🎯 Demo Admin Account

For testing purposes, you can use the following demo admin account:

```
Email: admin@demo.com
Password: Admin123
```

**Note**: This is a demo account with full admin privileges. Please use it responsibly for testing and demonstration purposes only.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── AuthModule/          # Admin authentication components
│   ├── Login/           # Admin login with email
│   ├── ForgetPassword/  # Password reset functionality
│   ├── ChangePassword/  # Admin password change
│   └── ResetPassword/   # Password reset confirmation
├── CategoriesModule/    # Category management (Admin)
├── Components/          # Shared UI components
├── HomeModule/          # Admin dashboard
├── RecipesModule/       # Recipe management (Admin)
├── SharedModules/       # Shared layouts and utilities
└── UsersModule/         # User management (Admin only)
```

## Deployment

This project is configured for deployment on GitHub Pages. The live demo is available at: [https://fatmahossam5.github.io/Food-App](https://fatmahossam5.github.io/Food-App)

### 🚀 Try the Live Demo

Visit the live demo and use the demo admin account to explore all features:



**Available Features to Test:**
- ✅ Admin Dashboard
- ✅ User Management (View/Delete Users)
- ✅ Recipe Management
- ✅ Category Management
- ✅ Password Change Functionality
- ✅ Responsive Design

