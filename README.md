# Student Managment System

A full-stack project comprising a **React** front-end and an **Express** back-end. This repository contains the **front-end** application built using Vite, React, and Bootstrap. For the **back-end**, refer to the configuration below.

## Front-End

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173` (or the URL provided by Vite).

### Technologies Used

- **React**: v18.3.1
- **Bootstrap**: v5.3.3
- **React Router DOM**: v7.0.2
- **Axios**: v1.7.9

---

## Back-End

The back-end is built using **Express** and provides RESTful APIs for the front-end. Below is the `package.json` configuration for the server:

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "mysql": "^2.18.1",
    "nodemon": "^3.1.9",
    "path": "^0.12.7"
  }
}
```

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Ensure `.env` file is configured correctly with database credentials and other required environment variables.

### Technologies Used

- **Express**: v4.21.2
- **MySQL**: v2.18.1
- **JWT**: v9.0.2
- **Bcrypt**: v5.1.1
- **Multer**: For file uploads

---

## Folder Structure

### Front-End
```
client/
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components for routes
│   ├── assets/        # Static files (images, styles, etc.)
│   ├── App.jsx        # Main React App file
│   ├── main.jsx       # Entry point for Vite
├── public/            # Public files
├── package.json       # Front-end dependencies
```

### Back-End
```
server/
├── routes/            # Route handlers
├── controllers/       # Business logic for routes
├── models/            # Database models and queries
├── middleware/        # Custom middleware
├── index.js           # Entry point for the server
├── package.json       # Back-end dependencies
```

---

## License

This project is licensed under the MIT License.

