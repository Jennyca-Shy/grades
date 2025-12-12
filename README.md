# Gradetracker

A web app to track subjects, grades, homework, schedules and holidays for german students.
Built with Vue + TypeScript, TailwindCSS and a Node.js + Express + MongoDB backend.

## Features

### Subjects & Grades

- add subjects as "Leistungsfach", "Grundkurs" or other category
- add grades with date, category and notes
- grade overview per subject and semester

### Homework

- create, edit and delete homework
- automatically marks overdue homework

### Schedule

- create your own weekly schedule
- add, update or remove lessons (day, time, subject, room)

### Holidays (via API integration)

- school holidays are fetched via the Holiday API
- Holiday view inside the web app

## Tech Stack

### Frontend

- Vue
- TypeScript
- Tailwind CSS
- Pinia for state management

### Backend

- Node.js + Express
- MongoDB

## Running locally

### Backend

    cd backend
    npm install
    npm run devStart

### Frontend

    npm install
    npm run dev

## Deployment

- Frontend deployed on Netlify
- Backend deployed on Render

https://gradetrackerq.netlify.app/

**Note**: The hosted version currently has some issue and may not work as expected. For the best experience, please run the project locally
