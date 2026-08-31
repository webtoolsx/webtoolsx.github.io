document.addEventListener('DOMContentLoaded', () => {
  const scrollWrapper = document.querySelector('.scroll-wrapper') || document.querySelector('.hr_nav-scroll');
  const leftButton = document.querySelector('.scroll-btn.left');
  const rightButton = document.querySelector('.scroll-btn.right');

  if (!scrollWrapper) return;

  const scrollStep = 200;

  if (leftButton) {
    leftButton.addEventListener('click', (e) => {
      e.preventDefault();
      scrollWrapper.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
  }

  if (rightButton) {
    rightButton.addEventListener('click', (e) => {
      e.preventDefault();
      scrollWrapper.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
  }

  function toggleButtons() {
    if (leftButton) {
      leftButton.disabled = scrollWrapper.scrollLeft <= 2;
    }
    if (rightButton) {
      rightButton.disabled = Math.ceil(scrollWrapper.scrollLeft + scrollWrapper.clientWidth) >= scrollWrapper.scrollWidth - 2;
    }
  }

  scrollWrapper.addEventListener('scroll', toggleButtons);
  window.addEventListener('resize', toggleButtons);
  setTimeout(toggleButtons, 100);

  // Drag-to-scroll functionality
  let isDragging = false;
  let startX;
  let scrollLeft;

  scrollWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
    scrollWrapper.style.cursor = 'grabbing';
  });

  scrollWrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollWrapper.style.cursor = 'grab';
  });

  scrollWrapper.addEventListener('mouseup', () => {
    isDragging = false;
    scrollWrapper.style.cursor = 'grab';
  });

  scrollWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX);
    scrollWrapper.scrollLeft = scrollLeft - walk;
  });

  // Touch events
  scrollWrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
  });

  scrollWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX);
    scrollWrapper.scrollLeft = scrollLeft - walk;
  });

  scrollWrapper.addEventListener('touchend', () => {
    isDragging = false;
  });
});