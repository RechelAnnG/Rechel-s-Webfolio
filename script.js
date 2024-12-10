const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

// Arrays for title, description, and date
const titles = [
    "NEXUS FINTECH SALES",
    "JURRASIC POT PH",
    "J2RD GROCERY SHOP MANAGEMENT SYSTEM",
    "AIRLINE TICKETING SYSTEM | MERC Airlines",
    "ORDERING SYSTEM | DOMI’S DONUTS & DRINKS",
    "BUS TICKETING SYSTEM | MERC Bus"
];

const descriptions = [
    "a secure and user-friendly website that streamlines operations, improves transactions, and promotes transparency for the University of Makati Employees Multi-Purpose Cooperative (UMEMPC).",
    "an e-commerce website offering unique dinosaur-themed plant pots, combining creativity and functionality to bring a prehistoric twist to gardening.",
    "a user-friendly platform that streamlines inventory, sales, and customer management, enhancing efficiency and ensuring smooth store operations for both staff and customers.",
    "Da streamlined platform designed to simplify flight bookings, manage customer details, and ensure a seamless ticketing experience.",
    "a small project designed to simplify ordering donuts and drinks, featuring a basic menu and inventory management for quick and easy transactions.",
    "a streamlined platform designed to simplify bus bookings, manage customer details, and ensure a seamless ticketing experience."
];

const dates = [
    "OCTOBER 2023 - 2024",
    "FEBRUARY 2023 - MAY 2023",
    "DECEMBER 2022 - JANUARY 2023",
    "NOVEMBER 2021 - JANUARY 2022",
    "MARCH 2020 - APRIL 2020",
    "SEPTEMBER 2019- NOVEMBER 2019"
];



document.querySelector('.next').addEventListener('click', function() {
    changeSlide(1);
});
document.querySelector('.prev').addEventListener('click', function() {
    changeSlide(-1);
});

function changeSlide(move) {
    let slides = document.querySelectorAll('.slide');
    let current = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    slides[current].classList.remove('active');
    let newSlide = current + move;
    if (newSlide >= slides.length) newSlide = 0;
    if (newSlide < 0) newSlide = slides.length - 1;
    slides[newSlide].classList.add('active');
}

document.querySelector('.view-large').addEventListener('click', function() {
    let currentImage = document.querySelector('.slide.active img').src;
    window.open(currentImage, '_blank');
});

document.querySelector('.view-large-goal').addEventListener('click', function() {
    let currentImage = document.querySelector('.slider-container-goal .slide.active img').src;
    window.open(currentImage, '_blank');
});



document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optionally remove 'visible' class when out of view to allow re-animation
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Adjust this value based on when you want the animation to trigger
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    setupSlider('.slider-container', '.slide'); // Setup for Letter section
    setupSlider('.slider-container-certificates', '.certificate-slide'); // Setup for Certificates section
    
    // Add the setup for the Goal Map & Network Chart section
    setupSlider('.slider-container-goal', '.slide');
});


function setupSlider(containerSelector, slideSelector) {
    const container = document.querySelector(containerSelector);
    const slides = container.querySelectorAll(slideSelector);
    let currentSlide = 0;

    container.querySelector('.prev').addEventListener('click', function() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        updateSlides();
    });

    container.querySelector('.next').addEventListener('click', function() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        updateSlides();
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.display = (index === currentSlide) ? 'block' : 'none';
        });
    }

    updateSlides(); // Initialize to show the first slide
}

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, {
        threshold: 0.5 // Adjust this value based on when you want the animation to trigger
    });

    document.querySelectorAll('.award-image').forEach(img => {
        observer.observe(img);
    });
});



class Carousel { 
    constructor(container, items, controls, titles, descriptions, dates) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselItems = [...items];
        this.titles = titles;
        this.descriptions = descriptions;
        this.dates = dates;
        this.descriptionElement = document.getElementById('image-description');
        this.initializeGallery();
    }

    initializeGallery() {
        this.updateGallery();
        this.updateDescription();
    }

    updateGallery() {
        this.carouselItems.forEach((el, index) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5', 'gallery-item-6');
            el.classList.add(`gallery-item-${index+1}`);
        });
    }

    updateDescription() {
        // Find the currently centered item
        const centeredItem = this.carouselItems.find(el => el.classList.contains('gallery-item-1'));
        if (!centeredItem) return;

        // Get the data-index from the centered item
        const dataIndex = parseInt(centeredItem.getAttribute('data-index'), 10);
        const title = this.titles[dataIndex - 1];
        const description = this.descriptions[dataIndex - 1];
        const date = this.dates[dataIndex - 1];

        // Update the #image-description content
        // Using innerHTML so we can format nicely
        this.descriptionElement.innerHTML = `
            <strong>${title}</strong><br>
            ${description}<br>
            <em>${date}</em>
        `;
    }

    setCurrentState(direction) {
        if (direction.className.includes('previous')) {
            this.carouselItems.push(this.carouselItems.shift());
        } else {
            this.carouselItems.unshift(this.carouselItems.pop());
        }
        this.updateGallery();
        this.updateDescription();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls, titles, descriptions, dates);
exampleCarousel.setControls();
exampleCarousel.useControls();