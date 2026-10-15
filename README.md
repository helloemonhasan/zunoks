# ZUNOKS Consulting — Official Homepage

A responsive, high-fidelity corporate homepage for **ZUNOKS Consulting** (“Built on Real Business Experience”), coded from Figma with pure vanilla CSS, modern semantic HTML, and JavaScript micro-interactions.

---

## 🌟 Features & Highlights

- **18 Semantic Sections:** From the Hero with executive value propositions down to the interactive SWOT Diagnostic, Industry accordions, and Footer.
- **5 Interactive Component Sets:**
  1. **Founders Explorer:** Real-time switcher between founding partners with biographical narratives, executive career badges, and portrait cutouts.
  2. **Services Explorer:** Left vertical tab navigation with real-time value proposition switching, deliverables checklist, and photography.
  3. **Industries Accordion:** Smooth horizontal expanding strip on desktop (collapses to an accessible vertical accordion on mobile).
  4. **Workshop Carousel:** Interactive slider with `01 / 04` indicator, slide transitions, and metadata.
  5. **SWOT Diagnostic Quiz:** 3-step executive assessment featuring an animated 10-second countdown radial gauge and matrix results view with email capture.
- **Scroll Appear Animations:** Fluid reveal-on-scroll animations using `IntersectionObserver` paired with animated count-up metrics (`120+`, `80+`, `8`, `7`, `4`).
- **Fully Responsive:** Tested across mobile (320px–480px), tablet (768px–992px), laptop (1200px), and expansive desktop (1440px+).
- **Authentic Brand Assets & Typography:** Embedded system fonts (`Sentient` serif and `Helvetica Now Display` sans-serif) plus high-res assets exported directly from Figma.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Production assets will be output to the `dist/` directory.

---

## 📁 Project Structure

```
├── public/
│   ├── assets/       # Authentic Figma brand logos, icons, cutouts & photography
│   └── fonts/        # Sentient and Helvetica Now Display font files
├── src/
│   ├── main.js       # Component controllers, SWOT timer, modal, animations
│   └── style.css     # Design tokens, @font-face, layout, responsive queries
├── index.html        # Complete 18-section semantic HTML
├── package.json      # Vite build configuration
└── vite.config.js    # Vite settings
```

---

## 📄 License
Private & Proprietary — ZUNOKS Consulting.
