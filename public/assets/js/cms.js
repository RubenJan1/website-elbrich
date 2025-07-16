document.addEventListener('DOMContentLoaded', () => {
    console.log('CMS.js: Start loading content from /content/index.json');
    
    fetch('/content/index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('CMS.js: Content loaded successfully', data);

            // Hero Section
            const heroTitle = document.getElementById('hero-title');
            const heroLocation = document.getElementById('hero-location');
            const heroDescription = document.getElementById('hero-description');
            const heroButton = document.getElementById('hero-button');
            if (heroTitle) heroTitle.textContent = data.hero.title || '';
            if (heroLocation) heroLocation.textContent = data.hero.location || '';
            if (heroDescription) heroDescription.textContent = data.hero.description || '';
            if (heroButton) heroButton.textContent = data.hero.button || '';

            // About Section
            const aboutTitle = document.getElementById('about-title');
            const aboutDescription = document.getElementById('about-description');
            const aboutButton = document.getElementById('about-button');
            if (aboutTitle) aboutTitle.textContent = data.about.title || '';
            if (aboutDescription) aboutDescription.textContent = data.about.description || '';
            if (aboutButton) aboutButton.textContent = data.about.button || '';

            // Recent Projects Section
            const projectsTitle = document.getElementById('recent-projects-title');
            const projectsViewAll = document.getElementById('recent-projects-view-all');
            const projectsContainer = document.getElementById('projects-container');
            if (projectsTitle) projectsTitle.textContent = data.recent_projects.title || '';
            if (projectsViewAll) projectsViewAll.textContent = data.recent_projects.view_all || '';
            if (projectsContainer) {
                projectsContainer.innerHTML = '';
                data.recent_projects.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.innerHTML = `
                        <p>${project.category || ''}</p>
                        <h3>${project.title || ''}</h3>
                    `;
                    projectsContainer.appendChild(projectDiv);
                });
            }

            // Services Section
            const servicesTitle = document.getElementById('services-title');
            const servicesContainer = document.getElementById('services-container');
            if (servicesTitle) servicesTitle.textContent = data.services.title || '';
            if (servicesContainer) {
                servicesContainer.innerHTML = '';
                data.services.items.forEach(service => {
                    const serviceDiv = document.createElement('div');
                    serviceDiv.innerHTML = `
                        <h3>${service.title || ''}</h3>
                        <p>${service.description || ''}</p>
                    `;
                    servicesContainer.appendChild(serviceDiv);
                });
            }

            // Testimonials Section
            const testimonialsTitle = document.getElementById('testimonials-title');
            const testimonialsSubtitle = document.getElementById('testimonials-subtitle');
            const testimonialsContainer = document.getElementById('testimonials-container');
            if (testimonialsTitle) testimonialsTitle.textContent = data.testimonials.title || '';
            if (testimonialsSubtitle) testimonialsSubtitle.textContent = data.testimonials.subtitle || '';
            if (testimonialsContainer) {
                testimonialsContainer.innerHTML = '';
                data.testimonials.items.forEach(testimonial => {
                    const testimonialDiv = document.createElement('div');
                    testimonialDiv.innerHTML = `
                        <p>${testimonial.quote || ''}</p>
                        <p>${testimonial.author || ''}</p>
                        <p>${testimonial.position || ''}</p>
                    `;
                    testimonialsContainer.appendChild(testimonialDiv);
                });
            }

            // Contact Section
            const contactTitle = document.getElementById('contact-title');
            const contactDescription = document.getElementById('contact-description');
            const contactButton = document.getElementById('contact-button');
            if (contactTitle) contactTitle.textContent = data.contact.title || '';
            if (contactDescription) contactDescription.textContent = data.contact.description || '';
            if (contactButton) contactButton.textContent = data.contact.button || '';

            // Contact Info Section
            const contactInfoTitle = document.getElementById('contact-info-title');
            const contactInfoEmail = document.getElementById('contact-info-email');
            const contactInfoEmailLinkText = document.getElementById('contact-info-email-link-text');
            const contactInfoLegalTitle = document.getElementById('contact-info-legal-title');
            const contactInfoKvk = document.getElementById('contact-info-kvk');
            const contactInfoPrivacyPolicy = document.getElementById('contact-info-privacy-policy');
            const contactInfoSocialTitle = document.getElementById('contact-info-social-title');
            if (contactInfoTitle) contactInfoTitle.textContent = data.contact_info.title || '';
            if (contactInfoEmail) {
                contactInfoEmail.textContent = data.contact_info.email || '';
                contactInfoEmail.href = `mailto:${data.contact_info.email || ''}`;
            }
            if (contactInfoEmailLinkText) {
                contactInfoEmailLinkText.textContent = data.contact_info.email_link_text || '';
                contactInfoEmailLinkText.href = `mailto:${data.contact_info.email || ''}`;
            }
            if (contactInfoLegalTitle) contactInfoLegalTitle.textContent = data.contact_info.legal_title || '';
            if (contactInfoKvk) contactInfoKvk.textContent = data.contact_info.kvk || '';
            if (contactInfoPrivacyPolicy) contactInfoPrivacyPolicy.textContent = data.contact_info.privacy_policy || '';
            if (contactInfoSocialTitle) contactInfoSocialTitle.textContent = data.contact_info.social_title || '';
        })
        .catch(error => {
            console.error('CMS.js: Fout bij laden van content:', error);
        });
});