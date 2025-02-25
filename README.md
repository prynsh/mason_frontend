# Notes App

This project is a simple note-taking application with signup, signin, a dashboard to view, create, edit, and delete notes, and a search functionality.

## Features

*   **Signup/Signin:** Secure user authentication.
*   **Dashboard:** Displays all created notes.
*   **Create Note:** Allows users to create new notes with titles and content.
*   **Edit Note:** Enables users to modify existing notes.
*   **Delete Note:** Provides the ability to remove notes.
*   **Search:** Search notes by title or tag.

## Technologies Used

*   [React, Node.js, Express, MongoDB, Zustand, Google's Gemini API]

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/prynsh/mason_frontend.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd mason_frontend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create an environment file:**

    Create a `.env` file in the root directory of the project.

5.  **Add your Gemini API key:**

    Add the following line to your `.env` file, replacing `YOUR_GEMINI_API_KEY` with your actual Gemini API key:

    ```
    NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

## Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

This will start the application, and it should be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

1.  **Signup/Signin:** Navigate to the signup or signin page to create an account or log in.
2.  **Dashboard:** After logging in, you will be redirected to the dashboard, where you can see all your notes.
3.  **Create Note:** Click the "Create Note" button to create a new note.  Provide a title and the content for your note.
4.  **Edit Note:** Click on a note to edit it. Make your changes and save.
5.  **Delete Note:** Click the delete button associated with a note to remove it.
6.  **Search:** Use the search bar to search for notes by title or tag.
