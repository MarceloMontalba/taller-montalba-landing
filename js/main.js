/**
 * TALLER MONTALBA - INTERACTIVE LOGIC & SCRIPTS
 * Taller Especializado en Reparación y Restauración de Cocinas a Leña Tradicionales
 * Chacabuco 128, Galvarino, Región de La Araucanía, Chile
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSlider();
  initUnifiedCotizadorContact();
  initFaqAccordion();
  initNavDropdown();
  initMobileNav();
  initScrollHeader();
  initScrollSpy();
  initScrollTopButton();
});

/* ==========================================================================
   1. BEFORE / AFTER COMPARISON SLIDER
   ========================================================================== */
function initComparisonSlider() {
  const slider = document.querySelector('.comparison-slider');
  if (!slider) return;

  const beforeContainer = slider.querySelector('.comparison-before');
  const handle = slider.querySelector('.slider-handle');
  let isDragging = false;

  const updatePosition = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percentage = (x / rect.width) * 100;
    
    beforeContainer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  });

  // Touch Support
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  // Initial position
  beforeContainer.style.width = '50%';
  handle.style.left = '50%';
}

/* ==========================================================================
   2. UNIFIED RESTORATION COTIZADOR & TECHNICAL CONTACT HANDLER
   ========================================================================== */
function initUnifiedCotizadorContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formName = document.getElementById('formName');
  const formPhone = document.getElementById('formPhone');
  const formCity = document.getElementById('formCity');
  const formService = document.getElementById('formService');
  const formMessage = document.getElementById('formMessage');
  const emailBtn = document.getElementById('formEmailBtn');

  // Restoration options block & controls
  const restorationBlock = document.getElementById('restorationOptionsBlock');
  const stoveType = document.getElementById('calcStoveType');
  const stoveState = document.getElementById('calcStoveState');
  const checkTraslado = document.getElementById('calcAddTraslado');

  // Summary elements
  const summaryService = document.getElementById('summaryService');
  const summaryStove = document.getElementById('summaryStove');
  const summaryScope = document.getElementById('summaryScope');
  const summaryExtras = document.getElementById('summaryExtras');
  const summaryEstTime = document.getElementById('summaryEstTime');

  const summaryStoveRow = document.getElementById('summaryStoveRow');
  const summaryScopeRow = document.getElementById('summaryScopeRow');
  const summaryExtrasRow = document.getElementById('summaryExtrasRow');

  // Dynamic form UI elements
  const formMessageLabel = document.getElementById('formMessageLabel');
  const photoNoticeBox = document.getElementById('photoNoticeBox');
  const noticeIcon = document.getElementById('noticeIcon');
  const noticeText = document.getElementById('noticeText');
  const submitBtnText = document.getElementById('submitBtnText');

  function updateSummary() {
    const selectedServiceVal = formService ? formService.value : 'restauracion-integral';
    const selectedServiceText = formService ? formService.options[formService.selectedIndex].text : 'Restauración Integral Completa de Cocina a Leña';

    if (summaryService) summaryService.textContent = selectedServiceText;

    const isGeneralWorkshopInquiry = selectedServiceVal === 'consulta-taller';

    if (restorationBlock) {
      restorationBlock.style.display = isGeneralWorkshopInquiry ? 'none' : 'block';
    }
    if (summaryStoveRow) summaryStoveRow.style.display = isGeneralWorkshopInquiry ? 'none' : 'flex';
    if (summaryScopeRow) summaryScopeRow.style.display = isGeneralWorkshopInquiry ? 'none' : 'flex';
    if (summaryExtrasRow) summaryExtrasRow.style.display = isGeneralWorkshopInquiry ? 'none' : 'flex';

    // Adapt contextual hints, placeholders and buttons
    if (selectedServiceVal === 'restauracion-integral') {
      if (formMessage) formMessage.placeholder = 'Ej: La cocina humea mucho al encender, tiene las latas del fondo quemadas o es una cocina antigua heredada...';
      if (formMessageLabel) formMessageLabel.textContent = 'Cuéntanos más detalles sobre tu cocina (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-camera';
      if (noticeText) noticeText.innerHTML = '<strong>¿Tienes fotos de tu cocina?</strong> Al presionar el botón se abrirá WhatsApp para que puedas adjuntárselas directamente al taller y recibir un diagnóstico técnico preliminar.';
      if (submitBtnText) submitBtnText.textContent = 'Enviar Consulta / Fotos por WhatsApp';
    } else if (selectedServiceVal === 'cambio-latas') {
      if (formMessage) formMessage.placeholder = 'Ej: El fondo del fuego se perforó y cae ceniza, o las latas laterales del horno están adelgazadas...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalle de las latas o partes quemadas (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-layer-group';
      if (noticeText) noticeText.innerHTML = '<strong>Latas de Alto Espesor:</strong> Sustituimos las partes quemadas por planchas de acero nuevas con soldadura reforzada para devolverle la firmeza.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Cambio de Latas por WhatsApp';
    } else if (selectedServiceVal === 'refractarios') {
      if (formMessage) formMessage.placeholder = 'Ej: Los ladrillos del fondo se rompieron y no retiene calor hacia el horno...';
      if (formMessageLabel) formMessageLabel.textContent = 'Estado de los ladrillos o caja de fuego (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-cubes';
      if (noticeText) noticeText.innerHTML = '<strong>Cámaras Refractarias a 1300°C:</strong> Ladrillos de alta densidad y mortero térmico para máximo calor y menor consumo de leña.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Refractarios por WhatsApp';
    } else if (selectedServiceVal === 'humo-tiro') {
      if (formMessage) formMessage.placeholder = 'Ej: Sale humo por las compuertas o las uniones de cañones al encender...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalle del problema de humo o tiraje (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-smog';
      if (noticeText) noticeText.innerHTML = '<strong>Diagnóstico de Tiraje:</strong> Sellado hermético de pasos de humo, compuertas y adaptación de cañones para aire limpio.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Tiraje / Humo por WhatsApp';
    } else if (selectedServiceVal === 'evaluacion-fotos') {
      if (formMessage) formMessage.placeholder = 'Ej: Deseo enviar fotos para saber si la cocina tiene arreglo y cuánto saldría...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalles adicionales sobre la cocina (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-camera';
      if (noticeText) noticeText.innerHTML = '<strong>Evaluación por Fotos:</strong> Al abrirse WhatsApp podrás adjuntar las fotos de la cocina para una respuesta directa del taller.';
      if (submitBtnText) submitBtnText.textContent = 'Enviar Fotos para Diagnóstico por WhatsApp';
    } else {
      if (formMessage) formMessage.placeholder = 'Ej: Horarios de atención para llevar una cocina al taller en Chacabuco 128 o dudas técnicas...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalle de tu consulta (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-location-dot';
      if (noticeText) noticeText.innerHTML = '<strong>Atención Directa:</strong> Atención técnica directa en nuestro taller de Chacabuco 128, Galvarino.';
      if (submitBtnText) submitBtnText.textContent = 'Enviar Consulta por WhatsApp';
    }

    if (!isGeneralWorkshopInquiry) {
      const typeText = stoveType ? stoveType.options[stoveType.selectedIndex].text : '';
      const stateText = stoveState ? stoveState.options[stoveState.selectedIndex].text : '';
      
      if (summaryStove) summaryStove.textContent = typeText;
      if (summaryScope) summaryScope.textContent = stateText;

      if (summaryExtras) {
        summaryExtras.textContent = (checkTraslado && checkTraslado.checked)
          ? 'Consultar traslado (zona Galvarino)'
          : 'No solicitado';
      }

      if (summaryEstTime) {
        if (selectedServiceVal === 'evaluacion-fotos') {
          summaryEstTime.textContent = 'Diagnóstico preliminar inmediato por WhatsApp';
        } else if (stoveState && stoveState.value === 'lata-total') {
          summaryEstTime.textContent = '7 a 12 días hábiles aprox. (Restauración completa)';
        } else if (stoveState && stoveState.value === 'humo-latas') {
          summaryEstTime.textContent = '5 a 8 días hábiles aprox. (Cambio de latas y sellado)';
        } else if (stoveState && stoveState.value === 'ladrillos') {
          summaryEstTime.textContent = '3 a 5 días hábiles aprox. (Ladrillos refractarios)';
        } else if (stoveState && stoveState.value === 'cubierta') {
          summaryEstTime.textContent = '4 a 7 días hábiles aprox. (Rectificación de cubierta)';
        } else {
          summaryEstTime.textContent = '7 a 12 días hábiles según estado';
        }
      }
    } else {
      if (summaryEstTime) {
        summaryEstTime.textContent = 'Atención directa en taller Chacabuco 128, Galvarino';
      }
    }
  }

  // Event listeners for dynamic updates
  if (formService) formService.addEventListener('change', updateSummary);
  [stoveType, stoveState, checkTraslado].forEach(el => {
    if (el) el.addEventListener('change', updateSummary);
  });

  // Build payload text
  function buildMessagePayload() {
    const name = formName ? formName.value.trim() : '';
    const phone = formPhone ? formPhone.value.trim() : '';
    const city = formCity ? formCity.value.trim() : '';
    const serviceVal = formService ? formService.value : 'restauracion-integral';
    const serviceText = formService ? formService.options[formService.selectedIndex].text : '';
    const message = formMessage ? formMessage.value.trim() : '';

    let payload = `Hola Taller Montalba, te contacto desde el sitio web:\n`;
    payload += `• Nombre: ${name}\n`;
    payload += `• Teléfono: ${phone}\n`;
    payload += `• Sector / Comuna: ${city || 'No especificada'}\n`;
    payload += `• Servicio requerido: ${serviceText}\n`;

    if (serviceVal !== 'consulta-taller') {
      const typeText = stoveType ? stoveType.options[stoveType.selectedIndex].text : '';
      const stateText = stoveState ? stoveState.options[stoveState.selectedIndex].text : '';
      const trasladoSolicitado = checkTraslado && checkTraslado.checked;

      payload += `• Formato de cocina: ${typeText}\n`;
      payload += `• Problema / intervención: ${stateText}\n`;
      payload += `• Traslado en Galvarino: ${trasladoSolicitado ? 'Solicitado' : 'No requerido'}\n`;
    }

    if (message) {
      payload += `• Detalle o consulta: ${message}\n`;
    }

    return { name, phone, payload };
  }

  // Handle WhatsApp Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = buildMessagePayload();

    if (!data.name || !data.phone) {
      alert('Por favor ingresa tu nombre y teléfono de contacto.');
      return;
    }

    const url = `https://wa.me/56995253536?text=${encodeURIComponent(data.payload)}`;
    window.open(url, '_blank');
  });

  // Handle Email Button Click
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      const data = buildMessagePayload();

      if (!data.name || !data.phone) {
        alert('Por favor ingresa al menos tu nombre y teléfono antes de enviar por correo.');
        return;
      }

      const subject = `Consulta Reparación Cocina - ${data.name}`;
      const mailtoUrl = `mailto:montalbalex.mamg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(data.payload)}`;
      window.location.href = mailtoUrl;
    });
  }

  // Initial run
  updateSummary();
}

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close other items
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   4. NAVIGATION DROPDOWN ("MÁS")
   ========================================================================== */
function initNavDropdown() {
  const dropdown = document.getElementById('navMoreDropdown');
  const toggleBtn = document.getElementById('navDropdownToggle');
  if (!dropdown || !toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('active');
    const isExpanded = dropdown.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown when clicking any link inside
  dropdown.querySelectorAll('.nav-dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  // Close nav when clicking a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });
}

/* ==========================================================================
   6. STICKY HEADER ON SCROLL
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   7. ACTIVE SECTION SCROLLSPY
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id], div[id="inicio"]');
  const navLinks = document.querySelectorAll('.main-nav a.nav-link, .nav-dropdown-menu a.nav-dropdown-link');
  const moreDropdownBtn = document.getElementById('navDropdownToggle');

  if (!navLinks.length) return;

  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerOffset = 150;
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // If near bottom of the page, activate the contact section
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 90) {
      currentSectionId = 'contacto';
    }

    if (!currentSectionId && scrollY < 200) {
      currentSectionId = 'inicio';
    }

    let isInsideMoreDropdown = false;

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || 
         (currentSectionId === 'proceso' && href === '#restauraciones')) {
        link.classList.add('active');
        if (link.classList.contains('nav-dropdown-link')) {
          isInsideMoreDropdown = true;
        }
      }
    });

    // If active section is inside the "Más" dropdown (ubicacion, faq), highlight "Más"
    if (moreDropdownBtn) {
      if (isInsideMoreDropdown || currentSectionId === 'ubicacion' || currentSectionId === 'faq') {
        moreDropdownBtn.classList.add('active');
      } else {
        moreDropdownBtn.classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   8. SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
