# Note Management API

A secure and scalable RESTful API for creating, reading, updating, and deleting notes. Users can also share their notes with others and search for notes based on keywords.

## Table of Contents

- [Introduction](#introduction)
- [Technical Requirements](#technical-requirements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Introduction

This project implements a secure and scalable RESTful API using Express and MongoDB for managing user notes. It includes user authentication, note sharing, and keyword-based note search functionality.

## Technical Requirements

- Express.js
- MongoDB
- Authentication protocol (e.g., JWT)
- Rate limiting and request throttling
- Text indexing for high-performance search
- Testing framework (e.g., Mocha, Chai) {Ongoing work}
- Unit and integration tests

## Getting Started

### Prerequisites

Ensure you have the following software installed:

- Node.js
- MongoDB

### Installation

```bash```
# Clone the repository & connection to database
git clone https://github.com/rishav-eulb/assessment

Add your mongo-db connection string in app.js file

# Install dependencies
npm install

# run app
npm start

### Authentication Endpoints

- **POST /api/auth/signup:** Create a new user account
- **POST /api/auth/login:** Login to an existing user account and receive an access token

### Note Endpoints

- **GET /api/notes:** Get a list of all notes for the authenticated user
- **GET /api/notes/:id:** Get a note by ID for the authenticated user
- **POST /api/notes:** Create a new note for the authenticated user
- **PUT /api/notes/:id:** Update an existing note by ID for the authenticated user
- **DELETE /api/notes/:id:** Delete a note by ID for the authenticated user
- **POST /api/notes/:id/share:** Share a note with another user for the authenticated user

### Search Endpoints

- **GET /api/search?q=:query:** Search for notes based on keywords for the authenticated user


