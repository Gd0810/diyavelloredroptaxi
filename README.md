# Diyavellore Drop Taxi

A premium, responsive five-page static website for a call taxi business. Built entirely with **HTML5, CSS3 and Vanilla JavaScript** — no framework, package manager, build step or backend is required.

## Quick start

1. Extract `diyavello-red-drop-taxi.zip`.
2. Open the `diyavello-red-drop-taxi` folder.
3. Double-click `index.html`, or serve the folder with any static web server.
4. Complete the **Before launch** checklist below before publishing.

All site images and the Outfit font are stored locally. The pages also reference Google Fonts as requested; the local font provides an offline fallback. No JavaScript libraries or icon CDNs are used.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Hero, why people call us first, popular services, booking steps, popular Vellore routes, representative fleet, auto-rotating sample testimonials, FAQs and CTA |
| `about.html` | Company introduction, story, mission, vision, values and customer commitment |
| `services.html` | Local Trip, Round Trip, Outstation Trip and Drop Taxi service cards |
| `gallery.html` | Filterable responsive image grid and keyboard-accessible lightbox |
| `contact.html` | Placeholder contact details, client-side validated booking request form and map placeholder |

## Implemented features

- Sticky header and active-page navigation
- Animated mobile hamburger menu with Escape/outside-click handling
- Responsive desktop, tablet and mobile layouts
- Local, optimized WebP images with descriptive alt text and lazy loading
- Gallery category filters, image zoom, lightbox, previous/next controls and keyboard navigation
- Left-to-right testimonial carousel with autoplay, pause/resume, manual controls and hover/focus pausing
- Nine popular Vellore route cards and a keyboard-accessible FAQ accordion
- Scroll-reveal effects with reduced-motion support, including disabled testimonial autoplay
- Smooth same-page scrolling
- Back-to-top button
- Automatic footer year
- `tel:` Call Now links using a **clearly marked placeholder number**
- Frontend-only contact validation, including date, phone, email and matching-location checks
- Unique SEO titles/descriptions, canonical placeholders, Open Graph and Twitter metadata
- Organization and TaxiService JSON-LD without invented ratings, addresses or phone numbers
- `sitemap.xml` and `robots.txt`

## Project structure

```text
diyavello-red-drop-taxi/
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── gallery.js
│   │   └── contact.js
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── gallery/
│   │   └── about/
│   └── fonts/
│       └── Outfit/
│           ├── Outfit-Variable-Latin.woff2
│           └── OFL.txt
├── sitemap.xml
├── robots.txt
└── README.md
```

## Before launch — required customization

### 1. Replace all placeholder business details

Search the HTML files for these values and replace them everywhere:

| Placeholder | Action |
| --- | --- |
| `+91 00000 00000` | Replace with the verified visible phone number |
| `tel:+910000000000` | Replace with the verified international-format `tel:` value |
| `hello@example.com` | Replace with the verified business email |
| `Your business address` | Add the confirmed business address, or remove address claims |
| `Add your confirmed opening and booking hours here.` | Add real operating hours |

The zero-filled phone number is intentionally a non-working placeholder. Do not publish it as a real contact number.

### 2. Replace placeholder domain URLs

Search the whole project for:

```text
https://www.example.com
```

Replace it with the final HTTPS origin, without a trailing slash. This updates canonical URLs, Open Graph URLs/images, JSON-LD, `sitemap.xml` and `robots.txt`. Review the home canonical separately if your host serves `index.html` at `/`.

### 3. Configure form delivery, or keep the disclosure

The contact form **does not transmit, store or email requests**. A valid submission only displays a confirmation that the entries passed browser validation.

The submit button is disabled in HTML and enabled by `contact.js`; this prevents accidental data submission when JavaScript is unavailable. To deliver requests, configure a trusted external form service and update both the form code and the visible disclosure. Never claim a booking is confirmed until the business has actually received and confirmed it.

### 4. Add a verified Google Maps embed

The contact page intentionally contains a designed placeholder, not an invented map location. After verifying the address, replace `.map-placeholder` in `contact.html` with the business's actual Google Maps embed and an accessible iframe title.

### 5. Replace sample testimonials

The homepage testimonial cards are explicitly labelled **Sample layout**. They are not genuine reviews. Replace the sample quotes and customer-name placeholders with verified feedback, or remove the section. No star ratings or review counts are included.

### 6. Confirm fleet and service claims

All vehicle and travel photos are representative. Confirm actual vehicle categories, availability, fares, driver credentials and service terms before publishing. Update the representative-image notices if you add authentic fleet photos.

### 7. Configure social links

Social icons are non-clickable placeholders rather than broken links. Replace the spans in the shared footer on each page with real `<a>` elements only after the business profile URLs are available. A Privacy Policy link is intentionally omitted because no privacy page was requested or supplied.

## Booking URL

All four service **Book Now** buttons, plus the main booking CTAs, point to the supplied URL:

```text
https://blanchedalmond-aardvark-696521.hostingersite.com/contact.php
```

To change it, search all HTML files for that exact URL. The static form on `contact.html` is independent of this external booking page.

## Design customization

- **Colors, spacing, radius and shadows:** edit the tokens under `:root` in `assets/css/style.css`.
- **Typography:** Outfit is self-hosted as a variable WOFF2 font and also loaded through Google Fonts. The font license is in `assets/fonts/Outfit/OFL.txt`.
- **Icons:** simple inline SVGs are embedded in the HTML; no icon library is required.
- **Shared sections:** header, footer and CTA markup appears in each HTML file because this is a build-free static project. Apply changes consistently across all five pages.
- **Images:** preserve the existing dimensions or update each image's `width` and `height` attributes when replacing files. Export optimized WebP images where possible.

## Deployment

Upload the **contents** of the project folder to any static host, including Hostinger, Netlify, GitHub Pages, Cloudflare Pages or a standard web server. No runtime or server-side language is needed for the five pages themselves.

- Ensure `index.html` is at the web root.
- Preserve the `assets` directory structure and filename case.
- Force HTTPS in production.
- Update placeholder SEO URLs before submitting the sitemap to search engines.
- The supplied external booking URL contains `contact.php`; its operation depends on that external host and is outside this static project.

## Image and font credits

Photographs were downloaded from free Pexels or standard Unsplash results and optimized locally. They are representative stock photography, not photographs of the business or its fleet. Review the current source licenses before commercial publication.

| Local asset / use | Source |
| --- | --- |
| `hero/home-yellow-taxi-city.webp` and social image | [Unsplash — yellow taxi](https://unsplash.com/photos/tilt-shift-photography-of-yellow-taxi-car-3NMsCQr5m2g) |
| `about/passenger-taxi-door.webp` | [Pexels — passenger opening a taxi](https://www.pexels.com/photo/5835054/) |
| `about/professional-driver-passenger.webp` | [Pexels — professional driver and passenger](https://www.pexels.com/photo/a-man-in-black-suit-driving-a-car-9519974/) |
| `services/local-city-taxi.webp` | [Unsplash — city taxi at dusk](https://unsplash.com/photos/red-taxi-driving-on-a-city-street-at-dusk-0N9E8tp0Z9A) |
| `services/round-trip-family-travel.webp` | [Pexels — family at the back of a car](https://www.pexels.com/photo/family-at-the-back-of-a-car-7669212/) |
| `services/outstation-highway-journey.webp` | [Unsplash — mountain drive](https://unsplash.com/photos/a-car-driving-down-a-road-in-the-mountains-YsoZrAwU3Ic) |
| `services/one-way-drop-sedan.webp` | [Unsplash — grey sedan](https://unsplash.com/photos/grey-sedan-on-street-2VMDFEkpzVk) |
| `gallery/mumbai-black-yellow-taxi.webp` | [Unsplash — Mumbai taxi](https://unsplash.com/photos/black-and-yellow-taxi-with-mumbai-license-plate-g0h9GCruEZk) |
| `gallery/night-sedan-transport.webp` | [Unsplash — black sedan on road](https://unsplash.com/photos/time-lapse-photography-of-black-sedan-on-road-Qm_n6aoYzDs) |
| `gallery/suv-highway-travel.webp` | [Unsplash — SUV on a country road](https://unsplash.com/photos/a-black-mercedes-suv-driving-down-a-country-road-MyidPsXdKUU) |
| `gallery/passenger-road-adventure.webp` | [Unsplash — road-trip passenger](https://unsplash.com/s/photos/road-trip) |
| `gallery/open-highway-journey.webp` | [Unsplash — open highway](https://unsplash.com/photos/a-road-with-a-mountain-in-the-background-ULo_87BvFEo) |
| `gallery/travellers-with-luggage.webp` | [Pexels — airport traveller](https://www.pexels.com/photo/man-walking-through-modern-airport-terminal-35150092/) |
| `gallery/city-taxi-street.webp` | [Unsplash — city taxi street](https://unsplash.com/photos/a-black-and-white-photo-of-a-taxi-cab-on-a-city-street-1lBmXqXTHqk) |
| Outfit font | [Google Fonts — Outfit](https://fonts.google.com/specimen/Outfit), SIL Open Font License 1.1 |

## Validation performed

- Nu HTML Checker: **0 errors and 0 notes** on all five pages.
- Static audit: internal files, fragment links, image integrity, metadata, JSON-LD, form labels, sitemap and JavaScript syntax passed.
- Chromium browser checks: all five pages at 1440, 1024, 768, 390, 360 and 320 pixel widths — **30 page/viewport combinations**, with no horizontal overflow, broken local images, console errors or page errors.
- Mobile navigation, sticky header, back-to-top, gallery filters/lightbox, keyboard controls and all four booking destinations tested.
- Homepage left-to-right autoplay, pause/resume, previous/next controls, reduced-motion suppression, route links and FAQ click/Arrow/Home/End keyboard navigation tested.
- Contact form tested for empty fields, matching pickup/drop locations, valid input, minimum date and **zero network transmission**.
- Direct `file://` opening tested successfully on all five pages.
- The supplied external booking URL returned HTTP 200 during the final check; its future availability and backend behavior remain external to this project.

## Browser behavior

The site targets current versions of Chrome, Edge, Firefox and Safari. CSS and JavaScript respect `prefers-reduced-motion`. Core content and local images remain readable without JavaScript; FAQs stay expanded and testimonial cards can be scrolled horizontally. Interactive navigation, gallery filters/lightbox, testimonial controls, FAQ accordion and contact validation require JavaScript.
