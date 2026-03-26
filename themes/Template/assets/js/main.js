////
/// Wait for the DOM to fully load
////
document.addEventListener("DOMContentLoaded", function() {
    // Select elements for animations and interactions
    let elements = document.querySelectorAll(".year-section");
    let year_section_desc = document.querySelectorAll(".year-section-description");
    let profimg = document.querySelector(".profile-image-container img");
    let projects_block = document.querySelectorAll(".projects-block");
    let edu_block_container = document.querySelectorAll(".window-card");

    // Observer for elements that need to appear when in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.1 });

    // Observer for elements that should appear only once
    const observerOnce = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target); // Stop observing once shown
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.1 });

    // Observer for staggered animations (one by one)
    const observerOneByone = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("in-view");
                }, index * 300); // Delay each item by 300ms
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    //// 
    /// Apply staggered animations to social items and project blocks
    ////
    let social_items = document.querySelectorAll(".profile-info-links .list-inline-item");
    social_items.forEach((item) => observerOneByone.observe(item));
    projects_block.forEach((item) => observerOneByone.observe(item));
    edu_block_container.forEach((item) => observerOneByone.observe(item));

    //// 
    /// Apply single appearance animations to year sections and descriptions
    ////
    elements.forEach(el => observerOnce.observe(el));
    year_section_desc.forEach(el => observerOnce.observe(el));
    observer.observe(profimg);
});

////
/// Initialize Swiper for image sliders
////
document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,  // Show one image at a time
        spaceBetween: 20,  // Space between slides
        loop: true,        // Infinite loop
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2500,   // Auto-slide every 2.5 seconds
            disableOnInteraction: false,
        },
    });
});

////
/// Function to toggle the sidebar
////
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");

    const navHam = document.querySelector(".nav-ham");
    navHam.classList.toggle("active");
}

////
/// Smooth scrolling and active link highlighting
////
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector(".top_fixed_header");
    const links = document.querySelectorAll(".link-item");
    const sections = document.querySelectorAll("#skills, #experience, #services, #projects, #education, #testimonials, #contact");

    // Smooth scroll to sections
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = header.offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition - offset - 30;

            window.scrollBy({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // Highlight active link based on the current section in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add fixed class to header on scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY >  150) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });

    // Add "loaded" class to body after page load
    // for preloader effect
    window.addEventListener('load', function() {
        document.querySelector('body').classList.add("loaded");
    });
});

////
/// Initialize Owl Carousel for testimonials or other sections
////
$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        loop: true, // Enables infinite loop
        margin: 50, // Adjust margin between items
        nav: false, // Disables navigation arrows
        dots: true, // Enables dots navigation
        autoplay: true, // Enables auto sliding
        autoplayTimeout: 3000, // Auto slide interval in milliseconds
        responsive: {
            0: {
                items: 1 // Show 1 item on small screens
            },
            600: {
                items: 2 // Show 2 items on medium screens
            },
            1024: {
                items: 3 // Show 3 items on large screens
            }
        }
    });
});