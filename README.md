# Loros FC Official Website

This is the official repository for the Loros FC website. The application is built using Next.js (App Router), TypeScript, and Tailwind CSS. It serves as a hub for fans to check match schedules, squad details, news, and the official shop.

## 🚀 Features

- **Home Dashboard**: Overview of the next match, last match results, and latest news.
- **Squad**: Detailed view of the team players, including positions and numbers.
- **News**: Latest updates and announcements from the club.
- **Shop**: Official merchandise store.
- **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across devices.
- **Navigation**: Client-side navigation optimized by Next.js.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **React**: 19 (RC/Canary)

## 📂 Project Structure

```
loros-fc-official/
├── app/
│   ├── components/      # Reusable UI components (Cards, Buttons, Layouts)
│   ├── data/            # Mock data for the application
│   ├── news/            # News route
│   ├── shop/            # Shop route
│   ├── squad/           # Squad route
│   ├── types/           # TypeScript definitions
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page (Entry point)
├── public/              # Static assets
├── next.config.mjs      # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies and scripts
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

The application will be available at `http://localhost:3000` (or the port shown in your terminal).

### Building for Production

To build the app for production:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational and demonstration purposes.
