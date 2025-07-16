document.addEventListener('DOMContentLoaded', () => {
    // Haal de huidige pagina op uit de URL
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    fetch(`/content/${page}.json`)
        .then(response => response.json())
        .then(data => {
            if (page === 'index') {
                document.querySelector('.hero-title').innerText = data.hero_title;
                document.querySelector('.hero-subtitle').innerText = data.hero_subtitle;
                document.querySelector('.hero-text').innerHTML = data.hero_text;
                document.querySelector('.about-title').innerText = data.about_title;
                document.querySelector('.about-text').innerHTML = data.about_text;
                document.querySelector('.services-title').innerText = data.services_title;
                const servicesContainer = document.querySelector('.services-container');
                servicesContainer.innerHTML = '';
                data.services.forEach(service => {
                    servicesContainer.innerHTML += `
                        <div class="col-lg-3 col-md-6">
                            <div class="icon-box">
                                <div class="icon"><img src="${service.image}" alt="${service.title}"></div>
                                <h4 class="title">${service.title}</h4>
                                <p class="description">${service.description}</p>
                            </div>
                        </div>
                    `;
                });
                document.querySelector('.testimonials-title').innerText = data.testimonials_title;
                const testimonialsContainer = document.querySelector('.testimonials-container');
                testimonialsContainer.innerHTML = '';
                data.testimonials.forEach(testimonial => {
                    testimonialsContainer.innerHTML += `
                        <div class="swiper-slide">
                            <div class="testimonial-item">
                                <p>${testimonial.quote}</p>
                                <h3>${testimonial.author}</h3>
                                <h4>${testimonial.role}</h4>
                            </div>
                        </div>
                    `;
                });
            } else if (page === 'wie-ben-ik') {
                document.querySelector('.wie-title').innerText = data.title;
                document.querySelector('.wie-subtitle').innerText = data.subtitle;
                document.querySelector('.wie-greeting').innerText = data.greeting;
                document.querySelector('.wie-text').innerHTML = data.text;
                document.querySelector('.wie-image').src = data.image;
            } else if (page === 'prijzen') {
                document.querySelector('.prijzen-title').innerText = data.title;
                document.querySelector('.prijzen-subtitle').innerText = data.subtitle;
                const packagesContainer = document.querySelector('.packages-container');
                packagesContainer.innerHTML = '';
                data.packages.forEach(pkg => {
                    const features = pkg.features.map(feature => `<li>${feature}</li>`).join('');
                    packagesContainer.innerHTML += `
                        <div class="col-lg-4 col-md-6">
                            <div class="pricing-box">
                                <h3>${pkg.title}</h3>
                                <h4>${pkg.price}</h4>
                                <p>${pkg.description}</p>
                                <ul>${features}</ul>
                                <a href="#" class="btn-buy">Boek nu</a>
                            </div>
                        </div>
                    `;
                });
            } else if (page === 'agenda') {
                document.querySelector('.agenda-title').innerText = data.title;
                document.querySelector('.agenda-subtitle').innerText = data.subtitle;
                document.querySelector('.availability-title').innerText = data.availability_title;
                document.querySelector('.availability-text').innerHTML = data.availability_text;
                document.querySelector('.calendar-title').innerText = data.calendar_title;
                document.querySelector('.calendar-note').innerText = data.calendar_note;
            } else if (page === 'contact') {
                document.querySelector('.contact-title').innerText = data.title;
                document.querySelector('.contact-subtitle').innerText = data.subtitle;
                document.querySelector('.form-title').innerText = data.form_title;
                document.querySelector('.form-text').innerHTML = data.form_text;
                document.querySelector('.contact-email').innerText = data.contact_email;
                document.querySelector('.contact-phone').innerText = data.contact_phone;
                document.querySelector('.contact-address').innerText = data.contact_address;
                document.querySelector('.faq-title').innerText = data.faq_title;
                const faqsContainer = document.querySelector('.faqs-container');
                faqsContainer.innerHTML = '';
                data.faqs.forEach(faq => {
                    faqsContainer.innerHTML += `
                        <div class="faq-item">
                            <h3>${faq.question}</h3>
                            <p>${faq.answer}</p>
                        </div>
                    `;
                });
            } else if (page === 'portfolio') {
                document.querySelector('.portfolio-title').innerText = data.title;
                document.querySelector('.portfolio-subtitle').innerText = data.subtitle;
                document.querySelector('.intro-title').innerText = data.intro_title;
                document.querySelector('.intro-text').innerHTML = data.intro_text;
                const portfolioContainer = document.querySelector('.portfolio-container');
                portfolioContainer.innerHTML = '';
                data.items.forEach(item => {
                    portfolioContainer.innerHTML += `
                        <div class="col-lg-3 col-md-6 portfolio-item">
                            <img src="${item.image}" class="img-fluid" alt="">
                        </div>
                    `;
                });
            }
        })
        .catch(error => console.error('Error loading content:', error));
});