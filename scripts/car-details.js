const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

if (!carId) {
  document.body.innerHTML = "<h1>Car not found</h1><a href='index.html'>Go back</a>";
} else {
  fetch(`http://localhost:3000/cars/${carId}`)
    .then(res => res.json())
    .then(car => {
      // Fill car details
      document.getElementById('title').textContent = `${car.make} ${car.model} ${car.year}`;
      document.getElementById('price').textContent = `₦${Number(car.price).toLocaleString()}`;
      document.getElementById('description').textContent = car.description || "No description available.";
      document.getElementById('year').textContent = car.year;
      document.getElementById('mileage').textContent = car.mileage.toLocaleString();
      document.getElementById('transmission').textContent = car.transmission;
      document.getElementById('fuelType').textContent = car.fuelType;
      document.getElementById('color').textContent = car.color || "Not specified";
      document.getElementById('type').textContent = car.type;

      // Gallery
      const mainImg = document.getElementById('mainImg');
      const thumbs = document.getElementById('thumbnails');
      mainImg.src = car.images?.[0] || '/images/car2.jpg';

      car.images?.forEach((img, i) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.onclick = () => mainImg.src = img;
        if (i === 0) thumb.classList.add('active');
        thumbs.appendChild(thumb);
      });

      // PAYMENT CONFIRMATION ON CLICK
      document.getElementById('contactSeller').addEventListener('click', () => {
        const price = `₦${Number(car.price).toLocaleString()}`;
        const confirmPayment = confirm(
          `Confirm Payment\n\n` +
          `Car: ${car.make} ${car.model} ${car.year}\n` +
          `Price: ${price}\n\n` +
          `Do you want to proceed with payment?`
        );

        if (confirmPayment) {
          alert(
            `Payment Successful!\n\n` +
            `Thank you for purchasing the ${car.make} ${car.model}!\n` +
            `Amount paid: ${price}\n\n` +
            `A sales agent will contact you shortly.`
          );
        } else {
          alert("Payment cancelled. You can continue browsing.");
        }
      });

    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = "<h1>Failed to load car. Is the backend running?</h1>";
    });
}

// Mobile menu toggle
document.getElementById('navToggle')?.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});