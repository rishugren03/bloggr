# Bloggr - Frontend

This is the frontend for the Bloggr platform, a personal blog where users can sign up, log in, and share their posts. It is a modern, server-rendered application built with Next.js 14 and TypeScript, and styled with Tailwind CSS.

## Features

-   **Server-Side Rendering (SSR):** The homepage is server-rendered for fast initial load times and SEO benefits.
-   **Static Site Generation (SSG):** Individual blog posts are pre-rendered as static pages for maximum performance.
-   **Rich Text Editor:** A beautiful Tiptap-based editor for creating and editing posts.
-   **Image Uploads:** Seamlessly upload images directly from the editor.
-   **Authentication:** Client-side auth handling with protected routes and context management.
-   **Responsive Design:** Clean, modern, and responsive UI that works on all devices.

## Getting Started

### Prerequisites

-   Node.js (v18 or newer)
-   A running instance of the [Bloggr Backend](<link-to-your-backend-repo>).

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>/bloggr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the `bloggr` root directory and add the following variable. It should point to the URL where your backend is running.

```env
# The URL of your running backend server
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

-   `src/app/`: Contains all the pages and routes for the application, following the App Router convention.
-   `src/components/`: Reusable React components used across different pages.
    -   `dashboard/`: Components specific to the user dashboard.
    -   `home/`: Components for the main homepage/feed.
    -   `shared/`: Components used everywhere, like the Navbar and Footer.
-   `src/context/`: Holds the `AuthContext` for managing user authentication state.
-   `public/`: Static assets like images and SVGs.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
