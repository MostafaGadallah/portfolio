# Mostafa Mahmoud Portfolio

A modern, responsive portfolio website for Mostafa Mahmoud, designed to position him as a backend-focused software engineering student and full-stack developer.

## Overview

This project presents Mostafa as a Computer Science student at Helwan University with a primary focus on backend development, software engineering, REST APIs, databases, authentication, authorization, real-world business logic, and practical engineering workflows.

## Technologies

- React
- TypeScript
- Vite
- CSS Modules / custom CSS
- React Router
- React Hook Form
- Zod
- Lucide React

## Features

- Responsive landing page with dark/light mode
- Section-based portfolio experience
- Project filtering and case study routes
- Contact form with client-side validation
- SEO metadata and accessible structure
- Mobile navigation and keyboard-friendly interactions
- Responsive project cards and profile information blocks

## Project structure

```text
src/
  App.tsx
  App.css
  index.css
  main.tsx
public/
  favicon.svg
  robots.txt
  sitemap.xml
  images/
    profile/
      profile-placeholder.svg
    projects/
      project-placeholder-1.svg
      project-placeholder-2.svg
      project-placeholder-3.svg
      project-placeholder-4.svg
      project-placeholder-5.svg
```

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Environment variables

This portfolio does not require secret environment variables for a static frontend build. If a backend email service or CMS is added later, store credentials in environment variables and avoid hard-coding secrets.

## Deployment

The site is ready for deployment on Vercel, Netlify, or Cloudflare Pages. Use the standard Vite build command and deploy the generated `dist` directory.

## How to replace personal information

Edit the data arrays in `src/App.tsx` to update:

- name
- roles
- contact details
- education information
- experience entries
- certification list
- volunteering details
- social links

## How to replace project images

Replace the SVG placeholders under `public/images/projects/` with your own files or update the `image` field for each project inside the `projects` array in `src/App.tsx`.

## How to add projects

Add a new object to the `projects` array in `src/App.tsx` and include:

- `slug`
- `name`
- `summary`
- `description`
- `tech`
- `keyFeatures`
- `github`
- `demo`
- `image`
- `problem`
- `goals`
- `architecture`
- `userRoles`
- `workflows`
- `highlights`

## How to update certifications

Update the `certifications` array in `src/App.tsx` with the relevant title, organization, duration, and details.

## How to update experience

Update the `experience` array in `src/App.tsx` to reflect internships, training programs, or work history.

## How to configure contact form

The current form validates input on the frontend and displays a success state. To connect it to an email service or backend endpoint, replace the `onSubmit` handler in `ContactForm` with your email API integration logic.
