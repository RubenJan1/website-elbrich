// Functie om JSON te laden en HTML bij te werken
async function loadContent() {
    const path = window.location.pathname;
    let jsonPath = '';

    // Bepaal welk JSON-bestand te laden op basis van de URL
    if (path.includes('prijzen')) {
        jsonPath = '/content/prijzen.json';
    } else if (path.includes('contact')) {
        jsonPath = '/content/contact.json';
    } else if (path.includes('portfolio')) {
        jsonPath = '/content/portfolio.json';
    } else if (path.includes('agenda')) {
        jsonPath = '/content/agenda.json';
    } else if (path.includes('wie-ben-ik')) {
        jsonPath = '/content/wie-ben-ik.json';
    } else if (path.includes('index') || path === '/') {
        jsonPath = '/content/index.json';
    } else {
        return; // Stop als er geen match is
    }

    try {
        const response = await fetch(jsonPath);
        const data = await response.json();

        // Werk de inhoud bij op basis van de pagina
        if (path.includes('prijzen')) {
            const prijzenDiv = document.getElementById('prijzen-content');
            prijzenDiv.innerHTML = `
                <h1>${data.title}</h1>
                <h2>${data.subtitle}</h2>
                ${data.packages.map(pkg => `
                    <div>
                        <h3>${pkg.name} - ${pkg.price}</h3>
                        <p>${pkg.description}</p>
                        <ul>${pkg.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                        <button>${pkg.button}</button>
                    </div>
                `).join('')}
            `;
        } else if (path.includes('contact')) {
            const contactDiv = document.getElementById('contact-content');
            contactDiv.innerHTML = `
                <h1>${data.title}</h1>
                <h2>${data.subtitle}</h2>
                <div>
                    <h3>Contactgegevens</h3>
                    <p>Email: ${data.contact_info.email}</p>
                    <p>Telefoon: ${data.contact_info.phone}</p>
                    <p>Adres: ${data.contact_info.address}</p>
                </div>
                <div>
                    <h3>Veelgestelde Vragen</h3>
                    ${data.faq.map(qa => `
                        <div>
                            <h4>${qa.question}</h4>
                            <p>${qa.answer}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (path.includes('portfolio')) {
            const portfolioDiv = document.getElementById('portfolio-content');
            portfolioDiv.innerHTML = `
                <h1>${data.title}</h1>
                <h2>${data.subtitle}</h2>
                <div>
                    ${data.categories.map(cat => `
                        <h3>${cat.name}</h3>
                        ${cat.items.map(item => `
                            <div>
                                <h4>${item.title}</h4>
                                <p>Categorie: ${item.category}</p>
                            </div>
                        `).join('')}
                    `).join('')}
                </div>
            `;
        } else if (path.includes('agenda')) {
            const agendaDiv = document.getElementById('agenda-content');
            agendaDiv.innerHTML = `
                <h1>${data.title}</h1>
                <h2>${data.subtitle}</h2>
                <p>${data.availability.replace(/\n/g, '<br>')}</p>
                <button>Boek nu</button>
            `;
        } else if (path.includes('wie-ben-ik')) {
            const wieBenIkDiv = document.getElementById('wie-ben-ik-content');
            wieBenIkDiv.innerHTML = `
                <h1>${data.title}</h1>
                <h2>${data.subtitle}</h2>
                <p>${data.intro.replace(/\n/g, '<br>')}</p>
                <button>Neem contact op</button>
            `;
        } else if (path.includes('index') || path === '/') {
            const introDiv = document.getElementById('intro');
            introDiv.innerHTML = `
                <h1>${data.title}</h1>
                <h2>${data.subtitle}</h2>
                <p>${data.intro_text.replace(/\n/g, '<br>')}</p>
            `;

            const servicesDiv = document.getElementById('services');
            servicesDiv.innerHTML = '<h2>Diensten</h2>' + data.services.map(service => `
                <div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `).join('');

            const testimonialsDiv = document.getElementById('testimonials');
            testimonialsDiv.innerHTML = '<h2>What Clients Say</h2>' + data.testimonials.map(testimonial => `
                <div>
                    <p>${testimonial.quote}</p>
                    <p><strong>${testimonial.author}</strong> - ${testimonial.role}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Fout bij het laden van de inhoud:', error);
    }
}

// Laad de inhoud bij het laden van de pagina
window.onload = loadContent;