

 const API = `${window.ENV.API_URL}/cars?limit=100`;
    const listing = document.getElementById('carListing');
    const loading = document.getElementById('loading');
    let allCars = [];

    function formatPrice(p) {
      return `₦${Number(p).toLocaleString()}`;
    }

    // EXACT SAME CAR CARD FROM YOUR INDEX.HTML
    function createCarCard(car) {
      const card = document.createElement('div');
      card.className = 'car-card';

      const img = car.images?.[0] || '/images/car2.jpg';

      card.innerHTML = `
        <img src="${img}" alt="${car.make} ${car.model}" onerror="this.src='/images/car2.jpg'" />

        <div class="car-details">
          <h3>${car.make} ${car.model} ${car.year}</h3>
          <div class="car-d1">
            <span class="car-type">${car.type || 'Sedan'}</span>
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

      card.onclick = () => window.location.href = `car-details.html?id=${car.id}`;
      return card;
    }

    function renderCars(cars) {
      listing.innerHTML = '';
      if (cars.length === 0) {
        listing.innerHTML = '<p class="no-results">No cars match your search. Try different filters!</p>';
        return;
      }
      cars.forEach(car => listing.appendChild(createCarCard(car)));
    }

    function applyFilters() {
      const make = document.getElementById('filterMake').value.trim().toLowerCase();
      const model = document.getElementById('filterModel').value.trim().toLowerCase();
      const minYear = document.getElementById('minYear').value;
      const maxPrice = document.getElementById('maxPrice').value;
      const trans = document.getElementById('transmission').value;
      const fuel = document.getElementById('fuelType').value;

      const filtered = allCars.filter(car => {
        return (!make || car.make.toLowerCase().includes(make)) &&
               (!model || car.model.toLowerCase().includes(model)) &&
               (!minYear || car.year >= Number(minYear)) &&
               (!maxPrice || car.price <= Number(maxPrice)) &&
               (!trans || car.transmission === trans) &&
               (!fuel || car.fuelType === fuel);
      });

      renderCars(filtered);
    }

    // Load all cars
    fetch(API)
      .then(r => r.json())
      .then(res => {
        loading.style.display = 'none';
        allCars = res.data || [];
        renderCars(allCars);
      })
      .catch(() => {
        loading.innerHTML = '<p style="color:red;">Failed to load cars. Is backend running?</p>';
      });

    // Real-time filtering
    document.querySelectorAll('#filterMake, #filterModel, #minYear, #maxPrice, #transmission, #fuelType')
      .forEach(el => el.addEventListener('input', applyFilters));
    document.getElementById('transmission').addEventListener('change', applyFilters);
    document.getElementById('fuelType').addEventListener('change', applyFilters);

    // Mobile menu
    document.getElementById('navToggle').addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });