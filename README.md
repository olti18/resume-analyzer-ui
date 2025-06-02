# Resume Analyzer UI

This project is a React-based user interface for a resume analyzer application. It provides a platform for users to upload their resumes and receive feedback and analysis based on various criteria. While the original description was missing, this README provides a comprehensive overview based on the project structure and included files.

## Key Features & Benefits

- **User Authentication:** Secure user registration and login functionality using an authentication context.
- **Resume Upload:**  A dedicated component for uploading resume files.
- **Resume Analysis:**  A section to display and interpret the analysis results of uploaded resumes.
- **Landing Page:** An introductory landing page to welcome new users and provide an overview of the application.
- **Protected Routes:** Ensures that certain parts of the application require authentication before access.
- **Modern UI:** Built with React and styled with Tailwind CSS for a responsive and aesthetically pleasing user experience.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (version >= 18.0) [Download Node.js](https://nodejs.org/)
- **npm or yarn:** (npm comes with Node.js)
- **Git:** [Download Git](https://git-scm.com/)

This project relies on the following dependencies:

- React
- React Router
- Tailwind CSS
- Axios
- Framer Motion
- js-cookie

These dependencies are automatically installed during the installation process.

## Installation & Setup Instructions

Follow these steps to set up the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/olti18/resume-analyzer-ui.git
   cd resume-analyzer-ui
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   or using yarn:

   ```bash
   yarn install
   ```

3. **Configuration:**

   Create a `.env` file in the root directory and add the necessary environment variables. Example:

   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

   Replace `http://localhost:8000/api` with the actual URL of your backend API.

4. **Start the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   or using yarn:

   ```bash
   yarn dev
   ```

   This will start the development server, and you can access the application in your browser, typically at `http://localhost:5173`.

## Usage Examples & API Documentation

### Example - Authentication

```javascript
// src/api/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
```

### API Endpoints (Example)

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | `/api/register` | Register a new user        |
| POST   | `/api/login`    | Login an existing user       |
| POST   | `/api/resume/upload`    | Upload a resume for analysis       |
| GET    | `/api/resume/analysis/{resumeId}`    | Get analysis results for a given resume ID |

**Note:** Replace `/api/resume/upload` and `/api/resume/analysis/{resumeId}` with actual backend API endpoints.  The backend API documentation should be consulted for correct usage and expected data formats.

## Configuration Options

The following environment variables can be configured:

- `REACT_APP_API_URL`:  The base URL for the backend API. (Required)

## Contributing Guidelines

Contributions are welcome! Here are some guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive commit messages.
4. Test your changes thoroughly.
5. Submit a pull request.

Please ensure that your code adheres to the existing code style and passes all tests.


## Acknowledgments

- React
- Tailwind CSS
- Vite
 
