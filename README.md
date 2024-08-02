# User Management App

A user management application built with React and Material-UI. This project includes a Sign Up page, a Log In page, and a Dashboard page. It demonstrates API integration, form validation, and responsive design.

## Features

- **Sign Up**: Users can register with their first name, email, password, and phone number.
- **Log In**: Registered users can log in using their email and password.
- **Dashboard**: Logged-in users can view their information on the dashboard.

## Technologies Used

- **React**: Front-end framework.
- **Material-UI**: UI components library for styling.
- **Axios**: For making HTTP requests.
- **React Router**: For routing.
- **Local Storage**: For storing user information after login.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management.git
   cd user-management
   ```
2. Install dependencies:

   ```bash
   npm start
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```plaintext
src/
|-- components/
|   |-- SignUp.js
|   |-- Login.js
|   |-- Dashboard.js
|-- App.js
|-- index.js
```

## Usage

# Sign Up

1. Navigate to the Sign Up page at /signup.
2. Fill in the form with your first name, email, password, and phone number.
3. submit the form to register.

## Usage

**Sign Up**

1. Navigate to the Sign Up page at /signup.
2. Fill in the form with your first name, email, password, and phone number.
3. Submit the form to register.
   **Log In**
4. Navigate to the Log In page at /login.
5. Enter your registered email and password.
6. Submit the form to log in.
   4.Upon successful login, you will be redirected to the Dashboard.

**Dashboard**

1. After logging in, you will be redirected to the Dashboard at /dashboard.
2. The dashboard displays your user information.

## API Endpoints

**User Registration**
**URL**: https://syoft.dev/Api/user_registeration/api/user_registeration

**Method**: POST

**Payload**:

```json
{
  "user_firstname": "mani",
  "user_email": "mail@gmail.com",
  "user_phone": "9876543210",
  "user_password": "123456",
  "user_lastname": "ni",
  "user_city": "Hyderabad",
  "user_zipcode": "500072"
}
```

**User Login**
**URL**: https://syoft.dev/Api/userlogin/api/userlogin

**Method**: POST

**Payload**:

```json
{
  "user_email": "mail@gmail.com",
  "user_password": "123456"
}
```
