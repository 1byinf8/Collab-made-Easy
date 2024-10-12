# Collab Made Easy

## Introduction

**Collab Made Easy** is a collaborative platform designed to streamline teamwork and enhance productivity. Whether you're working on group projects, brainstorming ideas, or managing tasks, this application provides tools for efficient collaboration. With features that support real-time communication, document sharing, and project management, Collab Made Easy is perfect for teams of any size looking to optimize their workflow.

## Features

- **Real-time Collaboration**: Work simultaneously with team members on shared documents and projects.
- **Task Management**: Create, assign, and track tasks to ensure deadlines are met.
- **File Sharing**: Upload and share documents securely with your team.
- **Messaging System**: Communicate seamlessly with team members through built-in chat functionality.
- **User Management**: Manage team members and their permissions effectively.

## Installation Steps

Follow these steps to set up Collab Made Easy on your local machine:

### Prerequisites

- Ensure you have the following software installed:
  - [Node.js](https://nodejs.org/en/) (v12 or higher)
  - [MySQL](https://www.mysql.com/) or any compatible SQL database
  - [Git](https://git-scm.com/)

### Clone the Repository

1. Open your terminal or command prompt.
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/1byinf8/Collab-made-Easy.git
   cd Collab-made-Easy
   ```

### Install Dependencies

3. Navigate to the project directory and install the required Node.js packages:
   ```bash
   npm install
   ```

### Set Up the Database

4. Create a new database in MySQL (or your preferred SQL database) for the application:
   ```sql
   CREATE DATABASE collab_made_easy;
   ```
5. Import the initial database schema using the provided SQL file:
   ```bash
   mysql -u your-username -p collab_made_easy < "path/to/schema.sql"
   ```

### Configure Environment Variables

6. Create a `.env` file in the root directory and set up the following environment variables:
   ```bash
   DB_HOST=localhost
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=collab_made_easy
   PORT=3000
   ```

### Run the Application

7. Start the application by running:
   ```bash
   npm start
   ```
   The server will be accessible at `http://localhost:3000` (or whichever port you specified in the `.env` file).

## Usage

Once the application is running, you can access the web interface through your browser. Users can sign up, create projects, manage tasks, and communicate with team members.

## License

This project is licensed under the Satwik Kashyap.

## Acknowledgments

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment.
- [MySQL](https://www.mysql.com/) - Database management system.
