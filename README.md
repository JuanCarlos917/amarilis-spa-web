# Amarilis Spa Ultimate

A full-stack MERN application for a luxury spa.

## Project Structure

- `/server`: Node.js/Express Backend API
- `/client`: React/Vite Frontend SPA

## Prerequisites

- Node.js (v18+)
- MongoDB (running locally or URI in .env)

## Setup & Run

1.  **Backend Setup**:
    ```bash
    cd server
    npm install
    # Create .env file with MONGODB_URI, JWT_SECRET, etc.
    node seed.js # Seed initial data
    npm start # Runs on port 5000
    ```

2.  **Frontend Setup**:
    ```bash
    cd client
    npm install
    npm run dev # Runs on port 5173
    ```

## Features

-   **Public**: Home, Services, Offers, Blog, Contact, Booking (Calendly).
-   **Admin**: Protected Dashboard for managing all content.
-   **Tech**: React, Tailwind, Framer Motion, Node.js, Express, MongoDB.
