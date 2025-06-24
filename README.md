# Bloggr Frontend

This is the frontend for the **Bloggr** platform, a modern, server-rendered application built with Next.js 14, React, and TypeScript. It is styled with Tailwind CSS for a clean and responsive design.

## ✨ Features

-   **Optimized Rendering:** Uses Server-Side Rendering (SSR) for the main feed for SEO and fast loads, and Static Site Generation (SSG) for individual posts for peak performance.
-   **Rich Text Editor:** A powerful and intuitive [Tiptap](https://tiptap.dev/) editor for creating and editing posts.
-   **Seamless Image Uploads:** Upload images directly from the editor to the backend.
-   **Client-Side Authentication:** Robust authentication flow using React Context to manage user state and protect routes.
-   **Responsive Design:** A fully responsive and modern UI that looks great on all devices, from mobile to desktop.
-   **Component-Based Architecture:** A clean, organized structure with reusable components.

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** [React Context](https://react.dev/learn/passing-data-deeply-with-context)
-   **Rich Text Editor:** [Tiptap](https://tiptap.dev/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   A running instance of the [Bloggr Backend](https://github.com/your-username/your-repo-name/tree/main/bloggr-backend).

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/bloggr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the `bloggr` root directory by copying the example:
```bash
cp .env.local.example .env.local
```
Then, update the file with the URL of your running backend server.

```env
# The public URL of your running backend API
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
bloggr/
├── public/               # Static assets (images, icons)
├── src/
│   ├── app/              # Next.js App Router: pages and layouts
│   │   ├── (auth)/       # Route group for auth pages (e.g. login, signup)
│   │   ├── dashboard/    # Protected user dashboard page
│   │   ├── post/         # Dynamic routes for individual posts
│   │   └── page.tsx      # Homepage (main feed)
│   ├── components/       # Reusable React components
│   │   ├── dashboard/    # Components for the dashboard
│   │   ├── home/         # Components for the homepage/feed
│   │   └── shared/       # Components used across the app (Navbar, Footer, etc.)
│   ├── context/          # React Context providers (e.g., AuthContext)
│   └── lib/              # Library functions, hooks, and utilities
├── .env.local            # Local environment variables
└── package.json
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [React Documentation](https://react.dev/) - learn about React.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn how to use Tailwind CSS.

---

_This README was generated with assistance from an AI pair programmer._
