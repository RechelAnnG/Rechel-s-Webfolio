const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

const projectData = [
    {   title: 'Nexus Fintech Sales WebApp | POS System',
        description: ' a secure and user-friendly website that streamlines operations, improves transactions, and promotes transparency for the University of Makati Employees Multi-Purpose Cooperative (UMEMPC).',
        role: ' UI/UX Designer / Programmer',
        tools: [
            { image: 'lreact.png', name:'React'},
            { image: 'lfirebase.png', name:'Firebase'}, 
            { image:'lcss.png', name:'CSS'}, 
            { image: 'lfigma.png', name:'Figma'}, 
            { image: 'lgithub.png', name:'Github'}
        ]
     },
    {   title: 'Jurassic Pot PH WebApp | E - Commerce', 
        description: 'an e-commerce website offering unique dinosaur-themed plant pots, combining creativity and functionality to bring a prehistoric twist to gardening.', 
        role: 'UI/UX Designer / Programmer',
        tools: [
             { image: 'lhtml.png', name:'HTML'}, 
              { image: 'lphp.png', name:'PHP'},
              { image: 'lcss.png', name:'React'}, 
              { image: 'ljs.png', name:'JS'},
              { image: 'lmysql.png', name:'MySQL'},
        ] 
    },
    {   title: ' Grocery Shop Management System', 
        description: 'a user-friendly platform that streamlines inventory, sales, and customer management, enhancing efficiency and ensuring smooth store operations for both staff and customers.', 
        role: ' UI/UX Designer / Main Programmer',
        tools: [ { image: 'lcsharp.png', name:'C#'}

        ]
     },
    {   title: ' UMAK NEXUS', 
        description: ' a secure and user-friendly website that streamlines operations, improves transactions, and promotes transparency for the University of Makati Employees Multi-Purpose Cooperative (UMEMPC).', 
        role: 'UI/UX Designer / Programmer' ,
        tools: [
             { image: 'landroid.png', name:'Android'},
             { image: 'ljava.png', name:'Java'}, 
             { image: 'lfirebase.png', name:'Firebase'}
        ]
    },
    {   title: 'REMIND ME', 
        description: 'a mobile application that keeps your schedule on track with simple, customizable reminders for all your important tasks and events.', 
        role: 'UI/UX Designer' ,
        tools: [
            { image: 'landroid.png', name:'Android'},
            { image: 'ljava.png', name:'Java'}, 
            { image: 'lsqlite.png', name:'SQLite'}
        ]
    },
];

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];

        this.updateDetails(); 
    }

    updateGallery() {
        this.carouselArray.forEach((el, index) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });
    
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    updateDetails() {
        // Assuming the second item in the array (middle of five) is always the centered item
        const activeItem = this.carouselArray[0];
        const projectDetails = projectData[parseInt(activeItem.dataset.index) - 1]; // Assuming your data-index attributes and projectData array are aligned
        
        document.getElementById('project-title').textContent = projectDetails.title;
        document.getElementById('project-description').textContent = projectDetails.description;
        document.getElementById('project-role').textContent = projectDetails.role;

        const toolsContainer = document.querySelector('.proj-tools');
        toolsContainer.innerHTML = ''; // Clear existing tools

        projectDetails.tools.forEach(tool => {
            const toolContainer = document.createElement('div');
            toolContainer.classList.add('tool-item'); // A class for styling the container
    
            const img = document.createElement('img');
            img.src = tool.image; // Use the 'image' property from the tool object
            img.alt = tool.name; // Use the 'name' property for alt text
            img.style.width = '30px'; // Set image size
            img.style.height = '30px';
    
            const text = document.createElement('span');
            text.textContent = tool.name; // Use the 'name' property for the label
            text.style.display = 'block'; // Ensure the text appears below the image
            text.style.textAlign = 'center'; // Center align the text
    
            toolContainer.appendChild(img);
            toolContainer.appendChild(text);
            toolsContainer.appendChild(toolContainer);
        });
    }

    setCurrentState(direction) {
        if (direction.className.includes('previous')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
        this.updateDetails();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            const image = document.createElement('img');
            image.src = control === 'previous' ? 'left-arrow.png' : 'right-arrow.png'; // Adjust path if needed
            image.alt = control === 'previous' ? 'Previous' : 'Next';
            button.appendChild(image);
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

const exampleCarousel = new Carousel (galleryContainer, galleryItems, galleryControls);

 exampleCarousel.setControls();
 exampleCarousel.useControls();


