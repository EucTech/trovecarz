# TROVECARZ

This is a website where you can view and book a car

> A minimal, responsive car listings frontend that fetches listings from an external API and lets users purchase buy.

---

## What this project contains

- `index.html` — homepage with hero (background video + dark gradient), search form, and car listing area.
- `car.html` — example detail page that fetches a single car by `id` and supports a simple buy action.
- `styles/index.css` — site styles: hero, responsive header + sliding mobile nav, card components.
- `scripts/index.js` — client-side behavior (menu toggle, and support for wiring the UI to an API).

Images and the demo video are in the `images/` folder (used as `poster` for the hero and sample cards). Replace them with your assets as needed.

---

## Quick start (local testing)

1. Create a file on the root folder called `.env.js` and add the api in it
   > window.ENV = {
   > API_URL: "api....**\***"
   > };
2. Run Golive or `http://127.0.0.1:5500/`

## API expectations

I build my on API using Nest js

This is repo to the api

`https://github.com/EucTech/trovecarz-api.git`

This frontend expects the API to provide at least the following shapes:

- GET `/cars` — returns an array of car objects:

```json
[
  {
    "id": "c1",
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "price": 15000,
    "image": "https://.../car.jpg",
    "description": "...",
    "mileage": 42000
  }
]
```

## Important UI details

- Hero: implemented as a looping muted background `<video>` with a dark gradient overlay to ensure text contrast. Replace `/images/hero-video.mp4` with an optimized short loop for production.
- Mobile nav: the header contains a hamburger. On screens ≤768px the nav slides in from the right with a transform-based animation; clicking outside, pressing Escape, or clicking the toggle will close it.
- Cards: the card component shows image, badge, title, price highlight, an icon row for specs, and meta information. The styles live in `styles/index.css` and use `--primary-color` to theme the highlight.

## Deployment & Load Balancing Setup

- This project is deployed across two Ubuntu servers using Nginx as the web server on each machine, and HAProxy as the load balancer

## Nginx Configuration on Each Server

## HAProxy Load Balancer (Server LB)

1. sudo apt install haproxy -y
2. Update config: /etc/haproxy/haproxy.cfg
   ```
       frontend http_front
          bind *:80
          default_backend http_back
       backend http_back
           balance roundrobin
           server 6931-web-01 54.167.186.166:80 check
           server 6931-web-02 34.227.152.242:80 check
   ```
