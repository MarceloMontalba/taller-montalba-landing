/**
 * TALLER MONTALBA - INTERACTIVIDAD & LÓGICA
 * JavaScript para Landing Page Mockup
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. HEADER SCROLL EFFECT & MOBILE MENU
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sombra al scrollear
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  // Toggle menú móvil
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // ScrollSpy para enlaces activos
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================================================
     2. SLIDER INTERACTIVO ANTES & DESPUÉS (BEFORE / AFTER)
     ========================================================================== */
  const comparisonSlider = document.getElementById('comparisonSlider');
  const beforeWrapper = document.getElementById('beforeWrapper');
  const sliderHandle = document.getElementById('sliderHandle');

  if (comparisonSlider && beforeWrapper && sliderHandle) {
    let isDragging = false;

    function updateSliderPosition(x) {
      const rect = comparisonSlider.getBoundingClientRect();
      let offsetX = x - rect.left;
      
      // Limitar entre 0% y 100%
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeWrapper.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    }

    // Mouse Events
    sliderHandle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    // Touch Events (Móviles & Tablets)
    sliderHandle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    // Clic directo en cualquier parte del contenedor
    comparisonSlider.addEventListener('click', (e) => {
      updateSliderPosition(e.clientX);
    });
  }

  /* ==========================================================================
     3. FILTRADO DINÁMICO DE PRODUCTOS DEL CATÁLOGO
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Activar botón
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Botones de cotización rápida en las tarjetas de productos
  const addQuoteButtons = document.querySelectorAll('.add-quote-btn');
  addQuoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodName = btn.getAttribute('data-product');
      const message = `Hola Don Marcelo, me interesa cotizar el artículo: "${prodName}". ¿Tiene disponibilidad y medidas?`;
      const whatsappUrl = `https://wa.me/56987654321?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  /* ==========================================================================
     4. CALCULADORA & COTIZADOR INTERACTIVO DE RESTAURACIÓN
     ========================================================================== */
  const quoteForm = document.getElementById('restorationQuoteForm');
  const estimatedPriceText = document.getElementById('estimatedPriceText');
  const btnSendWhatsappQuote = document.getElementById('btnSendWhatsappQuote');
  const stovePhotoInput = document.getElementById('stovePhotoInput');
  const photoDropZone = document.getElementById('photoDropZone');
  const filePreview = document.getElementById('filePreview');

  // Precios base según tipo de artefacto
  const baseStoveMultipliers = {
    'cocina_mueble_estandar': 1.0,
    'cocina_mueble_grande': 1.30,
    'cocina_economica_chapa': 0.80
  };

  function calculateQuote() {
    if (!quoteForm) return { min: 0, max: 0, items: [] };

    // 1. Tipo de artefacto
    const selectedStove = quoteForm.querySelector('input[name="stoveType"]:checked')?.value || 'cocina_mueble_estandar';
    const multiplier = baseStoveMultipliers[selectedStove] || 1.0;

    let subtotalServices = 0;
    let selectedServicesList = [];

    // 2. Servicios seleccionados
    const serviceCheckboxes = quoteForm.querySelectorAll('input[name="service"]:checked');
    serviceCheckboxes.forEach(cb => {
      const cost = parseFloat(cb.getAttribute('data-cost')) || 0;
      subtotalServices += cost;
      const label = cb.closest('.custom-checkbox')?.querySelector('strong')?.innerText || cb.value;
      selectedServicesList.push(label);
    });

    // 3. Artículos / cañerías adicionales
    let subtotalAddons = 0;
    let selectedAddonsList = [];
    const addonCheckboxes = quoteForm.querySelectorAll('input[name="addon"]:checked');
    addonCheckboxes.forEach(cb => {
      const cost = parseFloat(cb.getAttribute('data-cost')) || 0;
      subtotalAddons += cost;
      const label = cb.closest('.custom-checkbox')?.querySelector('strong')?.innerText || cb.value;
      selectedAddonsList.push(label);
    });

    // Total estimado con rango
    const adjustedServices = subtotalServices * multiplier;
    const baseTotal = adjustedServices + subtotalAddons;
    
    // Si no ha seleccionado nada
    if (baseTotal === 0) {
      if (estimatedPriceText) {
        estimatedPriceText.innerText = '$0 CLP (Selecciona opciones)';
      }
      return { min: 0, max: 0, items: [], addons: [] };
    }

    const minEstimate = Math.round(baseTotal * 0.95);
    const maxEstimate = Math.round(baseTotal * 1.15);

    // Formatear en pesos chilenos
    const formatCLP = (val) => '$' + val.toLocaleString('es-CL');

    if (estimatedPriceText) {
      estimatedPriceText.innerText = `${formatCLP(minEstimate)} - ${formatCLP(maxEstimate)} CLP`;
    }

    return {
      stoveType: selectedStove,
      min: minEstimate,
      max: maxEstimate,
      services: selectedServicesList,
      addons: selectedAddonsList
    };
  }

  // Recalcular al cambiar cualquier opción
  if (quoteForm) {
    quoteForm.addEventListener('change', calculateQuote);
    // Cálculo inicial
    calculateQuote();
  }

  // Manejo de DropZone y subida de fotos (Mockup)
  if (photoDropZone && stovePhotoInput) {
    photoDropZone.addEventListener('click', () => stovePhotoInput.click());

    stovePhotoInput.addEventListener('change', () => {
      if (stovePhotoInput.files && stovePhotoInput.files.length > 0) {
        filePreview.innerHTML = '';
        for (let i = 0; i < stovePhotoInput.files.length; i++) {
          const file = stovePhotoInput.files[i];
          const chip = document.createElement('span');
          chip.className = 'preview-chip';
          chip.innerHTML = `<i class="fa-solid fa-image"></i> ${file.name} (${Math.round(file.size / 1024)} KB)`;
          filePreview.appendChild(chip);
        }
      }
    });

    // Drag & Drop
    ['dragenter', 'dragover'].forEach(eventName => {
      photoDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        photoDropZone.style.borderColor = '#d9531e';
        photoDropZone.style.backgroundColor = 'rgba(217, 83, 30, 0.08)';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      photoDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        photoDropZone.style.borderColor = '';
        photoDropZone.style.backgroundColor = '';
      });
    });

    photoDropZone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        stovePhotoInput.files = e.dataTransfer.files;
        const changeEvent = new Event('change');
        stovePhotoInput.dispatchEvent(changeEvent);
      }
    });
  }

  // Enviar cotización preformateada por WhatsApp
  if (btnSendWhatsappQuote) {
    btnSendWhatsappQuote.addEventListener('click', () => {
      const quoteData = calculateQuote();
      const clientName = document.getElementById('clientName')?.value || 'No especificado';
      const clientPhone = document.getElementById('clientPhone')?.value || 'No especificado';
      const clientCity = document.getElementById('clientCity')?.value || 'No especificado';

      const formatCLP = (val) => '$' + val.toLocaleString('es-CL');

      let msg = `🔥 *COTIZACIÓN DESDE WEB - TALLER MONTALBA*\n`;
      msg += `👤 *Cliente:* ${clientName}\n`;
      msg += `📞 *Teléfono:* ${clientPhone}\n`;
      msg += `📍 *Ciudad/Comuna:* ${clientCity}\n\n`;
      msg += `🛠 *Artefacto:* ${quoteData.stoveType.replace(/_/g, ' ').toUpperCase()}\n`;
      msg += `📋 *Trabajos Solicitados:*\n- ${quoteData.services.join('\n- ') || 'Ninguno'}\n\n`;
      
      if (quoteData.addons && quoteData.addons.length > 0) {
        msg += `📦 *Artículos Adicionales:*\n- ${quoteData.addons.join('\n- ')}\n\n`;
      }

      msg += `💰 *Presupuesto Estimado:* ${formatCLP(quoteData.min)} a ${formatCLP(quoteData.max)} CLP\n`;
      msg += `📸 _(Don Marcelo, a continuación le enviaré las fotos de mi cocina para su evaluación)_`;

      const whatsappUrl = `https://wa.me/56987654321?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Envío de Formulario Tradicional
  const modalConfirm = document.getElementById('modalConfirm');
  const btnCloseModal = document.getElementById('btnCloseModal');

  if (quoteForm && modalConfirm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalConfirm.classList.add('open');
    });

    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => {
        modalConfirm.classList.remove('open');
        quoteForm.reset();
        filePreview.innerHTML = '';
        calculateQuote();
      });
    }

    modalConfirm.addEventListener('click', (e) => {
      if (e.target === modalConfirm) {
        modalConfirm.classList.remove('open');
      }
    });
  }

  /* ==========================================================================
     5. ACORDEÓN PREGUNTAS FRECUENTES (FAQ)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Cerrar otros
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Alternar actual
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

});

// Keyframe inline de fade para filtros
const styleKeyframes = document.createElement('style');
styleKeyframes.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleKeyframes);
