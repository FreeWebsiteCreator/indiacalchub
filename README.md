# Indian Calculator Hub 🇮🇳

A premium, professional, multi-page calculator platform engineered specifically for Indian users, built with static web standards for maximum scalability, 100/100 Lighthouse performance, Google AdSense monetization readiness, and search engine optimization.

## 🚀 Live Site Features

- **Multi-Route Static Architecture**: Distinct URLs for every calculator tool (`/emi-calculator`, `/sip-calculator`, etc.) rather than a bloated single-page app.
- **Instant Client-Side Computation**: Zero-lag arithmetic executed locally within the visitor's browser. Zero database overhead and 100% private financial processing.
- **Indian Financial & Educational Localization**:
  - Rupee currency formatting (`₹ 1,50,000` / Lakhs and Crores).
  - Reducing-balance EMI math compliant with SBI, HDFC, and ICICI retail loan formulas.
  - Mutual fund compounding SIP calculations with wealth gain ratios and Rule of 72 guides.
  - Quarterly compounded Fixed Deposit (FD) calculations with Senior Citizen 50 bps bonus and Section 194A TDS threshold warnings.
  - GST invoicing tool with 3%, 5%, 12%, 18%, and 28% slabs, plus CGST/SGST/IGST splits.
  - 4-in-1 Percentage calculator for CBSE/ICSE board marks, discount calculations, and salary hike percentage changes.
  - Official CBSE 9.5 multiplier CGPA to Percentage conversion, along with VTU Karnataka and Mumbai University scales.
  - Exact Chronological Age calculator with Gregorian calendar leap year math, next birthday countdown, and Indian exam eligibility milestones (UPSC CSE, SSC CGL).
  - Asian Indian WHO-approved BMI calculator with revised cutoffs (normal: 18.5–22.9, overweight: 23.0+) and healthy target weight ranges in kg.

## 📈 SEO & Google AdSense Readiness

- **Content Depth**: Every calculator page contains 400–600 words of original educational content covering mathematical formulas, step-by-step instructions, and realistic Indian practical examples.
- **Structured Data**: Schema.org `FAQPage` JSON-LD markup on every calculator route with 6 questions each, plus `WebSite` and `Organization` schemas on the homepage.
- **Monetization Placeholders**: Clearly defined, non-intrusive AdSense slots (`#ad-slot-1`, `#ad-slot-2`, `#ad-slot-3`, `#ad-slot-sidebar`) pre-configured in header leaderboards, in-content sections, and sidebars.
- **Legal Compliance**: Full statutory pages including AdSense-compliant Privacy Policy (covering cookies, Google DoubleClick DART cookies, DPDP Act 2023, and GDPR/CCPA), Terms of Use, About Us, and Contact Us.
- **Serverless Contact Form**: Interactive contact form powered by Netlify Forms with spam honeypot filtering.
- **Search Engine Discovery**: Complete `sitemap.xml` and `robots.txt`.

## 🛠️ Technology Stack

- **Markup & Styling**: Semantic HTML5, Vanilla CSS with custom properties, responsive CSS grid and flexbox, mobile-first design.
- **Logic**: Modular, dependency-free JavaScript (`js/calculators.js`, `js/main.js`).
- **Hosting & CI/CD**: Netlify Static Hosting, Netlify Forms.

## 💻 Local Development

Because Indian Calculator Hub is built using pure static architecture with zero build compilation steps, you can run it locally with any static HTTP server or Netlify CLI:

```bash
# Using Netlify CLI
netlify dev --port 8889

# Or using Python's built-in HTTP server
python3 -m http.server 8889

# Or using Node npx serve
npx serve .
```

Open `http://localhost:8889` in your web browser.
