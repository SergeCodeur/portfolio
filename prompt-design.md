# Prompts Design IA - Portfolio Anani Serge
## 7 Sections + Charte Graphique Cohérente

---

## 🎨 CHARTE GRAPHIQUE GLOBALE (À mentionner dans CHAQUE prompt)

```
Style général : Modern, Premium, Dark theme, Awwwards-worthy
Couleurs : 
- Background principal : #0a1628 (bleu marine profond)
- Surface/Cards : #152238 (bleu marine plus clair)
- Accent principal : #ffd966 (jaune/or lumineux)
- Texte : Blanc (#ffffff) avec variations d'opacité (100%, 70%, 50%)
- Bordures : rgba(255, 255, 255, 0.1)

Typographie :
- Headlines : Clash Display ou Eurostile Extended (bold, étendu, moderne)
- Body : Inter ou SF Pro (clean, lisible)

Effets visuels :
- Glassmorphism subtil (backdrop-blur, bordures fines lumineuses)
- Gradients discrets (jamais trop agressifs)
- Ombres douces avec glow sur éléments jaunes
- Micro-animations élégantes au hover

Design inspirations : Apple, Stripe, Linear, Vercel, Awwwards winners
Ambiance : Professionnel mais moderne, Tech-forward, Premium, Confiance
```

---

## 📋 PROMPT 1 : SECTION SERVICES

```
Create a modern services section for a web developer portfolio website. 

CONTEXT:
- This follows directly after the hero section shown in the reference image
- Target audience: Entrepreneurs and businesses needing web development + automation
- Must feel premium and results-oriented

DESIGN SPECIFICATIONS:

Layout (Desktop):
- Section title centered: "Ce que je propose" (48px, Clash Display, white)
- Subtitle below: "Des solutions web qui génèrent des résultats" (18px, Inter, 70% opacity)
- 3 service cards in a horizontal grid, equal width, 32px gap between cards
- Container max-width: 1280px, section padding: 120px vertical, 80px horizontal

Service Cards Design:
- Background: rgba(255, 255, 255, 0.03) with backdrop-blur(12px)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 20px
- Padding: 48px 40px
- On hover: subtle scale(1.02) + border changes to #ffd966 glow

Each card contains:
1. Icon at top (64x64, custom illustrated, minimalist, white with yellow accent)
   - Card 1: Code/Development icon
   - Card 2: Lightning/Automation icon  
   - Card 3: Dashboard/Analytics icon

2. Service title (24px, Clash Display, weight 600, white)
   - "Développement Web Full-Stack"
   - "Automatisation Intelligente"
   - "Dashboards Analytiques"

3. Description (16px, Inter, 70% opacity, 3-4 lines)
   - Card 1: "Applications web sur mesure avec React, Vue et Next.js. Interface moderne, performante et responsive."
   - Card 2: "Connectez vos outils avec n8n, Make ou Zapier. Automatisez les tâches répétitives et gagnez du temps."
   - Card 3: "Visualisez vos données en temps réel. KPIs, rapports automatiques et insights actionnables."

4. Starting price at bottom (18px, #ffd966, semi-bold)
   - "À partir de 1 500€"
   - "À partir de 800€"
   - "À partir de 1 200€"

Mobile Adaptation:
- Stack cards vertically
- Reduce padding to 32px 24px
- Font sizes: Title 32px, service titles 20px, body 16px

Visual Style:
- Dark theme (#0a1628 background, #152238 cards)
- Glassmorphism effect
- Subtle gradient overlays
- Clean, spacious, premium feel
- Awwwards-level quality

Avoid: Generic stock imagery, overly colorful elements, cluttered layouts
```

---

## 📋 PROMPT 2 : SECTION PROJETS (GRID)

```
Design a stunning portfolio projects grid section for an award-winning web developer portfolio.

CONTEXT:
- Showcase 6 completed web development projects
- Each project opens a detailed modal on click
- Must feel interactive, premium, and impressive
- This is the HERO section of the portfolio (most important)

DESIGN SPECIFICATIONS:

Section Header:
- Title: "Projets qui parlent d'eux-mêmes" (48px, Clash Display, centered, white)
- Subtitle: "Chaque ligne de code pensée pour un impact business mesurable" (18px, Inter, 70% opacity)
- Filter tabs below subtitle: [Tous | Dashboards | E-commerce | SaaS | Automatisation]
  - Pills style, 14px, padding 8px 20px
  - Active state: yellow (#ffd966) background, dark text
  - Inactive: transparent with white border, white text

Projects Grid:
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 32px between items
- Each card aspect ratio: 4:3 (landscape)

Project Card Design:
- Image: Full-bleed project screenshot/mockup (high quality, realistic)
- Default state: Image with dark gradient overlay (bottom to top, 0% to 60% opacity)
- Card has subtle border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 16px
- Info overlay at bottom (always visible):
  - Project title (20px, Clash Display, white, semi-bold)
  - Tech tags below (React, n8n, PostgreSQL) - small pills, 12px
  - Badge top-right: "B2B" or "B2C" (yellow pill)

Hover State:
- Overlay darkens to 80% opacity
- "Voir le projet →" button appears centered (yellow background, dark text, 16px)
- Subtle scale(1.05) transform
- Border glows yellow
- Smooth transition (0.3s ease)

Project Examples to Show:
1. "Dashboard Marketing Agence" - Tags: React, n8n, Charts - B2B - €3,200
2. "Plateforme Réservation Salon" - Tags: Next.js, Stripe, SMS - B2C - €2,800  
3. "CRM Immobilier + AI" - Tags: Vue, PostgreSQL, ML - B2B - €4,200
4. "Tracker Crypto SaaS" - Tags: Svelte, APIs, Real-time - B2C - €4,500
5. "E-commerce + Analytics" - Tags: Next.js, Shopify, ML - B2C - €3,500
6. "Système Restaurant QR" - Tags: React Native, n8n - B2B - €3,200

Visual Style:
- Dark background (#0a1628)
- High-contrast, sharp images
- Premium feel with subtle animations
- Glassmorphism touches on tags
- Mobile-first responsive

Reference Inspiration: Awwwards, Behance portfolio grids, Apple product pages
Quality: Award-winning, world-class, magazine-quality
```

---

## 📋 PROMPT 3 : MODALE PROJET (DETAIL)

```
Design a full-screen project detail modal for a premium web developer portfolio.

CONTEXT:
- Opens when user clicks on a project card
- Should tell a complete project story: problem → solution → results
- Must feel immersive and professional, like a case study

MODAL STRUCTURE:

Container:
- Full-screen overlay (100vw x 100vh)
- Backdrop: rgba(10, 22, 40, 0.95) with backdrop-blur(20px)
- Content area: Centered, max-width 1100px, scrollable
- Close button (X) top-right: white icon, 32x32, hover: yellow

Hero Section:
- Large project hero image at top (16:9 aspect ratio, 1100px wide)
- Can be: Dashboard screenshot, app preview, or video embed
- Border-radius: 16px
- Below image: Project title (40px, Clash Display, white)
- Project type badge: "B2B Dashboard" (yellow pill, right aligned)

Content Layout (Vertical scroll):

1. Introduction Block:
   - Icon: 📊 (48px)
   - Heading: "Le Projet" (28px, Clash Display)
   - Description: 2-3 sentences explaining what was built (16px, Inter, 70% opacity)

2. Challenge Block:
   - Icon: 💡
   - Heading: "Le Défi"
   - Description: Client's problem/pain point

3. Solution Block:
   - Icon: 🎯
   - Heading: "La Solution"
   - Bullet list with checkmarks (each 16px):
     • Dashboard temps réel avec visualisations KPIs
     • Automatisation n8n : synchronisation multi-sources
     • Rapports PDF générés automatiquement
     • Système d'alertes intelligent

4. Results Block (Most Important):
   - Icon: 📈
   - Heading: "Les Résultats"
   - Stats in grid (2 columns):
     [Icon] 96h/an économisées
     [Icon] +15% tarifs augmentés
     [Icon] 2 nouveaux clients signés
     [Icon] ROI en 3 mois
   - Each stat: large number (32px, yellow), description below (14px, white 70%)

5. Tech Stack:
   - Heading: "Stack Technique" (24px)
   - Pills/chips grid: [React] [PostgreSQL] [n8n] [Recharts] [Express] [Vercel]
   - Each pill: glassmorphism style, 14px, padding 8px 16px

6. Screenshots Gallery:
   - Heading: "Aperçu" (24px)
   - 4-6 images in 2-column grid
   - Each image: border-radius 12px, hover: subtle zoom
   - Lightbox on click (optional)

7. Testimonial (if available):
   - Quote icon
   - Text: "Anani a transformé notre façon de travailler..." (20px, italic)
   - Author: Name + Title + Company (14px, yellow name)
   - Star rating: ⭐⭐⭐⭐⭐

8. Call-to-Actions (Bottom):
   - Two buttons side-by-side:
     • [🔗 Voir la démo live] (yellow, bold)
     • [💾 Télécharger case study] (outline, white border)

Design Details:
- Background: #152238 (lighter than main bg)
- Generous white space (60px between sections)
- Icons: custom illustrated or lucide-react, yellow accent
- Smooth entrance animation (slide up + fade)
- Mobile: Full screen, single column, reduce font sizes

Visual Quality:
- Professional case study feel
- Apple-like attention to detail
- Award-winning presentation
- High contrast, readable
```

---

## 📋 PROMPT 4 : SECTION PROCESSUS (TIMELINE)

```
Design an elegant horizontal timeline section showing a web developer's work process.

CONTEXT:
- Explains the 5-step process from first contact to project delivery
- Must build trust and transparency
- Interactive and visually engaging

DESIGN SPECIFICATIONS:

Section Header:
- Title: "Comment je travaille avec vous" (48px, Clash Display, centered, white)
- Subtitle: "Un processus éprouvé, des résultats garantis" (18px, Inter, 70% opacity, centered)

Timeline Design (Desktop):

Layout:
- Horizontal line connecting 5 steps (2px solid, rgba(255,255,255,0.2))
- Line spans ~80% of container width (max 1000px)
- 5 circular nodes on the line, evenly spaced

Each Node:
- Circle: 72px diameter
- Background: gradient (dark blue to lighter blue)
- Border: 3px solid #ffd966 (yellow)
- Step number inside: 48px, Clash Display, white, centered
- On hover: gentle pulse animation + glow effect

Below Each Node (Step Card):

1. STEP 1 - Découverte
   - Icon: 📞 (32px)
   - Title: "Découverte" (24px, Clash Display)
   - Duration: "30 min" (16px, yellow)
   - Detail: "Gratuit" (14px, green accent)
   - Description: "Appel pour comprendre votre vision et vos objectifs"

2. STEP 2 - Devis & Validation
   - Icon: 💰
   - Title: "Devis & Validation"
   - Duration: "48h max"
   - Description: "Proposition détaillée avec prix fixe et timeline"

3. STEP 3 - Conception Design
   - Icon: 🎨
   - Title: "Conception Design"
   - Duration: "1-2 semaines"
   - Detail: "Figma + Révisions"
   - Description: "Maquettes interactives avant tout développement"

4. STEP 4 - Développement
   - Icon: 💻
   - Title: "Développement"
   - Duration: "Selon projet"
   - Detail: "Updates hebdo"
   - Description: "Code propre, tests rigoureux, déploiement continu"

5. STEP 5 - Livraison
   - Icon: 🚀
   - Title: "Livraison & Formation"
   - Duration: "1 jour"
   - Detail: "Support inclus"
   - Description: "Formation équipe + documentation complète + 60j support"

Card Design:
- Each card below its node
- Background: rgba(255, 255, 255, 0.03), glassmorphism
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 16px
- Padding: 32px 24px
- Width: 220px
- On hover: lift effect (translateY(-8px))

Mobile Adaptation:
- Vertical stepper instead of horizontal
- Nodes connected by vertical line (left side)
- Cards stack below each node
- Simpler animations

Visual Style:
- Dark background (#0a1628)
- Clean, professional
- Yellow accents on active/hover states
- Smooth transitions between steps
- Arrow indicators between steps (optional)

Inspiration: Stripe onboarding, Apple product timelines, Linear feature pages
```

---

## 📋 PROMPT 5 : SECTION EXPERTISE (TECH STACK)

```
Design a modern technology stack showcase section for a full-stack developer portfolio.

CONTEXT:
- Showcase mastery of 30+ technologies
- Must feel comprehensive yet organized
- Should impress technical recruiters and clients
- Balance between visual appeal and information density

DESIGN SPECIFICATIONS:

Section Header:
- Title: "Technologies maîtrisées" (48px, Clash Display, centered, white)
- Subtitle: "Stack moderne pour des solutions performantes et scalables" (18px, Inter, 70% opacity)

Layout Structure:
- Bento Grid / Masonry style layout
- 4 main category blocks, unequal sizes for visual interest
- Container: max-width 1200px, padding 120px vertical

Category Blocks:

BLOCK 1 - Frontend (Largest block, top-left)
- Heading: "Frontend" (24px, Clash Display, yellow)
- Icons grid 3x3:
  • React (with official logo, 56px)
  • Vue.js
  • Next.js
  • Tailwind CSS
  • TypeScript
  • Framer Motion
  • Vite
  • SvelteKit
  • Figma

BLOCK 2 - Backend (Top-right, medium)
- Heading: "Backend" (24px, yellow)
- Icons grid 3x2:
  • Node.js
  • Express
  • Fastify
  • Python
  • PostgreSQL
  • Prisma

BLOCK 3 - Automatisation (Bottom-left, medium)
- Heading: "Automatisation & APIs" (24px, yellow)
- Icons grid 2x2:
  • n8n (prominent)
  • Make
  • Zapier
  • REST APIs

BLOCK 4 - DevOps & Tools (Bottom-right, smaller)
- Heading: "DevOps & Cloud" (24px, yellow)
- Icons grid 2x3:
  • Vercel
  • Railway
  • Supabase
  • GitHub
  • Docker
  • Redis

Tech Icon Design:
- Each icon: 48x48 to 56x56
- Official brand colors when available
- Subtle glassmorphism background circle/square
- Icon + name below (14px, white)
- Hover state: 
  • Icon rotates 5deg
  • Background glows (brand color or yellow)
  • Slight scale(1.1)
  • Tooltip appears with "Expertise level: Advanced"

Block Container Design:
- Background: rgba(255, 255, 255, 0.03)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 20px
- Padding: 40px 32px
- Gap between icons: 24px
- Hover: border subtle yellow glow

Additional Visual Elements:
- Subtle grid pattern in background (optional)
- Connecting lines between related techs (very subtle, optional)
- Animated gradient orbs in background (subtle, slow movement)

Mobile Adaptation:
- Stack blocks vertically
- 2 columns of icons per block
- Reduce icon size to 40x40
- Maintain spacing and readability

Visual Quality:
- Clean, organized, professional
- Not overwhelming despite many items
- Brand colors respected
- Premium feel
- Similar to: GitHub profile, Linear careers page, Vercel showcase

Avoid: 
- Skill bars (outdated)
- Percentage ratings
- Too many colors fighting each other
```

---

## 📋 PROMPT 6 : SECTION TÉMOIGNAGES

```
Design an elegant testimonials carousel section for a web developer portfolio.

CONTEXT:
- Showcase client satisfaction and project results
- Build trust with potential clients
- Can include real testimonials or well-crafted fictional ones
- Should feel authentic, not salesy

DESIGN SPECIFICATIONS:

Section Header:
- Title: "Ce que disent mes clients" (48px, Clash Display, centered, white)
- Subtitle: "Leur satisfaction, ma plus grande récompense" (18px, Inter, 70% opacity, centered)

Carousel Design:

Main Testimonial Card (Center):
- Width: 800px max (desktop), full width minus padding (mobile)
- Background: rgba(255, 255, 255, 0.03) with backdrop-blur
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 24px
- Padding: 56px 48px
- Centered on screen

Card Contents (Top to Bottom):

1. Quote Icon (top-left)
   - Large stylized quote marks " " (80px, yellow, opacity 20%)
   - Decorative element

2. Star Rating
   - 5 stars (⭐⭐⭐⭐⭐) (20px each, yellow #ffd966)
   - Centered or left-aligned

3. Testimonial Text
   - Main quote (22px, Inter, white, line-height 1.6, italic)
   - Example: "Anani a dépassé toutes nos attentes. Le dashboard a complètement transformé notre façon de travailler. Nous avons vu un ROI immédiat et nos équipes sont ravies de l'outil."
   - Max 3-4 lines
   - Keep it authentic and specific

4. Client Info (Bottom)
   - Layout: Horizontal flex (photo + text)
   - Client photo: 64px circle, left side, professional headshot
   - Text right of photo:
     • Name: (18px, Clash Display, white, semi-bold) "Marie Kouassi"
     • Title + Company: (14px, Inter, 70% opacity) "Directrice Marketing, Digital Boost Agency"
     • Location (optional): "Cotonou, Bénin" (12px, 50% opacity)

Navigation Controls:

- Previous/Next arrows on sides:
  • Large circular buttons (56px diameter)
  • Icon: ← and → (24px, white)
  • Background: rgba(255, 255, 255, 0.05)
  • Border: 1px solid rgba(255, 255, 255, 0.1)
  • Hover: yellow border + slight scale
  • Position: Outside card on desktop, below card on mobile

- Dots Indicator (Bottom center):
  • 3-5 dots (●○○)
  • Active dot: yellow, larger
  • Inactive: white 30% opacity, smaller
  • Clickable to navigate
  • Gap: 12px between dots

Alternative Design (If no real testimonials yet):

Replace with "Garanties & Engagements" section:
- Grid of 4 guarantee cards (2x2)
- Each card (200x200px):
  1. ✅ Livraison dans les délais - Icon + text
  2. ✅ 60-90 jours de support - Icon + text
  3. ✅ Code source documenté - Icon + text
  4. ✅ Formation équipe incluse - Icon + text

- Card design:
  • Glassmorphism background
  • Centered icon (48px, yellow)
  • Title below (16px, white, semi-bold)
  • Small description (14px, 70% opacity)

Mobile Adaptation:
- Full width card with side padding
- Stack controls below (arrows + dots)
- Reduce font sizes: Quote 18px, name 16px
- Photo 48px

Animation:
- Smooth slide transition between testimonials (0.5s ease)
- Auto-rotate every 6 seconds (pause on hover)
- Entrance: fade + slide from right

Visual Style:
- Elegant, trustworthy
- Not overly promotional
- Human and authentic feel
- Premium presentation

Inspiration: Apple testimonials, Stripe customer stories, Shopify success stories
```

---

## 📋 PROMPT 7 : SECTION CONTACT (CTA FINAL)

```
Design a compelling final call-to-action contact section for a freelance web developer portfolio.

CONTEXT:
- Last opportunity to convert visitors into clients
- Must be inviting, clear, and low-pressure
- Goal: Book a free 30-minute discovery call
- Should feel personal and approachable

DESIGN SPECIFICATIONS:

Section Layout:
- Full-width section, centered content
- Background: Slightly lighter than main background (#152238)
- Or: Gradient background (subtle dark blue to darker)
- Padding: 120px vertical, generous horizontal padding
- Max content width: 800px, centered

Content Structure (Vertical stack, centered):

1. Main Headline:
   - Text: "Prêt à transformer votre business ?" 
   - Or: "Discutons de votre projet"
   - Font: 56px (mobile: 36px), Clash Display, white, bold
   - Centered alignment

2. Subheadline:
   - Text: "Réservons 30 minutes pour parler de votre vision."
   - Line 2: "Sans engagement. 100% gratuit."
   - Font: 20px (mobile: 18px), Inter, 70% opacity
   - Centered, max-width 600px
   - Spacing: 24px below headline

3. Primary CTA Button (Hero):
   - Text: "📅 Réserver un appel gratuit" or "Démarrer mon projet"
   - Style: 
     • Large button: padding 20px 48px
     • Background: #ffd966 (yellow)
     • Text: #0a1628 (dark blue), 18px, bold
     • Border-radius: 12px
     • Hover: scale(1.05) + shadow glow
     • Cursor: pointer with custom hover effect
   - Position: Centered, 40px below subheadline

4. Divider:
   - Text: "ou écrivez-moi directement :" (16px, 50% opacity)
   - Centered, 48px below CTA button

5. Contact Information Grid (Horizontal layout):
   - Email card:
     • Icon: 📧 (32px)
     • Text: "serge@example.com" (18px, clickable link, yellow on hover)
     • Background: glassmorphism card
     • Padding: 24px, border-radius: 12px
   
   - Phone card:
     • Icon: 📱 (32px)
     • Text: "+229 XX XX XX XX" (18px, clickable, yellow on hover)
     • Same style as email card
   
   - Gap between cards: 24px
   - Mobile: Stack vertically

6. Social Links (Bottom):
   - Row of social icons (48px each, circular)
   - Icons: LinkedIn, GitHub, Twitter/X, (Email optional)
   - Style:
     • Background: rgba(255, 255, 255, 0.05)
     • Border: 1px solid rgba(255, 255, 255, 0.1)
     • Icon: white, 24px
     • Hover: yellow border + yellow icon + lift effect
     • Gap: 16px between icons
   - Position: Centered, 48px below contact cards

Optional Elements:

A. Availability Badge:
   - Small pill/badge near headline
   - Text: "🟢 Disponible pour nouveaux projets" 
   - Or: "⚠️ Places limitées : 2 projets/mois"
   - Style: Small (14px), glassmorphism, yellow text
   - Position: Above headline or floating top-right

B. Quick Stats Row (Above headline):
   - 3 small stats in a row:
     • "⚡ Réponse en 24h"
     • "🎯 +15 projets livrés"
     • "⭐ 4.9/5 satisfaction"
   - Each: 14px, 70% opacity, icon + text
   - Subtle, builds trust

Alternative Design (With Form):

If including an inline contact form:
- Form appears below "ou écrivez-moi" divider
- Fields (all with glassmorphism style):
  1. Name (input, 48px height)
  2. Email (input, 48px height)
  3. Project Type (dropdown: Dashboard/E-commerce/SaaS/Autre)
  4. Message (textarea, 120px height)
  5. Submit button (same style as primary CTA)
- Form width: 600px max
- Fields: 16px spacing between
- Labels: 14px, white 70%, above fields
- Inputs: 
  • Background: rgba(255, 255, 255, 0.05)
  • Border: 1px solid rgba(255, 255, 255, 0.1)
  • Text: white
  • Focus: yellow border
  • Placeholder: 50% opacity

Visual Details:
- Background option: Animated gradient orbs (slow, subtle)
- Or: Geometric pattern (very subtle, low opacity)
- Smooth animations on all interactions
- High contrast for accessibility
- Clear hierarchy: CTA is the star

Mobile Adaptation:
- Stack all elements vertically
- Full-width CTA button (minus padding)
- Reduce font sizes appropriately
- Maintain generous spacing
- Easy thumb-reach for buttons

Mood & Feel:
- Inviting but professional
- "Let's work together" energy
- Low-pressure, friendly tone
- Clear value proposition
- Premium but approachable

Inspiration: Stripe contact, Linear careers CTA, Apple Support contact, Vercel partnerships
Avoid: Aggressive sales language, too many options, cluttered design
```

---

## 🎯 INSTRUCTIONS GÉNÉRALES POUR L'IA

**À ajouter à chaque prompt** :

```
DESIGN QUALITY REQUIREMENTS:
- Award-winning quality (Awwwards / CSS Design Awards level)
- Modern 2024 trends (glassmorphism, subtle gradients, micro-interactions)
- Accessibility: WCAG AA compliant (contrast ratios, focus states)
- Performance: Optimized for fast loading (WebP images, lazy loading)
- Responsive: Mobile-first, tablet-optimized, desktop-enhanced
- Animations: Subtle, purposeful, 60fps smooth
- Typography: Clear hierarchy, generous line-height (1.6 for body)
- Spacing: Generous white space, never cramped
- Consistency: Follow the established design system

AVOID:
- Generic stock photos
- Overuse of colors (stick to palette)
- Cluttered layouts
- Slow/janky animations
- Poor contrast
- Outdated design patterns (skeuomorphism, heavy shadows)
- Too much text without breathing room

DELIVERABLES:
- High-fidelity mockup (1920x1080 for desktop, 375x812 for mobile)
- Layer organized and named
- Exportable assets clearly identified
- Annotations for interactive elements
```