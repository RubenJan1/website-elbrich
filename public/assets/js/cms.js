document.addEventListener('DOMContentLoaded', () => {
    fetch('/content/index.json')
        .then(response => response.json())
        .then(data => {
            // Hero Section
            document.getElementById('hero-title').textContent = data.hero.title;
            document.getElementById('hero-location').textContent = data.hero.location;
            document.getElementById('hero-description').textContent = data.hero.description;
            document.getElementById('hero-button').textContent = data.hero.button;

            // About Section
            document.getElementById('about-title').textContent = data.about.title;
            document.getElementById('about-description').textContent = data.about.description;
            document.getElementById('about-button').textContent = data.about.button;

            // Recent Projects Section
            document.getElementById('recent-projects-title').textContent = data.recent_projects.title;
            document.getElementById('recent-projects-view-all').textContent = data.recent_projects.view_all;
            const projectsContainer = document.getElementById('projects-container');
            data.recent_projects.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.innerHTML = `
                    <p>${project.category}</p>
                    <h3>${project.title}</h3>
                `;
                projectsContainer.appendChild(projectDiv);
            });

            // Services Section
            document.getElementById('services-title').textContent = data.services.title;
            const servicesContainer = document.getElementById('services-container');
            data.services.items.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.innerHTML = `
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `;
                servicesContainer.appendChild(serviceDiv);
            });

            // Testimonials Section
            document.getElementById('testimonials-title').textContent = data.testimonials.title;
            document.getElementById('testimonials-subtitle').textContent = data.testimonials.subtitle;
            const testimonialsContainer = document.getElementById('testimonials-container');
            data.testimonials.items.forEach(testimonial => {
                const testimonialDiv = document.createElement('div');
                testimonialDiv.innerHTML = `
                    <p>${testimonial.quote}</p>
                    <p>${testimonial.author}</p>
                    <p>${testimonial.position}</p>
                `;
                testimonialsContainer.appendChild(testimonialDiv);
            });

            // Contact Section
            document.getElementById('contact-title').textContent = data.contact.title;
            document.getElementById('contact-description').textContent = data.contact.description;
            document.getElementById('contact-button').textContent = data.contact.button;

            // Contact Info Section
            document.getElementById('contact-info-title').textContent = data.contact_info.title;
            document.getElementById('contact-info-email').textContent = data.contact_info.email;
            document.getElementById('contact-info-email').href = `mailto:${data.contact_info.email}`;
            document.getElementById('contact-info-legal-title').textContent = data.contact_info.legal_title;
            document.getElementById('contact-info-kvk').textContent = data.contact_info.kvk;
            document.getElementById('contact-info-privacy-policy').textContent = data.contact_info.privacy_policy;
            document.getElementById('contact-info-social-title').textContent = data.contact_info.social_title;
        })
        .catch(error => console.error('Fout bij laden van content:', error));
});