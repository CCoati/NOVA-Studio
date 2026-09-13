/**
 * NOVA STUDIO — Navigation & Scroll Interactions
 * Handles top scroll progress bar, navbar shadow states, side-nav scrollspy and mobile drawer.
 */

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scrollProgress');
  const sections = document.querySelectorAll('section[id]');
  const sideNavItems = document.querySelectorAll('.side-nav-item');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link, #mobileMenuCta');

  // Scroll Progress & Navbar Scrolled Class
  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Side Navigation Active State Scrollspy
    if (sections.length && sideNavItems.length) {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 200;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sideNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
              item.classList.add('active');
            }
          });
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Menu Toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }
}
