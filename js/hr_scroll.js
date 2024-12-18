const scrollWrapper = document.querySelector('.scroll-wrapper');
    const leftButton = document.querySelector('.scroll-btn.left');
    const rightButton = document.querySelector('.scroll-btn.right');
  
    const scrollStep = 150; // Adjust the scroll step size as needed
  
    // Scroll buttons functionality
    leftButton.addEventListener('click', () => {
      scrollWrapper.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
  
    rightButton.addEventListener('click', () => {
      scrollWrapper.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
  
    // Optional: Disable buttons at the edges
    function toggleButtons() {
      leftButton.disabled = scrollWrapper.scrollLeft === 0;
      rightButton.disabled = scrollWrapper.scrollLeft + scrollWrapper.clientWidth >= scrollWrapper.scrollWidth;
    }
  
    scrollWrapper.addEventListener('scroll', toggleButtons);
    toggleButtons(); // Initial check
  
    // Drag-to-scroll functionality
    let isDragging = false;
    let startX;
    let scrollLeft;
  
    // Mouse events
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
      const walk = (x - startX); // Adjust scroll speed as needed
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
      // console.log(x);
      const walk = (x - startX); // Adjust scroll speed as needed
      scrollWrapper.scrollLeft = scrollLeft - walk;
      
    });
  
    scrollWrapper.addEventListener('touchend', () => {
      isDragging = false;
    });