# Note Taker

![Note Taker Screenshot](./Assets/notes-screenshot.png)

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

<section>
## Description
**Note Taker** is a simple, yet powerful, note-taking application designed to help small business owners and individuals organize their thoughts and keep track of tasks. Built with an Express.js backend and a JSON file for data storage, this application provides a seamless experience for creating, viewing, and deleting notes through an intuitive front-end interface.
</section>

<section>
## User Story
<code>
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
</code>
</section>

<section>
## Features
- Create Notes: Easily add new notes with a title and text.
- View Existing Notes: Display a list of all saved notes for quick access.
- Delete Notes: Remove unwanted notes directly from the interface.
- Data Persistence: All notes are stored in a db.json file, ensuring data is retained between sessions.
- Responsive Design: User-friendly interface that works seamlessly across different devices.
- Deployment Ready: Easily deployable to platforms like Render for public access.
</section>

<section>
## Installation
Follow these steps to set up the Note Taker application locally:

### Prerequisites
- Node.js (v12 or higher)
- npm (comes with Node.js)

### Steps
1. Clone the Repository:
<code>
git clone https://github.com/yourusername/note-taker.git
</code>

2. Navigate to the Project Directory:
<code>
cd note-taker
</code>

3. Install Dependencies:
<code>
npm install
</code>

### Verify db.json
Ensure that the db.json file exists in the db directory and is initialized as an empty array:
<code>
[]
</code>
If the file is missing or empty, create it with the above content.
</section>

<section>
## Usage
### Starting the Server
Run the following command in the project root directory to start the server:
<code>
npm start
</code>

For development purposes with automatic restarts on file changes, use:
<code>
npm run dev
</code>

The server will start on http://localhost:3001 unless a different PORT is specified in environment variables.
</section>

<section>
## API Endpoints
### HTML Routes
#### GET /notes
- **Description**: Serves the notes.html file.
- **Response**: HTML content of the notes page.

#### GET *
- **Description**: Serves the index.html file for all other routes.
- **Response**: HTML content of the landing page.

### API Routes
#### GET /api/notes
- **Description**: Retrieves all saved notes.
- **Response**: JSON array of note objects.
<code>
[
  {
    "id": "unique-uuid",
    "title": "Sample Note",
    "text": "This is a sample note."
  },
  ...
]
</code>

#### POST /api/notes
- **Description**: Saves a new note to db.json.
- **Request Body**:
<code>
{
  "title": "Note Title",
  "text": "Note content."
}
</code>
- **Response**: The newly created note object with a unique id.
<code>
{
  "id": "unique-uuid",
  "title": "Note Title",
  "text": "Note content."
}
</code>

#### DELETE /api/notes/:id (Bonus Feature)
- **Description**: Deletes a note by its id.
- **Parameters**: :id - The unique identifier of the note to delete.
- **Response**: Confirmation message.
<code>
{
  "message": "Note deleted successfully."
}
</code>
</section>

<section>
## Technologies Used
**Front-End**:
- HTML5
- CSS3
- JavaScript (ES6)

**Back-End**:
- Express.js - Web framework for Node.js
- UUID - For generating unique IDs

**Data Storage**:
- JSON file (db.json) managed using Node.js fs module

**Development Tools**:
- Nodemon - Automatically restarts the server on code changes
</section>

<section>
## Deployment
### Steps to Deploy on Render
1. **Push Code to GitHub**: Ensure your project is version-controlled with Git and pushed to a GitHub repository.

2. **Create a New Web Service on Render**:
   - Log in to your Render account.
   - Click on New and select Web Service.
   - Connect your GitHub repository.
   - Choose the appropriate branch to deploy.

3. **Configure Build and Start Commands**:
   - **Build Command**: npm install
   - **Start Command**: npm start

4. **Set Environment Variables**: Define any necessary environment variables (e.g., PORT if required).

5. **Deploy**: Render will automatically build and deploy your application. Once deployed, access your application via the provided URL.

https://dashboard.render.com/web/srv-crjm1oe8ii6s73fhnt70


</section>
