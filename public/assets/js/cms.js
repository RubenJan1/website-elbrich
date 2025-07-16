document.addEventListener('DOMContentLoaded', () => {
    console.log('CMS.js: Start loading content from /public/content/index.json');
    
    fetch('/public/content/index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('CMS.js: Content loaded successfully', data);

            // Helper functie om tekst en href in te stellen
            const setTextAndHref = (id, text, href) => {
                const element = document.querySelector(`[data-sb-field-path="${id}"]`);
                if (element) {
                    element.textContent = text || '';
                    if (href && element.tagName === 'A') element.href = href;
                }
            };

            // Hero Section
            setTextAndHref('hero.title', data.hero?.title, null);
            setTextAndHref('hero.location', data.hero?.location, null);
            setTextAndHref('hero.description', data.hero?.description, null);
            setTextAndHref('hero.button', data.hero?.button, data.hero?.button ? '#' : '');

            // About Section
            setTextAndHref('about.title', data.about?.title, null);
            setTextAndHref('about.description', data.about?.description, null);
            setTextAndHref('about.button', data.about?.button, data.about?.button ? 'wie-ben-ik.html' : '');

            // Recent Projects Section
            setTextAndHref('recent_projects.title', data.recent_projects?.title, null);
            setTextAndHref('recent_projects.view_all', data.recent_projects?.view_all, data.recent_projects?.view_all ? 'portfolio.html' : '');
            const projectsContainer = document.querySelector('[data-sb-field-path="recent_projects.projects"]');
            if (projectsContainer) {
                projectsContainer.innerHTML = '';
                (data.recent_projects?.projects || []).forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.setAttribute('data-sb-field-path', '.[]');
                    projectDiv.innerHTML = `
                        <p data-sb-field-path="category">${project.category || 'No Category'}</p>
                        <h3 data-sb-field-path="title">${project.title || 'No Title'}</h3>
                    `;
                    projectsContainer.appendChild(projectDiv);
                });
            }

            // Services Section
            setTextAndHref('services.title', data.services?.title, null);
            const servicesContainer = document.querySelector('[data-sb-field-path="services.items"]');
            if (servicesContainer) {
                servicesContainer.innerHTML = '';
                (data.services?.items || []).forEach(service => {
                    const serviceDiv = document.createElement('div');
                    serviceDiv.setAttribute('data-sb-field-path', '.[]');
                    serviceDiv.innerHTML = `
                        <h3 data-sb-field-path="title">${service.title || 'No Title'}</h3>
                        <p data-sb-field-path="description">${service.description || 'No Description'}</p>
                    `;
                    servicesContainer.appendChild(serviceDiv);
                });
            }

            // Testimonials Section
            setTextAndHref('testimonials.title', data.testimonials?.title, null);
            setTextAndHref('testimonials.subtitle', data.testimonials?.subtitle, null);
            const testimonialsContainer = document.querySelector('[data-sb-field-path="testimonials.items"]');
            if (testimonialsContainer) {
                testimonialsContainer.innerHTML = '';
                (data.testimonials?.items || []).forEach(testimonial => {
                    const testimonialDiv = document.createElement('div');
                    testimonialDiv.setAttribute('data-sb-field-path', '.[]');
                    testimonialDiv.innerHTML = `
                        <p data-sb-field-path="quote">${testimonial.quote || 'No Quote'}</p>
                        <p data-sb-field-path="author">${testimonial.author || 'No Author'}</p>
                        <p data-sb-field-path="position">${testimonial.position || 'No Position'}</p>
                    `;
                    testimonialsContainer.appendChild(testimonialDiv);
                });
            }

            // Contact Section
            setTextAndHref('contact.title', data.contact?.title, null);
            setTextAndHref('contact.description', data.contact?.description, null);
            setTextAndHref('contact.button', data.contact?.button, null);

            // Contact Info Section
            setTextAndHref('contact_info.title', data.contact_info?.title, null);
            setTextAndHref('contact_info.email', data.contact_info?.email, data.contact_info?.email ? `mailto:${data.contact_info.email}` : '');
            setTextAndHref('contact_info.email_link_text', data.contact_info?.email_link_text, data.contact_info?.email ? `mailto:${data.contact_info.email}` : '');
            setTextAndHref('contact_info.legal_title', data.contact_info?.legal_title, null);
            setTextAndHref('contact_info.kvk', data.contact_info?.kvk, null);
            setTextAndHref('contact_info.privacy_policy', data.contact_info?.privacy_policy, data.contact_info?.privacy_policy ? '#' : '');
            setTextAndHref('contact_info.social_title', data.contact_info?.social_title, null);
        })
        .catch(error => {
            console.error('CMS.js: Fout bij laden van content:', error);
            // Fallback content
            document.querySelector('[data-sb-field-path="hero.title"]')?.textContent = 'Doorbellieslens - Fotografie';
            document.querySelector('[data-sb-field-path="hero.location"]')?.textContent = 'Bolsward, NL';
            document.querySelector('[data-sb-field-path="hero.description"]')?.textContent = 'Gun jezelf een moment voor jou.';
            document.querySelector('[data-sb-field-path="hero.button"]')?.textContent = 'Huur mij in';
        });
});