# RedditClone

This project is a full-stack Reddit-like application that replicates the core functionalities of a subreddit. Built as a solo project, it includes both the front-end and back-end, offering a seamless user experience with real-time interactions.

## Live Demo
The project is fully functional and can be viewed at:
[https://readit-app-lf7oz.ondigitalocean.app/](https://readit-app-lf7oz.ondigitalocean.app/)

I am also responsible for hosting this project, which is currently deployed on **Digital Ocean App Platform (VPS).**

## Features
- **User Authentication**: Sign up, log in, and manage your profile with avatar selection.
- **Post Management**: Create, edit, delete, and browse posts.
- **Comments & Voting**: Engage with posts by commenting, upvoting, and downvoting both posts and comments.
- **Filtering & Sorting**: Find posts efficiently with title, content, and author-based filtering. Sort by date, popularity, or activity.
- **Favorites**: Save posts to your favorites and revisit them later.
- **Optimized UI**: Smooth user experience with optimistic UI updates, loaders, shimmers, and toast messages.
- **Security Enhancements**: Input sanitization using `sanitize-html`, `mongo-sanitize`, and `validator`.

## Tech Stack
- **Front-end**: Next.js 14 (App Router), React 18
- **Back-end**: MongoDB + Mongoose (with aggregation pipelines for data processing)
- **Authentication**: NextAuth.js
- **Styling & UI**: Tailwind CSS
- **Security**: bcrypt, validator, sanitize-html, mongo-sanitize
- **Utility Libraries**: Lodash, use-debounce, UUID
- **Icons & Avatars**: Font Awesome, Dicebear (LoreleiNeutral collection)
- **Loaders**: Loading.io
