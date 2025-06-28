import 'bootstrap/dist/js/bootstrap.bundle.min.js';

async function loadContent(pageId, filePath) {
  const response = await fetch(filePath);
  const text = await response.text();
  document.getElementById(pageId).innerHTML = text; // Voor nu simpel, later markdown parser
}

window.addEventListener('load', () => {
  if (window.location.pathname.includes('who-am-i.html')) {
    loadContent('who-am-i-content', '/content/who-am-i/who-am-i.md');
  } else if (window.location.pathname.includes('portfolio.html')) {
    ['gezinsshoot', 'liefdesshoot', 'geboorte', 'newborn'].forEach(async (cat) => {
      const response = await fetch(`/content/portfolio/${cat}.md`);
      const text = await response.text();
      document.getElementById('portfolio-content').innerHTML += `<h3>${cat}</h3><p>${text}</p>`;
    });
  } else if (window.location.pathname.includes('reviews.html')) {
    loadContent('reviews-content', '/content/reviews/reviews.md');
  } else if (window.location.pathname.includes('contact.html')) {
    loadContent('contact-info', '/content/contact/contact.md');
  }
});

// Foto's laden voor Portfolio (zoals eerder)
async function loadPortfolio(category) {
  const response = await fetch(`/(.netlify/functions/getPhoto?name=${category}-example.jpg`);
  const blob = await response.blob();
  const img = document.createElement('img');
  img.src = URL.createObjectURL(blob);
  img.className = 'col-md-4 mb-4';
  document.getElementById('portfolio-content').appendChild(img);
}

if (window.location.pathname.includes('portfolio.html')) {
  ['gezinsshoot', 'liefdesshoot', 'geboorte', 'newborn'].forEach(loadPortfolio);
}

// Contactformulier
if (window.location.pathname.includes('contact.html')) {
  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };
    const response = await fetch('/.netlify/functions/booking', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    document.getElementById('contact-response').innerHTML = result.message;
  });
}