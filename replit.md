# The Date Alchemy PWA

## Overview

The Date Alchemy is a Progressive Web Application (PWA) designed for matchmaking and dating services in Mauritius, specifically targeting busy professionals. The application features a modern, mobile-first design inspired by popular matchmaking apps like Tinder and Hinge, with swipeable touch-optimized interactions and offline capability. The platform offers two main services: "The Date Alchemy" matchmaking service and "Singles Socials" events/features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18+** with TypeScript for type safety and developer experience
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query v5** for server state management and data fetching
- **Tailwind CSS** for utility-first styling with custom design system

**Design System:**
- Based on **shadcn/ui** components (Radix UI primitives)
- Custom color palette with primary brand color `#f2491b` (vibrant orange-red) and secondary `#100403` (deep almost-black)
- **Open Sans** font family from Google Fonts
- "New York" style variant from shadcn/ui
- Mobile-first responsive design with touch-optimized interactions

**Component Architecture:**
- Functional components with React Hooks
- Shared UI components library in `client/src/components/ui/`
- Page-level components in `client/src/pages/`
- Custom hooks in `client/src/hooks/`
- Utility functions centralized in `client/src/lib/`

**PWA Features:**
- Service Worker implementation for offline capability and caching
- Web App Manifest for installability
- Optimized for mobile devices with portrait-primary orientation
- Touch gestures support (swipe navigation in Questions page)

**Key Pages:**
1. **Home (/)**: Full-viewport hero layout with background image, logo, and two CTA buttons
2. **Auth (/auth)**: Centered card layout for authentication (sign up/log in)
3. **Socials (/socials)**: Grid of tiles for different social features (ice-breaking questions, events)
4. **Questions (/questions)**: Swipeable carousel of ice-breaking questions with touch gesture support

### Backend Architecture

**Technology Stack:**
- **Express.js** server running on Node.js
- **TypeScript** throughout the backend for type safety
- ESM (ES Modules) used instead of CommonJS

**Server Architecture:**
- Minimal API-first design with routes prefixed with `/api`
- Request/response logging middleware for API calls
- Error handling middleware with status code normalization
- Development mode uses Vite middleware for HMR and asset serving
- Production mode serves static files from built assets

**Storage Layer:**
- Abstracted storage interface (`IStorage`) for flexibility
- In-memory storage implementation (`MemStorage`) as default
- Designed to be swapped with database implementations (PostgreSQL planned)
- User management methods: `getUser()`, `getUserByUsername()`, `createUser()`

**Session Management:**
- Prepared for `connect-pg-simple` session store (PostgreSQL-based sessions)
- Cookie-based session handling

### Data Storage

**Database Schema (Planned):**
- **Drizzle ORM** configured for PostgreSQL
- **Neon Database** serverless PostgreSQL as the target platform
- Current schema defines a `users` table with:
  - `id`: UUID primary key (auto-generated)
  - `username`: Unique text field
  - `password`: Text field for hashed passwords
- Schema validation using **Drizzle-Zod** for runtime type checking

**Migration Strategy:**
- Drizzle Kit configured for schema migrations
- Migrations stored in `./migrations` directory
- Push-based deployment with `db:push` command

**Current State:**
- Application currently uses in-memory storage
- Database infrastructure prepared but not yet connected
- Schema and ORM configuration ready for activation

### External Dependencies

**Third-Party UI Libraries:**
- **Radix UI** primitives (v1.x) for accessible, unstyled components:
  - Dialogs, Dropdowns, Tooltips, Popovers, Navigation Menus
  - Forms, Inputs, Checkboxes, Radio Groups, Switches, Sliders
  - Accordions, Tabs, Collapsibles, Carousels
  - All 25+ Radix components integrated
- **shadcn/ui** component system built on top of Radix UI
- **Embla Carousel** for touch-enabled carousel functionality
- **cmdk** for command palette UI patterns
- **Lucide React** for icon system

**Form & Validation:**
- **React Hook Form** for form state management
- **@hookform/resolvers** for validation schema integration
- **Zod** for runtime type validation and schema definition
- **Drizzle-Zod** for database schema to Zod conversion

**Styling & Design:**
- **Tailwind CSS v3+** with custom configuration
- **class-variance-authority** for variant-based component styling
- **clsx** and **tailwind-merge** for conditional class management
- **Autoprefixer** for CSS vendor prefixing

**Data Fetching & State:**
- **TanStack Query v5** for server state, caching, and data synchronization
- Custom query client with configured defaults:
  - Credential-based requests
  - No automatic refetching
  - Infinite stale time
  - Custom error handling for 401 responses

**Database & ORM:**
- **Drizzle ORM v0.39+** for type-safe database operations
- **@neondatabase/serverless** for PostgreSQL connection pooling
- **Drizzle Kit** for migrations and schema management

**Development Tools:**
- **@replit/vite-plugin-runtime-error-modal** for error overlay
- **@replit/vite-plugin-cartographer** for development tooling
- **@replit/vite-plugin-dev-banner** for development environment indication
- **tsx** for TypeScript execution in development
- **esbuild** for production server bundling

**Utilities:**
- **date-fns** for date manipulation and formatting
- **nanoid** for generating unique identifiers

**Fonts:**
- **Google Fonts** (Open Sans family, weights 300-800)

**PWA Infrastructure:**
- Service Worker for offline-first architecture
- Cache-first strategy for static assets
- Network-first strategy for dynamic content

**Not Yet Integrated:**
- PostgreSQL database (configured but connection pending)
- Authentication system (UI ready, backend implementation pending)
- Session management (dependencies installed but not implemented)
- API routes (framework ready, endpoints to be defined)