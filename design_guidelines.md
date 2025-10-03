# The Date Alchemy PWA - Design Guidelines

## Design Approach
Reference-based approach inspired by modern matchmaking apps (Tinder, Hinge) with professional dating service aesthetics. Focus on swipeable, touch-optimized interactions with offline PWA capability.

## Color Palette
**Primary Brand Color:** #f2491b (Vibrant Orange-Red)
- Use for all buttons, CTAs, and accent elements
- Primary interactive elements and brand moments

**Secondary Color:** #100403 (Deep Almost-Black)
- Use for text, backgrounds, and grounding elements
- Creates strong contrast with primary color

**Supporting Colors:**
- White/Light backgrounds for content cards
- Semi-transparent overlays for image-based sections

## Typography
**Font Family:** Open Sans (Google Fonts)
- Headings: Open Sans, weights 600-700
- Body text: Open Sans, weight 400
- Buttons/CTAs: Open Sans, weight 600

**Scale:**
- Hero Title: text-4xl to text-6xl (responsive)
- Section Headings: text-2xl to text-3xl
- Body/Questions: text-lg to text-xl
- Button Text: text-base to text-lg

## Layout System
**Spacing:** Use Tailwind units of 4, 6, 8, 12, 16, 20
- Mobile padding: p-6, p-8
- Desktop padding: p-12, p-16, p-20
- Component gaps: gap-4, gap-6, gap-8

## Core Components

### Home Page (/)
- **Full-viewport hero layout** (min-h-screen) with full-screen background image
- Logo placeholder in top-left corner (absolute positioning)
- Centered content: Large heading "Redefining Dating for Busy Professionals in Mauritius"
- Subtitle below: "Relationship Science Based Match Making"
- Two prominent buttons at bottom-center (mb-12 to mb-16):
  - "The Date Alchemy" button (primary orange)
  - "Singles Socials" button (primary orange)
- Buttons with hover scale effects

### Authentication Page (/auth)
- Centered card layout with max-w-md
- Simple form with Email and Password fields
- Two action buttons: "Sign Up" (primary) and "Log In" (outline)
- Minimal styling - placeholder for future authentication

### Singles Socials Page (/socials)
- Responsive grid: grid-cols-1 md:grid-cols-2 gap-6
- Four image-based tiles:
  - Tile 1: "Ice Breaking Questions" (clickable, links to /questions)
  - Tiles 2-4: "Under Progress" overlay text
- Each tile: aspect-ratio-square, rounded corners, hover effects

### Ice Breaking Questions Page (/questions)
- **Featured image at top** (large, prominent placeholder)
- Large, clear question text below image (text-2xl, centered)
- Swipeable touch interface:
  - Swipe right: next question (smooth transition)
  - Swipe left: previous question
  - Mobile-optimized touch gestures
- Question array with 100-150 questions including specified examples
- Clean, distraction-free layout focused on question content

## Images
**Hero Section (Home Page):**
- Full-viewport background image
- Should convey: professional dating, Mauritius context, sophistication
- Image overlay with dark gradient for text readability

**Ice Breaking Questions:**
- Large featured image placeholder at top of questions interface
- Relevant to dating/connection themes
- Aspect ratio: 16:9 or similar landscape orientation

**Singles Socials Tiles:**
- Four image-based tiles for grid display
- Tile 1: Ice Breaking Questions theme
- Tiles 2-4: Placeholder images for future features

## PWA Configuration
- Standalone display mode
- Theme color: #f2491b
- Status bar styling to match brand
- Touch-optimized tap targets (min 44px)
- Smooth transitions between views

## Interactions & Animations
- Smooth page transitions (fade/slide effects)
- Button hover: scale(1.05), no state changes for outline buttons on images
- Swipe gestures: momentum-based, spring animations
- Card reveals: subtle fade-in on grid items
- Keep animations minimal and purposeful

## Accessibility
- High contrast between primary orange and dark backgrounds
- Minimum touch target sizes: 44x44px
- Clear focus states for keyboard navigation
- Readable text sizes across all devices

## Responsive Behavior
- Mobile-first approach
- Hero: full-screen on all devices
- Socials grid: 1 column mobile, 2x2 desktop
- Questions: single column, full-width on all sizes
- Navigation: mobile-optimized, collapsible if needed