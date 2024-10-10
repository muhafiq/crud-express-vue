# CRUD Project Using Express and Vue 3

This project is the sample of backend and frontend integration using ExpressJs and VueJs.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend (Express.js)](#backend-expressjs)
- [Frontend (Vue.js)](#frontend-vuejs)

## Features
List the main features of the application:
- Authetication & Authorization
- Basic crud user with product

## Technologies Used
- **Backend:** Express.js, Prisma, Joi (Validation), Winston (Logging), Jest (Unit Test)
- **Frontend:** Vue.js, Tailwindcss 
- **Database:** Mysql

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Clone the Repository
```bash
git clone https://github.com/muhafiq/crud-express-vue.git
cd crud-express-vue
```

This project don't have integration development between the frontend and backend. So you must focus on one, backend or frontend to do development.

# How to do development?

## Backend (Express.js)

1. Install the dependencies
```bash
cd backend && npm install
```

2. Configure the environtment variables
```bash
cp .env-example .env
```
Fill the environtment variables with your own.

3. Run the project
```bash
npm run dev
```

## Frontend (Vue.js)

1. Install the dependency
```sh
cd frontend && npm install
```

2. Compile and Hot-Reload for Development
```sh
npm run dev
```

3. Compile and Minify for Production
```sh
npm run build
```

4. Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```