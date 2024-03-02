# url-shortener

This project is a simple URL shortener application built using Next.js and TypeScript for the frontend, Node.js for the backend, and MongoDB as the database. It allows users to convert long URLs into shortened versions and optionally create custom aliases for them.

## Features

- Convert long URLs into short URLs
- Option to create custom aliases for URLs
- Copy shortened URL to clipboard functionality
- Gives an error if the suggested name is already being used.
- Offers downloadable QR code for easy website access.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js (v14.x or later recommended)
- You have installed MongoDB on your local machine or have access to a MongoDB database

## Installation

To install this project, follow these steps:

1. Clone the repository to your local machine:

`git clone https://github.com/Khushi-Kasturiya/url-shortener.git
cd url-shortener`

2. Install backend dependencies:

`cd server
npm install`

3. Install frontend dependencies:

`cd client 
npm install`

4. Create a `.env` file in your backend directory and add the following environment variables:

`MONGODB_URI=your_mongodb_uri_here

BASE_URL=http://localhost:8000` # This should be changed according to your deployment base URL if not running locally.


5. Start the backend server:

`node index.js`


6. Start the frontend development server:

`npm run dev `


The Next.js development server will start on `http://localhost:3000` by default.

## Usage

To use the application, navigate to `http://localhost:3000` in your web browser after starting both servers.

1. Enter a long URL you wish to shorten in the "Enter URL here.." input field.
2. Optionally, enter a custom alias for your URL in the "Example: favourite-link" input field.
3. Click "Get your Link" to generate your shortened URL.
4. The shortened URL will be displayed below with an option to copy it to your clipboard.


