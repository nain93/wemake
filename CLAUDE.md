# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with HMR at http://localhost:5173
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking with React Router typegen

### Database Commands
- `npm run db:generate` - Generate Drizzle migrations from schema changes
- `npm run db:migrate` - Apply migrations to database
- `npm run db:studio` - Open Drizzle Studio for database management

## Architecture Overview

### Tech Stack
- **Framework**: React Router v7 (SSR-enabled)
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Shadcn UI components with Radix UI primitives
- **Styling**: TailwindCSS with dark mode support
- **AI**: Google Generative AI integration

### Project Structure
```
app/
├── common/
│   ├── components/     # Shared UI components
│   └── pages/         # Page components
├── features/          # Feature-based modules
│   ├── jobs/          # Job-related functionality
│   ├── users/         # User management
│   └── products/      # Product features
├── migrations/        # Database migrations
├── db.ts             # Database connection
├── queries.ts        # Database queries
├── root.tsx          # App root component
└── routes.ts         # Route configuration
```

### Database Schema
- **Users**: Authentication and profile management
- **Jobs**: Job postings with user relationships
- Schemas defined in `app/features/*/schema.ts` pattern

### Key Conventions

#### React Router V7 Patterns
- Import types: `import type { Route } from "./+types/..."`
- Page components receive `Route.ComponentProps` with `loaderData` and `actionData`
- **Never use** `useLoaderData` or `useActionData` hooks
- Export `loader`, `action`, and `meta` functions for each page
- Return plain objects from loaders (no `json()` wrapper)
- Use `data()` for responses with status codes

#### UI Development
- Use Shadcn UI components exclusively (never import from Radix directly)
- TailwindCSS with `class` dark mode
- Functional components with TypeScript interfaces
- Prefer descriptive variable names with auxiliary verbs

#### Database Development
- Schemas follow feature-based organization in `app/features/*/schema.ts`
- Use Drizzle ORM with PostgreSQL
- Generate migrations after schema changes with `npm run db:generate`

#### Import Patterns
- Use `~/*` alias for app directory imports
- Import from "react-router" (never from "@remix-run/*")
- Named exports preferred for components

## Environment Setup
- Requires `DATABASE_URL` environment variable
- Uses Vite for development and building
- TypeScript strict mode enabled