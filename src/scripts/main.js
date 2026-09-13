/**
 * NOVA STUDIO — Main JavaScript Application Entry Point
 * Initializes canvas particle physics, navigation, scroll animations and contact form.
 */

import { initHeroCanvas } from './canvas.js';
import { initNavigation } from './navigation.js';
import { initScrollReveal } from './animations.js';
import { initContactForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initNavigation();
  initScrollReveal();
  initContactForm();
});
