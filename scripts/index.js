// scripts/index.js - FINAL WORKING VERSION (NO ALERT!)
const API_URL = 'http://localhost:3000/cars';
const carListing = document.querySelector('.car-listing');
const searchForm = document.getElementById('searchForm');
const searchBtn = document.getElementById('searchBtn');

// Format price (using ₦ for Nigeria)
function formatPrice(price) {
  return `₦${Number(price).toLocaleString()}`;
}

// CREATE CAR CARD - OPENS car-details.html ON CLICK
function createCarCard(car) {
  const card = document.createElement('div');
  card.className = 'car-card';

  const firstImage = car.images && car.images.length > 0 
    ? car.images[0] 
    : '/images/car2.jpg';

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

  // Click event to go to details page
  card.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `car-details.html?id=${car.id}`;
  });

  card.style.cursor = 'pointer';
  return card;
}

// Fetch and display cars
async function fetchCars(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.make) params.append('make', filters.make);
    if (filters.model) params.append('model', filters.model);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    params.append('limit', 12);

    const response = await fetch(`${API_URL}?${params}`);
    const result = await response.json();

    carListing.innerHTML = '';

    if (result.data && result.data.length > 0) {
      result.data.forEach(car => {
        carListing.appendChild(createCarCard(car));
      });
    } else {
      carListing.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:40px; color:#666;">No cars found.</p>';
    }
  } catch (err) {
    console.error('Error:', err);
    carListing.innerHTML = '<p style="color:red; grid-column:1/-1; text-align:center;">Failed to load cars. Is backend running?</p>';
  }
}

// Search handler
searchBtn.addEventListener('click', () => {
  const filters = {
    make: document.getElementById('qMake').value.trim(),
    model: document.getElementById('qModel').value.trim(),
    maxPrice: document.getElementById('qMaxPrice').value,
  };
  fetchCars(filters);
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchBtn.click();
});

// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('header nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  fetchCars();
});