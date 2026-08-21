# Trackademy Landing Page Component (Tailwind CSS Ready)

A fully modular, self-contained, responsive, and Tailwind CSS-compatible React component for the Trackademy landing page.

---

## 🚀 How to use this component in another project

### Step 1: Copy the `LandingPage` folder
Copy the entire folder:
```
src/components/LandingPage/
```
into your new project's `src/components/` (or `components/` in Next.js) directory.

Everything needed by the landing page (all subcomponents, styles, icons, and assets) is entirely self-contained inside this single folder!

---

### Step 2: Import & Use the Component

In any page or component of your project:

```jsx
import React from 'react';
import LandingPage from './components/LandingPage'; // or '@/components/LandingPage'

export default function HomePage() {
  return (
    <LandingPage
      onLoginClick={() => console.log('Login clicked')}
      onGetStarted={() => console.log('Get Started clicked')}
      onBookDemo={() => console.log('Book Demo clicked')}
      onContactSubmit={(formData) => console.log('Contact form:', formData)}
    />
  );
}
```

---

## 🎨 Tailwind CSS Compatibility Features

1. **Preflight-Safe**: Resets applied by Tailwind CSS Preflight (`margin`, `padding`, `line-height`, `button` backgrounds, `a` link styles, and `border-color`) will **not** break this component.
2. **No Class Clashes**: Replaces generic `.container` conflicts with isolated `.tlp-container` styling.
3. **Google Fonts Included**: Automatically imports `Barlow`, `Inter`, `Roboto`, and `Plus Jakarta Sans` inside `landing-page.css`.
4. **Scoped CSS Variables**: All design tokens use `--tlp-*` variables under `.trackademy-landing-root`.
5. **Individual Section Exports**: You can also import subcomponents individually if needed:
   ```jsx
   import { Navbar, Hero, Feature, Overview, Faq, Team, Contact, Footer } from './components/LandingPage';
   ```

---

## 📁 Component Structure

```
LandingPage/
├── index.js                     # Main entry export
├── LandingPage.jsx              # Main LandingPage wrapper component
├── README.md                    # Documentation & usage guide
├── components/                  # Subcomponents
│   ├── Navbar.jsx               # Sticky navbar with mobile drawer
│   ├── Hero.jsx                 # Hero banner with action CTAs & badges
│   ├── Feature.jsx              # 6 core feature cards
│   ├── Overview.jsx             # Portals overview with responsive mockups
│   ├── Faq.jsx                  # Accordion FAQ
│   ├── Team.jsx                 # Team member cards with social links
│   ├── Contact.jsx              # Contact form & location info
│   └── Footer.jsx               # Dark theme footer with newsletter
├── assets/                      # Co-located SVG and PNG assets
└── styles/                      # Scoped & Tailwind-safe CSS files
    ├── landing-page.css         # Font imports & base resets
    ├── navbar.css
    ├── hero.css
    ├── feature.css
    ├── overview.css
    ├── faq.css
    ├── team.css
    ├── contact.css
    └── footer.css
```
