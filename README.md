# Food App 🍽️

A modern React-based food application built with Vite, featuring **Admin-only** user authentication via email, comprehensive recipe management, category organization, and user management with **full demo functionality**.

## 🚀 Demo Access Available

This application now includes **complete demo functionality** allowing anyone to explore all features without registration or API access. Perfect for testing, demonstrations, and showcasing the application's capabilities.

### 🎯 Demo Account Features

- ✅ **Instant Access** - No registration required
- ✅ **Full Admin Dashboard** - Complete admin experience
- ✅ **User Management** - View, search, and manage demo users
- ✅ **Recipe Management** - Add, edit, delete, and browse recipes
- ✅ **Category Management** - Organize and manage food categories
- ✅ **Search & Filter** - Advanced filtering across all modules
- ✅ **Form Validation** - Complete form functionality with validation
- ✅ **Responsive Design** - Works on all devices

## Features

- 🔐 **Admin Email Authentication** (Login/Password Reset/Change Password)
- 📝 **Complete Recipe Management** (Add/Edit/Delete with image upload)
- 📂 **Category Organization** (Full CRUD operations)
- 👥 **User Management** (View/Delete users with search)
- 🎨 **Modern UI** with Bootstrap and React Bootstrap
- 📱 **Responsive Design** for all screen sizes
- 🔄 **Real-time Data** with React Query
- 🔒 **Secure Admin Dashboard**
- 🎭 **Demo Mode** - Full functionality without API dependency

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

**🚀 Quick Access - No Registration Required!**

For immediate access to explore all features, use the following demo admin account:

```
Email: admin@demo.com
Password: Admin123
```

**✨ Complete Demo Features:**

#### 👥 **User Management**
- View 8 demo users with different roles (Admin/User)
- Search users by username
- Filter users by role
- View detailed user information
- Realistic user avatars and contact details

#### 🍽️ **Recipe Management**
- Browse 8 delicious demo recipes with high-quality images (Pizza, Salads, Desserts, etc.)
- Add new recipes with full form validation
- Edit existing recipes with image upload
- Delete recipes with confirmation
- Search recipes by name
- Filter by tags (Italian, Healthy, Dessert, etc.)
- Filter by categories (Pizza, Pasta, Seafood, etc.)
- Complete recipe form with image upload support
- Professional food photography from Unsplash

#### 🏷️ **Category Management**
- View 12 food categories (Appetizers, Main Courses, Desserts, etc.)
- Add new categories
- Edit existing categories
- Delete categories
- Search categories by name
- Full CRUD operations with validation

#### 🔍 **Advanced Search & Filtering**
- Real-time search across all modules
- Multiple filter options
- Clear filter functionality
- Active filter display
- Pagination support

**Note**: This is a demo account with full admin privileges. All demo operations show clear "Demo:" messages to indicate they're simulated. The demo credentials are displayed directly on the login page for easy access. Please use it responsibly for testing and demonstration purposes only.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── AuthModule/          # Admin authentication components
│   ├── Login/           # Admin login with email + Demo credentials display
│   ├── ForgetPassword/  # Password reset functionality
│   ├── ChangePassword/  # Admin password change
│   └── ResetPassword/   # Password reset confirmation
├── CategoriesModule/    # Category management with demo data
│   └── Components/
│       └── CategoriesList/  # Full CRUD with 12 demo categories
├── Components/          # Shared UI components
│   └── SharedUI/        # Reusable form components
├── HomeModule/          # Admin dashboard
├── RecipesModule/       # Recipe management with demo data
│   └── Components/
│       └── RecipesList/ # Full CRUD with 8 demo recipes + image upload
├── SharedModules/       # Shared layouts and utilities
│   ├── Components/
│   │   ├── Hooks/       # React Query hooks with demo detection
│   │   ├── Header/      # Page headers
│   │   ├── Masterlayout/ # Main app layout
│   │   └── ProtectedRoute/ # Route protection
│   └── AuthLayout/      # Authentication layout
└── UsersModule/         # User management with demo data
    └── Components/
        └── UserList/    # Full CRUD with 8 demo users
```

## 🎭 Demo Implementation Details

### **Demo Data Structure**
- **Users**: 8 demo users with Admin/User roles
- **Recipes**: 8 recipes with images, descriptions, prices, tags, and categories
- **Categories**: 12 food categories covering all major food types
- **Tags**: 8 recipe tags for filtering and organization

### **Demo Detection System**
- Automatic detection of demo account via JWT token signature
- Seamless fallback to real API for non-demo accounts
- Mock data simulation with realistic loading delays
- Clear demo messaging for all operations

### **Form Functionality**
- Complete form validation for all CRUD operations
- Image upload support for recipes
- Real-time search and filtering
- Pagination with proper page management
- Modal dialogs for all operations

## 🛠️ Development & Demo Setup

### **Quick Start with Demo**
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5174/`
5. Use demo credentials: `admin@demo.com` / `Admin123`
6. Explore all features immediately!

### **Demo vs Production Mode**
- **Demo Mode**: Automatically activated with demo credentials
- **Production Mode**: Uses real API endpoints for authenticated users
- **Seamless Switching**: No code changes needed between modes
- **Clear Indicators**: All demo operations show "Demo:" prefix

### **Key Demo Features**
- **No API Dependency**: Works completely offline
- **Realistic Data**: 8 users, 8 recipes, 12 categories, 8 tags
- **Full Functionality**: All CRUD operations work
- **Form Validation**: Complete validation for all forms
- **Search & Filter**: Advanced filtering across all modules
- **Responsive Design**: Works on all screen sizes

## Deployment

This project is configured for deployment on GitHub Pages. The live demo is available at: [https://fatmahossam5.github.io/Food-App](https://fatmahossam5.github.io/Food-App)

### 🚀 Try the Live Demo

Visit the live demo and use the demo admin account to explore all features:

**🌐 Live Demo**: [https://fatmahossam5.github.io/Food-App](https://fatmahossam5.github.io/Food-App)

**📱 Local Development**: `http://localhost:5174/` (after running `npm run dev`)

**Available Features to Test:**

#### 🏠 **Dashboard**
- ✅ Navigation to all modules
- ✅ Responsive sidebar navigation

#### 👥 **User Management** (`/dashboard/users`)
- ✅ View 8 demo users with realistic data
- ✅ Search users by username
- ✅ Filter users by role (Admin/User)
- ✅ View detailed user information in modals
- ✅ User avatars with fallback images

#### 🍽️ **Recipe Management** (`/dashboard/recipes`)
- ✅ Browse 8 demo recipes with images
- ✅ Add new recipes with comprehensive form
- ✅ Edit recipes with image upload
- ✅ Delete recipes with confirmation
- ✅ Search recipes by name
- ✅ Filter by tags and categories
- ✅ Recipe images and descriptions

#### 🏷️ **Category Management** (`/dashboard/categories`)
- ✅ View 12 food categories
- ✅ Add new categories
- ✅ Edit existing categories
- ✅ Delete categories
- ✅ Search categories by name

#### 🔐 **Authentication**
- ✅ Demo login with instant access
- ✅ Password change functionality
- ✅ Secure session management

#### 🎨 **UI/UX Features**
- ✅ Modern, responsive design
- ✅ Loading states and animations
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Form validation
- ✅ Search and filter functionality

