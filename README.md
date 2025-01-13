# Chat Application - Full Stack

This repository contains both the **frontend** and **backend** of a real-time chat application. The backend manages WebSocket connections, handles messages, and updates participant statuses, while the frontend provides a user-friendly interface for communication.

---

## **Features**

### Backend:

- WebSocket connection handling.
- Real-time message broadcasting.
- Participant status updates (Online/Offline).
- Simple message and participant management.

### Frontend:

- Chat interface with message sending, editing, and deleting.
- Real-time participant status display.
- Responsive design for mobile and desktop devices.

---

## **Setup Instructions**

### Prerequisites:

Ensure the following tools are installed on your system:

- **Node.js** (>= 16.x)
- **npm** or **yarn** (for frontend)
- **.NET 6** or later (for backend)
- **Git**

---

### **Clone the Repository**

```bash
git clone <repository-url>
cd chat-application
```

---

### **Backend Setup**

#### 1. Navigate to the backend directory:

```bash
cd Chat-API
```

#### 2. Build the backend project:

```bash
dotnet build
```

#### 3. Run the backend:

```bash
dotnet run
```

The server will start and listen for WebSocket connections.

#### 4. Firewall Configuration (if required):

Ensure the port used by the backend (e.g., 7213) is open:

- **Windows**:

  ```bash
  netsh advfirewall firewall add rule name="Chat App Backend" dir=in action=allow protocol=TCP localport=7213
  ```

- **Linux**:

  ```bash
  sudo ufw allow 7213
  ```

---

### **Frontend Setup**

#### 1. Navigate to the frontend directory:

```bash
cd frontend
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Configure the WebSocket server URL:

- Create a `.env` file in the frontend directory:

  ```env
  REACT_APP_SERVER_URL=ws://localhost:7213/ws
  ```

  Replace `localhost:7213` with your backend server's URL and port.

#### 4. Start the frontend development server:

```bash
npm start
```

The application will be available at http://localhost:3000.

#### 5. Firewall Configuration (if required):

Ensure the port used by the frontend (e.g., 3000) is open in public networks:

- **Windows**:

  ```bash
  netsh advfirewall firewall add rule name="Chat Frontend" dir=in action=allow protocol=TCP localport=3000
  ```

- **Linux**:

  ```bash
  sudo ufw allow 3000
  ```

#### 6. Build for production:

If you want to build the frontend for production:

```bash
npm run build
```

The built files will be available in the `build/` directory.

---

## **Testing**

### Backend Tests:

1. Navigate to the backend directory:

   ```bash
   cd Chat-API
   ```

2. Run unit tests:

   ```bash
   dotnet test
   ```
### Frontend Tests:

1. Navigate to the frontend directory:

   ```bash
   cd chat-ui
   ```

2. Run unit tests:

   ```bash
   npm test
   ```

---

## **Folder Structure**

### Backend:

```plaintext
Chat-API/
├── Controllers/      # API controllers (if any)
├── Models/           # Models for messages and participants
├── Services/         # WebSocket handler and helper services
├── Program.cs        # Entry point of the backend
└── appsettings.json  # Configuration file
```

### Frontend:

```plaintext
chat-ui/
├── public/           # Static assets
├── src/
│   ├── components/   # UI components
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript types
│   ├── App.tsx       # Main application entry point
│   └── index.tsx     # React DOM entry point
├── .env              # Environment variables
└── package.json      # Dependencies and scripts
```

---

## **Troubleshooting**

1. **Backend Port Already in Use**:

   - Change the port in `appsettings.json` and restart the backend.

2. **Frontend Unable to Connect to WebSocket Server**:

   - Ensure the WebSocket server URL in `.env` is correct.
   - Check if the backend is running and accessible.

3. **CORS Issues**:

   - Ensure CORS is configured correctly in the backend.

---

## **Future Improvements**

1. **Database Integration**:
   - Store messages and participant information in a database (e.g., PostgreSQL, MongoDB).
2. **Authentication**:
   - Add user authentication and secure WebSocket connections.
3. **Message Encryption**:
   - Encrypt messages during transmission for added security.
4. **Custom Dialogs**:
   - Use custom confirmation dialogs for actions like delete.
5. **Enhanced Editing**:
   - Allow users to edit messages directly in an input field.
6. **Multiline Input**:
   - Replace the single-line message input with a multiline textarea.
7. **Integration Tests**:
   - Add comprehensive integration tests for both backend and frontend to ensure seamless component interaction.

