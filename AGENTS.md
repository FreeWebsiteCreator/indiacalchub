# AGENTS.md - Developer & Agent Architecture Guide

## Project Summary
**Indian Calculator Hub** is a multi-page static website offering free, accurate calculators tailored to the regulatory, tax, academic, and cultural contexts of Indian users. It is optimized for zero-dependency execution, fast mobile page loading, high organic search rankings, and Google AdSense compliance.

## Directory Structure
```
/
├── index.html                      # Homepage: hero, search bar, category filters, calculator grid
├── emi-calculator/index.html       # Loan EMI calculator (SBI/HDFC reducing balance)
├── sip-calculator/index.html       # Mutual Fund SIP returns & wealth multiplier calculator
├── fd-calculator/index.html        # Fixed Deposit calculator with quarterly compounding & TDS alerts
├── gst-calculator/index.html       # GST calculator (exclusive/inclusive modes, CGST/SGST/IGST)
├── percentage-calculator/index.html# 4-in-1 percentage tool (marks %, % of number, % change)
├── cgpa-calculator/index.html      # CGPA to Percentage converter (CBSE 9.5, VTU, Mumbai Univ)
├── age-calculator/index.html       # Exact chronological age calculator & milestone checker
├── bmi-calculator/index.html       # Asian Indian BMI calculator (ICMR & WHO 23/25 cutoffs)
├── about/index.html                # About Us: mission, editorial standards, author profile
├── contact/index.html              # Contact page integrated with Netlify Forms
├── privacy-policy/index.html       # AdSense-compliant privacy policy (cookies, DART, DPDP Act 2023)
├── terms-of-use/index.html         # Terms of service and financial/medical disclaimers
├── sitemap.xml                     # Search engine XML sitemap
├── robots.txt                      # Robots exclusion standard
├── netlify.toml                    # Netlify deployment headers, security policies, cache rules
├── css/
│   ├── style.css                   # Global styles, variables, typography, layouts, ad slots
│   └── calculators.css             # Interactive widgets, sliders, result cards, gauges
├── js/
│   ├── calculators.js              # Pure mathematical engine (IndianCalc namespace)
│   └── main.js                     # Global UI interactions (search filter, mobile nav, copy text)
└── images/
    ├── logo.svg                    # SVG brand mark & wordmark
    └── favicon.svg                 # SVG favicon icon
```

## Architectural Decisions & Constraints

### 1. Pure Static Multi-Page Architecture (MPA)
- **Why MPA over SPA?**
  - Search engine optimization: Each calculator is a distinct URL with its own title, meta tags, and 400–600 words of targeted content.
  - Zero hydration latency: Vital for mobile users on varying connectivity across India.
  - Zero build failure risk: No compilation or bundler dependencies.

### 2. Mathematics & Number Formatting (`js/calculators.js`)
- All calculations reside under `window.IndianCalc`.
- `IndianCalc.formatINR(num)` formats numbers into the standard Indian numbering system (`₹ 1,50,000` instead of `₹ 150,000`) using `Intl.NumberFormat('en-IN')`.
- `IndianCalc.formatIndianWords(num)` generates Lakh and Crore textual suffixes (e.g., `(₹ 50.46 Lakh)`, `(₹ 1.25 Cr)`).

### 3. Google AdSense Monetization Design
- All pages feature designated ad placeholder divs with clear labels:
  - `#ad-slot-1`: Header leaderboard (728x90 or responsive)
  - `#ad-slot-2`: In-content banner
  - `#ad-slot-3`: Sidebar rectangle (300x250)
- The Privacy Policy explicitly satisfies Google's DART cookie and personalized advertising disclosure requirements.

### 4. Netlify Forms Integration (`contact/index.html`)
- Configured using standard Netlify Forms attributes: `data-netlify="true"`, `netlify-honeypot="bot-field"`, and `<input type="hidden" name="form-name" value="contact" />`.
- Features AJAX submission with progressive fallback.

## Coding Conventions
- **No external frameworks (React, Vue, Tailwind)**: Keep styling in standard CSS with CSS variables (`var(--primary)`, `var(--accent)`, `var(--text-main)`).
- **Accessible markup**: Use semantic HTML5 (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<details>`, `<summary>`). Always specify `alt` attributes on images and `aria-label` on interactive buttons without text.
- **Adding new calculators**:
  1. Add computational logic to `js/calculators.js`.
  2. Create a new directory `[slug]/index.html` replicating the established structure (header, breadcrumb, calculator widget, in-content ad, 400-600 word guide, FAQPage JSON-LD, sidebar, footer).
  3. Update `sitemap.xml`, navigation links, and the search dataset in `js/main.js`.
