document.getElementById('route-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const source = document.getElementById('source').value.toUpperCase();
  const destination = document.getElementById('destination').value.toUpperCase();
  const criteria = document.getElementById('criteria').value;

  if (!source || !destination) {
    alert('Please enter both source and destination airport codes.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/find-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source, destination, criteria }),
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById('route-output').textContent = data.error;
      document.getElementById('cost').textContent = '-';
      document.getElementById('duration').textContent = '-';
      document.getElementById('distance').textContent = '-';
    } else {
      document.getElementById('route-output').textContent = `Route: ${data.route.join(' → ')}`;
      document.getElementById('cost').textContent = `$${data.cost}`;
      document.getElementById('duration').textContent = `${data.duration} hours`;
      document.getElementById('distance').textContent = `${data.distance} km`;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('route-output').textContent = 'An error occurred. Please try again.';
  }
});