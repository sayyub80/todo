# Welcome to your Lovable project

## Project info


## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# Advanced ToDo App

A comprehensive task management application with weather integration built with React, Redux, TypeScript, and Tailwind CSS.

![ToDo App Screenshot](https://i.imgur.com/wQVnRjH.png)

## Features

- **User Authentication** (simulated)
  - Secure login/logout functionality
  - Session persistence with localStorage
  - Protected routes

- **Task Management**
  - Create tasks with priority levels (High, Medium, Low)
  - Mark tasks as complete/incomplete
  - Delete tasks
  - Update task priorities
  - Visual indicators for different priority levels
  - Local storage persistence

- **Weather Integration**
  - Real-time weather data from OpenWeatherMap API
  - Search weather by city
  - Visual weather indicators based on conditions
  - Temperature and condition displays

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout for different screen sizes

## Technology Stack

- **Frontend**:
  - React 18
  - Redux Toolkit for state management
  - TypeScript for type safety
  - Tailwind CSS for styling
  - shadcn/ui component library

## Screenshots

### Login Screen
![Login Screen](https://i.imgur.com/L5Z7C3D.png)

### Dashboard with Tasks and Weather
![Dashboard](https://i.imgur.com/wQVnRjH.png)

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd advanced-todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Login Credentials

For demo purposes, use these credentials:

- **Username**: demo
- **Password**: password

## Project Structure

```
src/
├── components/
│   ├── auth/         # Authentication related components
│   ├── dashboard/    # Dashboard components
│   ├── layout/       # Layout components (header, footer)
│   ├── tasks/        # Task management components
│   ├── ui/           # UI components from shadcn
│   └── weather/      # Weather widget components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── store/            # Redux store setup
│   └── slices/       # Redux slices (auth, tasks, weather)
└── App.tsx           # Main application component
```

## Redux Store Structure

The application uses Redux Toolkit for state management with the following slices:

- **Auth Slice**: Manages user authentication state
- **Tasks Slice**: Handles task creation, updates, and deletion
- **Weather Slice**: Manages weather data fetching and state

## Local Storage

The application uses localStorage to persist:

- User authentication status
- User information
- Task data

## API Integration

The application integrates with the OpenWeatherMap API for weather data. The API key is included in the weather slice for demonstration purposes.

## Development Notes

- This is a frontend-only application with simulated authentication
- All data is stored in localStorage for persistence between sessions
- The weather API has rate limits, so excessive searches might be throttled