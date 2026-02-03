// Base de datos de autos
const cars = [
    {
        id: 1,
        name: "Toyota Corolla",
        category: "sedan",
        year: 2024,
        price: 25000,
        mileage: "0 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🚙"
    },
    {
        id: 2,
        name: "Honda CR-V",
        category: "suv",
        year: 2023,
        price: 35000,
        mileage: "15,000 km",
        transmission: "Automática",
        fuel: "Híbrido",
        icon: "🚗"
    },
    {
        id: 3,
        name: "Ford Mustang",
        category: "deportivo",
        year: 2024,
        price: 55000,
        mileage: "0 km",
        transmission: "Manual",
        fuel: "Gasolina",
        icon: "🏎️"
    },
    {
        id: 4,
        name: "Chevrolet Silverado",
        category: "pickup",
        year: 2023,
        price: 45000,
        mileage: "8,000 km",
        transmission: "Automática",
        fuel: "Diesel",
        icon: "🛻"
    },
    {
        id: 5,
        name: "Mazda 3",
        category: "sedan",
        year: 2024,
        price: 28000,
        mileage: "0 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🚙"
    },
    {
        id: 6,
        name: "Jeep Wrangler",
        category: "suv",
        year: 2023,
        price: 48000,
        mileage: "12,000 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🚙"
    },
    {
        id: 7,
        name: "Porsche 911",
        category: "deportivo",
        year: 2024,
        price: 120000,
        mileage: "0 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🏎️"
    },
    {
        id: 8,
        name: "Toyota Tacoma",
        category: "pickup",
        year: 2024,
        price: 42000,
        mileage: "0 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🛻"
    },
    {
        id: 9,
        name: "BMW Serie 3",
        category: "sedan",
        year: 2023,
        price: 52000,
        mileage: "5,000 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🚙"
    },
    {
        id: 10,
        name: "Audi Q5",
        category: "suv",
        year: 2024,
        price: 58000,
        mileage: "0 km",
        transmission: "Automática",
        fuel: "Híbrido",
        icon: "🚗"
    },
    {
        id: 11,
        name: "Nissan GT-R",
        category: "deportivo",
        year: 2023,
        price: 115000,
        mileage: "3,000 km",
        transmission: "Automática",
        fuel: "Gasolina",
        icon: "🏎️"
    },
    {
        id: 12,
        name: "RAM 1500",
        category: "pickup",
        year: 2024,
        price: 50000,
        mileage: "0 km",
        transmission: "Automática",
        fuel: "Diesel",
        icon: "🛻"
    }
];

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para crear tarjeta de auto
function createCarCard(car) {
    return `
        <div class="car-card" data-category="${car.category}">
            <div class="car-image">
                ${car.icon}
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <span class="car-category">${getCategoryName(car.category)}</span>
                <ul class="car-specs">
                    <li>📅 Año: ${car.year}</li>
                    <li>🛣️ Kilometraje: ${car.mileage}</li>
                    <li>⚙️ ${car.transmission}</li>
                    <li>⛽ ${car.fuel}</li>
                </ul>
                <div class="car-price">${formatPrice(car.price)}</div>
                <a href="#contacto" class="btn-primary" onclick="selectCar('${car.name}')">Contactar</a>
            </div>
        </div>
    `;
}

// Función para obtener nombre de categoría en español
function getCategoryName(category) {
    const categories = {
        'sedan': 'Sedán',
        'suv': 'SUV',
        'deportivo': 'Deportivo',
        'pickup': 'Pickup'
    };
    return categories[category] || category;
}

// Función para renderizar autos
function renderCars(category = 'todos') {
    const container = document.getElementById('cars-container');
    let filteredCars = category === 'todos' ? cars : cars.filter(car => car.category === category);
    
    container.innerHTML = filteredCars.map(car => createCarCard(car)).join('');
}

// Función para filtrar autos
function filterCars(category) {
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Renderizar autos filtrados
    renderCars(category);
    
    // Agregar animación
    const cards = document.querySelectorAll('.car-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para seleccionar auto y llenar formulario
function selectCar(carName) {
    // Guardar en localStorage para mostrar en el formulario
    localStorage.setItem('selectedCar', carName);
    
    // Opcional: mostrar alerta
    setTimeout(() => {
        alert(`Interesado en: ${carName}\nCompleta el formulario y nos contactaremos contigo.`);
    }, 300);
}

// Scroll suave para links de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar autos inicialmente
    renderCars();
    
    // Configurar filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterCars(category);
        });
    });
    
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Manejar envío de formulario
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedCar = localStorage.getItem('selectedCar');
            let message = '¡Gracias por contactarnos!';
            
            if (selectedCar) {
                message += `\n\nHemos recibido tu interés en: ${selectedCar}`;
                localStorage.removeItem('selectedCar');
            }
            
            message += '\n\nNos pondremos en contacto contigo pronto.';
            
            alert(message);
            contactForm.reset();
        });
    }
    
    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar secciones
    document.querySelectorAll('.servicio-card, .car-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Agregar efecto parallax al hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});