document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.seo-tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tab = this.getAttribute('data-tab');
      const section = this.closest('.seo-info-section');
      
      // Remove active classes
      section.querySelectorAll('.seo-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      section.querySelectorAll('.seo-tab-panel').forEach(p => {
        p.classList.remove('active');
        // Reset animation
        p.style.animation = 'none';
        p.offsetHeight; // Trigger reflow
        p.style.animation = null; 
      });
      
      // Add active class
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      
      const activePanel = document.getElementById('tab-' + tab);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  document.querySelectorAll('.seo-faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answerId = this.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      const list = this.closest('.seo-faq-list');
      
      // Close all others
      list.querySelectorAll('.seo-faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
      list.querySelectorAll('.seo-faq-answer').forEach(a => a.classList.remove('open'));
      
      // Toggle current
      if (!isOpen) {
        this.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
});
