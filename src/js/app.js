document.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    createGallery();
    scrollNav();
};

function scrollNav() {
    const links = document.querySelectorAll('.main-navigation a');
    links.forEach( link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollSection = e.target.attributes.href.value
            const section = document.querySelector(scrollSection);
            section.scrollIntoView({ behavior: "smooth" });
        })
    });
}

function createGallery() {
    const gallery = document.querySelector('.images-gallery');
    
    for(let i = 1; i <= 12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galería">
        `;
        image.onclick = function() {
            showImage(i);
        }

        gallery.appendChild(image);
    }
};

function showImage(id) {
    const image = document.createElement('picture');
    image.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen Galería">
    `;

    // Creating Overlay with image
    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');
    overlay.appendChild(image);
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('attach-body');
        overlay.remove();
    }

    // Button to close Modal
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('close-btn');
    closeModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('attach-body');
        overlay.remove();
    };
    overlay.appendChild(closeModal);

    // Adding Overlay to HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('attach-body');
}