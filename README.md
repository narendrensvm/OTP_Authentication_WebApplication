# OTP-Based Authentication Web Application

## Overview

This project is a simple full-stack web application that demonstrates OTP-based authentication using a minimal and clean implementation.

The purpose of this project is to showcase logical problem-solving, backend and frontend integration, and handling of real-world edge cases such as OTP retries and temporary user blocking. The focus is kept on clarity and functionality rather than heavy frameworks or abstractions.

---

## Features

- Login using email or phone number
- One-Time Password (OTP) based authentication
- OTP expiry handling
- Maximum 3 OTP verification attempts
- Automatic blocking for 10 minutes after 3 failed attempts
- Session token generation on successful verification
- Token persistence using localStorage
- Protected Welcome page after login

OTP delivery is mocked and printed in the backend console for simplicity.

---

## Tech Stack Used

### Frontend
- React.js
- React Router DOM
- Fetch API
- LocalStorage for session handling

### Backend
- Node.js
- Express.js
- UUID (for generating session tokens)
- CORS

### Other
- No database (in-memory storage)
- No third-party OTP or authentication services

---

## OTP & Authentication Logic

- OTP is a randomly generated 6-digit number
- OTP validity duration is 2 minutes
- Users are allowed a maximum of 3 incorrect OTP attempts
- After 3 failed attempts, the email or phone number is blocked for 10 minutes
- Blocked users are restricted at the login page itself
- On successful OTP verification, a mock session token is generated

---
Backend API Endpoints
---------------------

### Request OTP

**POST** /auth/request-otp

**Request Body**

{<br>"identifier": "user@example.com"<br>}

Generates a 6-digit OTP and prints it in the backend terminal.

### Verify OTP

**POST** /auth/verify-otp

**Request Body**

{<br>"identifier": "user@example.com",<br>"otp": "123456"<br>}

Validates the OTP, tracks failed attempts, blocks the user if required, and returns a session token on success.

### Get Logged-In User

**GET** /auth/me

**Headers**

Authorization: <session_token>

Returns basic user information if the token is valid.

How to Run This Application Locally
-----------------------------------

### Prerequisites

*   Node.js (version 16 or higher)
    
*   npm
    
*   Any modern web browser
    

### Step 1: Clone the Repository

git clone https://github.com/narendrensvm/OTP-Authentication-WebApplication.git <br> 
cd otp-auth-app

### Step 2: Run the Backend Server

cd backend<br>
npm install<br>
node server.js

If the backend starts successfully, you will see:

Backend running on [http://localhost:5000](http://localhost:5000)

OTP will be displayed in this terminal when generated.

### Step 3: Run the Frontend Application

Open a new terminal window and run:

cd frontend<br>
npm install<br>
npm start

Frontend will start at:[http://localhost:3000](http://localhost:3000)

How to Test the Application
---------------------------

*   Open [http://localhost:3000](http://localhost:3000) in your browser
    
*   Enter an email or phone number
    
*   Click **Send OTP**
    
*   Check the backend terminal for the generated OTP
    
*   Enter the OTP on the verification page
    
*   On success, the Welcome page will be displayed
    
*   Enter an incorrect OTP three times to test the blocking behavior
    

Important Notes
---------------

*   OTPs are not displayed in the browser
    
*   OTPs are printed only in the backend terminal
    
*   All data is stored in memory and resets when the server restarts
    
*   Blocking logic is enforced at the login page itself
    
*   Users are auto-created during login
    
*   OTP expiry duration is 2 minutes
    
*   Maximum allowed OTP attempts is 3
    
*   Blocking duration is fixed at 10 minutes
    
*   Session tokens are UUID-based
    
*   No database or caching layer is used
