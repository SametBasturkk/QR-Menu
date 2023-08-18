# QR Menu Management System - README

## Description
Welcome to the **QR Menu Management System**! This project provides a backend API service using Node.js, Express, Sequelize, and Multer for managing QR code menus. Users can upload, retrieve, update, and delete their menus. It uses PostgreSQL for the database and handles file uploads using Multer.

## Endpoints
The QR Menu Management System offers the following API endpoints:

1. `POST /api/users`: Registers a new user or updates an existing user's details in the `User` table.

2. `POST /saveMenu`: Saves a new menu to the database by creating a new entry in the `Menu` table.

3. `POST /getMenu`: Retrieves a specific menu from the database based on the provided menu name and user ID.

4. `POST /fileUpload`: Handles file uploads, organizing files by user ID in the `/uploads` directory.

5. `POST /getMenuList`: Retrieves a list of menus associated with a specific user from the `Menu` table.

6. `POST /deleteMenu`: Deletes a menu from the `Menu` table based on the provided menu name and user ID.

7. `POST /menuUpdateDb`: Retrieves a menu's details from the `Menu` table based on the provided menu name and user ID.

8. `POST /updateMenu`: Placeholder endpoint for updating menu details (implementation missing).

## Prerequisites
- Ensure you have PostgreSQL installed and running, and the Node.js environment set up.
- Set up the PostgreSQL connection details in the script.
