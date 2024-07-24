# Vue Project with ShadCN and Tailwind CSS

This Vue.js application uses [ShadCN Vue](https://www.shadcn-vue.com/) and [Tailwind CSS](https://tailwindcss.com/) for styling and includes full CRUD functionality for job management.

- **ShadCN For Vue**: A set of UI components designed for use with Vue.js, providing a modern and customizable design system.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid and responsive design by applying utility classes directly in the HTML.

The project uses [JSON Server](https://github.com/typicode/json-server) to provide a simple backend with CRUD endpoints.

## Instructions to Run

### Install Dependencies

```bash
npm install
```

### Run JSON Server for backend

The JSON Server uses `src/data.json` to provide job data through API endpoints on <http://localhost:4777>

```bash
npm run server
```

### Run Vite Frontend

```bash
npm run dev
```

## Inspiration

This project was inspired by [Brad Traversy’s YouTube video](https://www.youtube.com/watch?v=VeNfHj6MhgA). After seeing the video, I decided to create my own version using ShadCN and Vue.js. I wanted to explore these technologies and put my spin on the concept presented.
