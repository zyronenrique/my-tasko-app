# My Tasko App

A full-stack task management application that helps users organize, track, and manage tasks efficiently.

## Features

* User authentication and authorization
* Task creation, editing, and deletion
* Task status tracking
* Task statistics dashboard
* Notifications system
* Responsive user interface
* Real-time updates

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* TanStack Query
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL

### Database

* PostgreSQL

## Project Structure

```text
my-tasko-app/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   └── package.json
└── README.md
```

## Prerequisites

Before running the application, make sure you have installed:

* Node.js (v20 or later)
* npm
* PostgreSQL

## Installation

### Clone the repository

```bash
git clone https://github.com/zyronenrique/my-tasko-app.git
cd my-tasko-app
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/tasko_db?schema=public
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_secret_key
```

Create a `.env` file inside the `client` directory if needed.

Example:

```env
VITE_API_URL=http://localhost:5000
```

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE tasko_db;
```

Run your database migrations or schema setup.

## Running the Application

### Start Backend

```bash
cd server
npm run dev
```

Backend server:

```text
http://localhost:5000
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend application:

```text
http://localhost:5173
```

## Available Scripts

### Client

```bash
npm run dev
npm run build
npm run preview
```

### Server

```bash
npm run dev
npm run build
npm start
```

## License

This project is licensed under the MIT License.
