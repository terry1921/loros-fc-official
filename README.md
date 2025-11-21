# Loros FC Official Website

This is the official repository for the Loros FC website. The application is built using React, TypeScript, Vite, and Tailwind CSS. It serves as a hub for fans to check match schedules, squad details, news, and the official shop.

## 🚀 Features

- **Home Dashboard**: Overview of the next match, last match results, and latest news.
- **Squad**: Detailed view of the team players, including positions and numbers.
- **News**: Latest updates and announcements from the club.
- **Shop**: (Upcoming) Official merchandise store.
- **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across devices.
- **Navigation**: Smooth client-side routing with React Router DOM.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
loros-fc-official/
├── src/
│   ├── components/      # Reusable UI components (Cards, Buttons, Layouts)
│   ├── data/            # Mock data for the application
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Main page views (Home, News, Shop, Squad)
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## 🏁 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd loros-fc-official
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the app for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational and demonstration purposes.
