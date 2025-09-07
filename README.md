# Food App 🍽️

A modern React-based food application built with Vite, featuring user authentication, recipe management, and category organization.

## Features

- 🔐 User Authentication (Login/Register/Password Reset)
- 📝 Recipe Management
- 📂 Category Organization
- 👥 User Management
- 🎨 Modern UI with Bootstrap and React Bootstrap
- 📱 Responsive Design
- 🔄 Real-time Data with React Query

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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── AuthModule/          # Authentication components
├── CategoriesModule/    # Category management
├── Components/          # Shared UI components
├── HomeModule/          # Home page components
├── RecipesModule/       # Recipe management
├── SharedModules/       # Shared layouts and utilities
└── UsersModule/         # User management
```

## Deployment

This project is configured for deployment on GitHub Pages. The live demo is available at: [https://fatmahossam5.github.io/Food-App](https://fatmahossam5.github.io/Food-App)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.