# Chat Room Application

A real-time chat application built with Spring Boot backend and React frontend, featuring WebSocket communication for instant messaging.

## Features

- Create and join chat rooms
- Real-time messaging with WebSocket
- Modern UI with Tailwind CSS
- Docker support for easy deployment
- Vercel deployment ready for frontend

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring WebSocket
- Spring Data JPA
- H2 Database (for development)
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- WebSocket client

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Docker and Docker Compose (optional, for containerized deployment)
- Maven (usually comes with Java)

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd chat-app-backend
   ```

2. Install dependencies and build:
   ```bash
   ./mvnw clean install
   ```

3. Run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd chat-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Running with Docker

To run the entire application using Docker Compose:

1. Ensure Docker and Docker Compose are installed

2. From the root directory, run:
   ```bash
   docker-compose up --build
   ```

This will start both backend and frontend services.

## Deployment

### Backend Deployment
The backend can be deployed to any cloud platform supporting Java applications (Heroku, AWS, etc.).

### Frontend Deployment
The frontend is configured for Vercel deployment:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Deploy automatically

The `vercel.json` file contains the deployment configuration.

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/{roomId}` - Get room by ID

### Messages
- `GET /api/rooms/{roomId}/messages` - Get messages for a room
- `POST /api/rooms/{roomId}/messages` - Send a message to a room

### WebSocket
- `/ws` - WebSocket endpoint for real-time messaging

## Project Structure

```
chat-room/
├── chat-app-backend/          # Spring Boot backend
│   ├── src/
│   │   ├── main/java/com/substring/chat/chat_app_backend/
│   │   │   ├── config/        # WebSocket configuration
│   │   │   ├── controllers/   # REST controllers
│   │   │   ├── entities/      # JPA entities
│   │   │   ├── payload/       # Request/Response DTOs
│   │   │   └── repositories/  # JPA repositories
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
├── chat-app-frontend/         # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── config/           # Configuration files
│   │   ├── context/          # React context
│   │   └── services/         # API services
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml         # Docker composition
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.