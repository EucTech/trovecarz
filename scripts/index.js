// scripts/index.js - WITH LOADER + CLEAN CODE
const API_URL = `${window.ENV.API_URL}/cars`;

const carListing = document.querySelector('.car-listing');
const searchForm = document.getElementById('searchForm');
const searchBtn = document.getElementById('searchBtn');

// LOADER HTML (Beautiful & Matches Your Design)
const LOADER_HTML = `
  <div style="
    grid-column: 1/-1;
    text-align: center;
    padding: 80px 20px;
    color: var(--primary-color);
  ">
    <i class="fa-solid fa-spinner fa-spin" style="font-size: 48px; margin-bottom: 20px;"></i>
    <p style="font-size: 18px; font-weight: 500;">Loading cars...</p>
  </div>
`;

function formatPrice(price) {
  return `₦${Number(price).toLocaleString()}`;
}

// CREATE CAR CARD (Same as before)
function createCarCard(car) {
  const card = document.createElement('div');
  card.className = 'car-card';

  const firstImage = car.images?.[0] || '/images/car2.jpg';

  card.innerHTML = `
    <img src="${firstImage}" alt="${car.make} ${car.model}" onerror="this.src='/images/car2.jpg'" />
    <div class="car-details">
      <h3>${car.make} ${car.model} ${car.year}</h3>
      <div class="car-d1">
        <span class="car-type">${car.type || 'N/A'}</span>
        <span class="car-year">${car.year}</span>
      </div>
      <div class="car-d2">
        <p>For sale</p>
        <span class="car-price">${formatPrice(car.price)}</span>
      </div>
    </div>
    <div class="seperator"></div>
    <div class="car-d3">
      <div class="car-d4">
        <i class="fa-solid fa-tachometer-alt"></i>
        <span>${car.mileage.toLocaleString()} km</span>
      </div>
      <div class="car-d4">
        <i class="fa-solid fa-cogs"></i>
        <span>${car.transmission || 'Auto'}</span>
      </div>
      <div class="car-d4">
        <i class="fa-solid fa-gas-pump"></i>
        <span>${car.fuelType || 'Petrol'}</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.href = `car-details.html?id=${car.id}`;
  });
  card.style.cursor = 'pointer';
  return card;
}

// FETCH CARS WITH LOADER
async function fetchCars(filters = {}) {
  try {
    // SHOW LOADER
    carListing.innerHTML = LOADER_HTML;

    const params = new URLSearchParams();
    if (filters.make) params.append('make', filters.make);
    if (filters.model) params.append('model', filters.model);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    params.append('limit', 12);

    const response = await fetch(`${API_URL}?${params}`);
    const result = await response.json();

    // HIDE LOADER & SHOW RESULTS
    carListing.innerHTML = '';

    if (result.data && result.data.length > 0) {
      result.data.forEach(car => {
        carListing.appendChild(createCarCard(car));
      });
    } else {
      carListing.innerHTML = `
        <p style="grid-column: 1/-1; text-align:center; padding:60px; color:#888; font-size:18px;">
          <i class="fa-solid fa-car-side" style="font-size:40px; margin-bottom:16px; display:block; opacity:0.5;"></i>
          No cars found matching your search.
        </p>
      `;
    }
  } catch (err) {
    console.error('Error:', err);
    carListing.innerHTML = `
      <p style="grid-column:1/-1; text-align:center; padding:60px; color:#e74c3c; font-size:18px;">
        Failed to load cars.<br>
        <small>Is your backend running on port 3000?</small>
      </p>
    `;
  }
}

// SEARCH HANDLER
searchBtn.addEventListener('click', () => {
  const filters = {
    make: document.getElementById('qMake').value.trim(),
    model: document.getElementById('qModel').value.trim(),
    maxPrice: document.getElementById('qMaxPrice').value,
  };
  fetchCars(filters);
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchBtn.click();
});

// ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('header nav').classList.toggle('open');
    });
  }

  // Load cars with loader
  fetchCars();
});