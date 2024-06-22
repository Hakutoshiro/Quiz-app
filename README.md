Sure! Here’s the updated README file with the additional note and links:

---

# Quiz-app

A simple online quiz platform where users can take quizzes, view their scores, and review correct answers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)

## Features

- **Quiz Creation (Admin)**: Admin can create quizzes with multiple-choice questions, each having one correct answer.
- **Take Quiz (User)**: Users can take quizzes by answering multiple-choice questions.
- **Submit Quiz**: Users can submit their answers and receive a score upon completion.
- **View Results**: Users can see their score and the correct answers after submission.
- **Review Answers**: Users can review the questions and their answers with the correct answers highlighted.
- **Responsive Design**: The application is mobile-friendly and uses Tailwind CSS for a clean design.
- **Form Validation**: Includes form validation and error handling for quiz creation and taking quizzes.
- **Local Storage**: Saves quiz progress using local storage, allowing users to resume later.
- **Animations**: Utilizes Tailwind CSS animations for smooth quiz transitions and results display.

## Technologies Used

- **Frontend**: 
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - NextUI

- **Backend**:
  - Node.js
  - Express

- **Database**:
  - MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hakutoshiro/Quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Admin**: 
  - Log in to the admin panel using the following credentials:
    - Email: sample_admin@mail.com
    - Password: Abcd@123
  - Create, edit, or delete quizzes.
  - Add multiple-choice questions with one correct answer for each quiz.

- **User**: 
  - Register and log in to the platform.
  - Browse available quizzes and start a quiz.
  - Answer the multiple-choice questions.
  - Submit the quiz to see your score and review the correct answers.

## Note

Wait for the backend server that is deployed on Render to start. It may take a couple of minutes to start.

## Links

- **Demo**: [Quiz App](https://quiz-app-hkto.vercel.app/)
- **GitHub**: [Quiz App Repository](https://github.com/Hakutoshiro/Quiz-app)

---