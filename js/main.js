/**
 * TALLER MONTALBA - INTERACTIVE LOGIC & SCRIPTS
 * Especialistas en Restauración y Venta de Cocinas a Leña Tradicionales
 * Fundado en 1986 por Alfonso Montalba Torres · Atendido por Marcelo Montalba
 * Chacabuco 128, Galvarino, Región de La Araucanía, Chile
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSlider();
  initCatalogFilters();
  initProductModal();
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
   2. PRODUCT CATALOG DATA & FILTERS (DUCTS, ACCESSORIES & SPARES)
   ========================================================================== */
const PRODUCTS = [
  {
    id: 'canones-galvanizados-tradicional',
    name: 'Cañones Galvanizados Estándar y a Medida (4", 5" y Especiales)',
    category: 'canones',
    categoryName: 'Cañones',
    badge: 'Estándar y a Medida',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Cañones de zinc y fierro galvanizado de alto calibre diseñados especialmente para cocinas a leña tradicionales. Disponibles en diámetros estándar de 4", 5" y 6", y también fabricamos tramos y cañones a medida según la altura, desvíos o requerimientos particulares de tu instalación.',
    specs: {
      'Diámetros': '4", 5", 6" y fabricación a medida',
      'Largo': 'Tramos de 1 metro y medidas especiales a pedido',
      'Material': 'Zinc / Fierro galvanizado reforzado',
      'Uso': 'Cocinas a leña tipo mueble, compactas y estufas',
      'Garantía': 'Respaldo directo de Taller Montalba'
    },
    price: 'Venta por Unidad o a Medida'
  },
  {
    id: 'canones-combustion-lenta',
    name: 'Cañones para Estufas a Combustión Lenta (5" y 6")',
    category: 'canones',
    categoryName: 'Cañones',
    badge: 'Alta Temperatura',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Cañones reforzados para evacuación en estufas de combustión lenta. Diseñados para resistir choques térmicos elevados y optimizar el tiro de humos (aclaramos que comercializamos cañones de alta calidad, pero nuestro servicio de restauración se enfoca en cocinas tradicionales).',
    specs: {
      'Diámetros': '5" y 6" pulgadas para combustión',
      'Largo': 'Tramos de 1 metro y cortes especiales',
      'Resistencia': 'Alta tolerancia a calor y creosota',
      'Disponibilidad': 'Stock permanente en taller'
    },
    price: 'Consultar en Taller'
  },
  {
    id: 'manta-pasamuros-galvanizada',
    name: 'Manta Pasamuros Galvanizada (Estándar y a Medida)',
    category: 'techumbre',
    categoryName: 'Mantas y Sombreros',
    badge: 'Anti-Goteras a Medida',
    badgeType: 'inox',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Manta pasamuros troquelada en plancha de zinc/galvanizado con cuello y gollete ajustable. Disponibles en medidas estándar y también las confeccionamos a medida según la pendiente, curvatura o material de tu techo, asegurando un sellado 100% hermético contra filtraciones de agua.',
    specs: {
      'Material': 'Plancha de zinc galvanizado reforzado',
      'Salida': 'Compatible con 4", 5", 6" y a medida',
      'Confección': 'Estándar y adaptada a la pendiente de tu techo',
      'Instalación': 'Apta para zinc, teja, fibrocemento o pizarreño'
    },
    price: 'Disponible en Taller y a Pedido'
  },
  {
    id: 'sombrero-antiviento-galvanizado',
    name: 'Sombrerete Antiviento Cónico y Tipo H para Remate',
    category: 'techumbre',
    categoryName: 'Mantas y Sombreros',
    badge: 'Tiraje Seguro',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Sombrero de terminación superior para cañón de cocina o estufa. Su diseño aerodinámico protege contra la entrada de agua de lluvia torrencial, previene el revoque o retroceso de humo por ráfagas de viento y bloquea el ingreso de ramas o aves.',
    specs: {
      'Modelos': 'Cónico protector y Antiviento Tipo H',
      'Diámetros': '4", 5" y 6" pulgadas',
      'Material': 'Galvanizado de alto espesor',
      'Función': 'Impide retorno de humo y entrada de agua'
    },
    price: 'Disponible en Taller'
  },
  {
    id: 'codos-galvanizados-45-90',
    name: 'Codos y Desvíos Galvanizados (45° y 90°)',
    category: 'repuestos',
    categoryName: 'Herrajes y Codos',
    badge: 'Ajuste Hermético',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Codos estampados y articulados de 45° y 90° en fierro galvanizado. Permiten realizar desvíos y esquivar vigas, tijerales o alerones de techumbre manteniendo un flujo de tiro libre de estrangulamientos y sin pérdidas de hermeticidad.',
    specs: {
      'Ángulos': '45 Grados y 90 Grados',
      'Diámetros': '4" y 5" pulgadas',
      'Empalme': 'Machihembrado de encaje rápido y seguro',
      'Uso': 'Desvíos en muros y vigas de entretecho'
    },
    price: 'Venta por Unidad'
  },
  {
    id: 'kit-instalacion-completo',
    name: 'Kit Completo de Cañones y Accesorios para Cocina',
    category: 'canones',
    categoryName: 'Kits de Cañones',
    badge: 'Pack Completo',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Conjunto completo de tiro para renovación de cañones o instalación: incluye 4 cañones galvanizados de 1 metro, 1 manta pasamuros impermeable, 1 sombrerete antiviento de alta eficiencia y 1 pala atizadora forjada.',
    specs: {
      'Contenido': '4 cañones (1m c/u) + 1 manta + 1 sombrero + 1 pala',
      'Diámetros': 'Disponible en 4" y 5" pulgadas',
      'Aplicación': 'Cocinas a leña de 1, 2, 3 y 4 platos',
      'Garantía': 'Materiales nuevos con respaldo de taller'
    },
    price: 'Pack Conveniente en Taller'
  },
  {
    id: 'termo-canon-inox',
    name: 'Termo de Cañón en Acero Inoxidable Sanitario (Agua Caliente)',
    category: 'termos',
    categoryName: 'Termos Inoxidables',
    badge: 'Inox Sanitario 304',
    badgeType: 'inox',
    image: 'img/cocina-blanca-termo-inoxidable.jpg',
    description: 'Termo envolvente de cañón fabricado en acero inoxidable sanitario AISI 304. Aprovecha la energía calórica del cañón de la cocina para calentar agua continua a costo cero. Respaldado con la garantía de Taller Montalba ante cualquier necesidad de ajuste o mantención.',
    specs: {
      'Material': 'Acero Inoxidable Sanitario AISI 304',
      'Capacidad': '40 a 60 Litros continuos',
      'Accesorios': 'Reloj termómetro análogo integrado',
      'Funcionamiento': 'Termosifón automático con el calor de la leña',
      'Garantía': 'Respaldo técnico directo de Marcelo Montalba'
    },
    price: 'Venta Directa en Taller'
  },
  {
    id: 'termo-vertical-stock',
    name: 'Estanque Termo Acumulador Vertical de Pie (Acero Inox)',
    category: 'termos',
    categoryName: 'Termos Inoxidables',
    badge: 'Gran Capacidad',
    badgeType: 'inox',
    image: 'img/taller-cocinas-termos-stock.webp',
    description: 'Estanque acumulador de pie en acero inoxidable reforzado para circuitos de agua caliente por termosifón con serpentín interior en cocinas tradicionales. Alta capacidad de reserva térmica para familias y viviendas de campo.',
    specs: {
      'Capacidad': '80 / 120 Litros',
      'Estructura': 'Acero inoxidable reforzado sobre base de apoyo',
      'Compatibilidad': 'Circuitos con serpentín en cocina a leña',
      'Garantía': 'Respaldo técnico de Taller Montalba'
    },
    price: 'A Pedido / Stock en Taller'
  },
  {
    id: 'ladrillos-mortero-refractario',
    name: 'Ladrillos y Cemento / Mortero Refractario de Alta Densidad',
    category: 'repuestos',
    categoryName: 'Herrajes y Refractarios',
    badge: 'Hasta 1300°C',
    badgeType: 'sale',
    image: 'img/taller-artesano-restauracion.jpg',
    description: 'Ladrillos refractarios de alta alúmina y mortero térmico para reconstrucción de cajas de fuego y cámaras de combustión. Maximizan la retención de calor hacia el horno y reducen drásticamente el consumo de leña.',
    specs: {
      'Resistencia': 'Térmica hasta 1300°C',
      'Densidad': 'Alta inercia para acumulación de calor',
      'Uso': 'Reemplazo de ladrillos quebrados en cocinas tradicionales',
      'Presentación': 'Unidades y sacos de fraguado térmico'
    },
    price: 'Disponible en Taller'
  },
  {
    id: 'pala-atizadora-herrajes',
    name: 'Pala Atizadora Forjada y Herrajes de Fierro',
    category: 'repuestos',
    categoryName: 'Herrajes y Codos',
    badge: 'Fierro Macizo',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Palas atizadoras, tiradores y ganchos de manipulación de brasa forjados en fierro macizo de alto espesor con terminación anticorrosiva y empuñadura atérmica.',
    specs: {
      'Material': 'Fierro forjado macizo',
      'Largo': '50 a 65 cm con empuñadura segura',
      'Uso': 'Retiro de cenizas y acomodo de leña en cámara',
      'Durabilidad': 'Diseñado para uso rudo y continuo'
    },
    price: 'Disponible en Taller'
  }
];

function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productsContainer = document.getElementById('productsContainer');
  const searchInput = document.getElementById('productSearchInput');
  
  if (!productsContainer) return;

  function renderProducts(category = 'all', searchQuery = '') {
    productsContainer.innerHTML = '';

    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <i class="fa-solid fa-toolbox" style="font-size: 3rem; color: var(--color-slate-400); margin-bottom: 1rem;"></i>
          <h4 style="font-size: 1.3rem; color: var(--color-dark-900); margin-bottom: 0.5rem;">No se encontraron artículos con esa búsqueda</h4>
          <p style="color: var(--color-slate-500); max-width: 450px; margin: 0 auto 1.5rem;">
            ¿Buscas una medida o repuesto específico? Consulta directamente a Marcelo Montalba por WhatsApp.
          </p>
          <a href="https://wa.me/56995253536?text=Hola%20Marcelo,%20estoy%20buscando%20un%20art%C3%ADculo%20o%20repuesto%20espec%C3%ADfico" target="_blank" class="btn btn-whatsapp">
            <i class="fa-brands fa-whatsapp"></i> Consultar a Marcelo
          </a>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.setAttribute('data-id', p.id);

      let specsHtml = '';
      for (const [key, val] of Object.entries(p.specs).slice(0, 3)) {
        specsHtml += `
          <div class="product-spec-row">
            <span>${key}:</span>
            <strong>${val}</strong>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="product-thumb">
          <span class="product-badge ${p.badgeType}">${p.badge}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${p.categoryName}</span>
          <h4 class="product-name">${p.name}</h4>
          <p class="product-desc">${p.description}</p>
          <div class="product-specs">
            ${specsHtml}
          </div>
          <div class="product-footer">
            <button class="btn btn-secondary btn-sm btn-quickview" data-id="${p.id}">
              <i class="fa-solid fa-eye"></i> Ver Detalles
            </button>
            <a href="https://wa.me/56995253536?text=Hola%20Marcelo,%20me%20gustar%C3%ADa%20consultar%20por:%20${encodeURIComponent(p.name)}" target="_blank" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-whatsapp"></i> Consultar
            </a>
          </div>
        </div>
      `;

      productsContainer.appendChild(card);
    });

    // Rebind quickview buttons
    document.querySelectorAll('.btn-quickview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openProductModal(id);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      const search = searchInput ? searchInput.value : '';
      renderProducts(cat, search);
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.filter-btn.active');
      const cat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      renderProducts(cat, e.target.value);
    });
  }

  // Initial render
  renderProducts('all');
}

/* ==========================================================================
   3. PRODUCT MODAL QUICKVIEW
   ========================================================================== */
function initProductModal() {
  const modalOverlay = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
    }
  });
}

function openProductModal(productId) {
  const modalOverlay = document.getElementById('productModal');
  const product = PRODUCTS.find(p => p.id === productId);
  if (!modalOverlay || !product) return;

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalCategory').textContent = product.categoryName;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalBadge').textContent = product.badge;
  document.getElementById('modalDescription').textContent = product.description;

  const specsContainer = document.getElementById('modalSpecsContainer');
  specsContainer.innerHTML = '';
  for (const [key, val] of Object.entries(product.specs)) {
    const row = document.createElement('div');
    row.className = 'product-spec-row';
    row.innerHTML = `<span>${key}:</span> <strong>${val}</strong>`;
    specsContainer.appendChild(row);
  }

  const whatsappBtn = document.getElementById('modalWhatsappBtn');
  whatsappBtn.href = `https://wa.me/56995253536?text=Hola%20Marcelo%20(Taller%20Montalba),%20deseo%20consultar%20por:%20${encodeURIComponent(product.name)}`;

  modalOverlay.classList.add('active');
}

/* ==========================================================================
   4. UNIFIED RESTORATION COTIZADOR & TECHNICAL CONTACT HANDLER
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
  const checkTermo = document.getElementById('calcAddTermo');
  const checkCanones = document.getElementById('calcAddCanones');
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
    const selectedServiceVal = formService ? formService.value : 'restauracion';
    const selectedServiceText = formService ? formService.options[formService.selectedIndex].text : 'Reparar o Restaurar mi Cocina a Leña';

    if (summaryService) summaryService.textContent = selectedServiceText;

    const isRestoration = selectedServiceVal === 'restauracion';

    if (restorationBlock) {
      restorationBlock.style.display = isRestoration ? 'block' : 'none';
    }
    if (summaryStoveRow) summaryStoveRow.style.display = isRestoration ? 'flex' : 'none';
    if (summaryScopeRow) summaryScopeRow.style.display = isRestoration ? 'flex' : 'none';
    if (summaryExtrasRow) summaryExtrasRow.style.display = isRestoration ? 'flex' : 'none';

    // Adapt contextual hints, placeholders and buttons
    if (selectedServiceVal === 'restauracion') {
      if (formMessage) formMessage.placeholder = 'Ej: La cocina humea mucho al encender, se rompieron los ladrillos o es una cocina antigua heredada...';
      if (formMessageLabel) formMessageLabel.textContent = 'Cuéntanos más detalles sobre tu cocina (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-camera';
      if (noticeText) noticeText.innerHTML = '<strong>¿Tienes fotos de tu cocina?</strong> Al presionar el botón se abrirá WhatsApp para que puedas adjuntárselas directamente a Marcelo y recibir una orientación precisa.';
      if (submitBtnText) submitBtnText.textContent = 'Enviar Consulta / Fotos a Marcelo';
    } else if (selectedServiceVal === 'termos-canones') {
      if (formMessage) formMessage.placeholder = 'Ej: Necesito 4 cañones de 5", o una manta y tramos a medida para mi techo...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalle de los cañones o accesorios que necesitas (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-toolbox';
      if (noticeText) noticeText.innerHTML = '<strong>Cañones y Mantas (Estándar y a Medida):</strong> Stock en 4", 5" y 6", y confección personalizada según el ángulo o pasada de tu techo.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Cañones / Accesorios por WhatsApp';
    } else if (selectedServiceVal === 'termo-inox') {
      if (formMessage) formMessage.placeholder = 'Ej: Quiero saber capacidad y medidas para instalar un termo de cañón en mi cocina a leña...';
      if (formMessageLabel) formMessageLabel.textContent = 'Dudas sobre termo inox o instalación (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-faucet-hot';
      if (noticeText) noticeText.innerHTML = '<strong>Acero Inoxidable Sanitario:</strong> Agua caliente continua por termosifón con respaldo directo de taller.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Termo Inoxidable por WhatsApp';
    } else {
      if (formMessage) formMessage.placeholder = 'Ej: Horarios de atención para llevar una cocina al taller, dudas sobre repuestos o ubicación en Chacabuco 128...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalle de tu consulta (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-location-dot';
      if (noticeText) noticeText.innerHTML = '<strong>Atención Directa:</strong> Marcelo Montalba atiende personalmente cada requerimiento en el taller de Chacabuco 128, Galvarino.';
      if (submitBtnText) submitBtnText.textContent = 'Enviar Consulta a Marcelo por WhatsApp';
    }

    if (isRestoration) {
      const typeText = stoveType ? stoveType.options[stoveType.selectedIndex].text : '';
      const stateText = stoveState ? stoveState.options[stoveState.selectedIndex].text : '';
      
      if (summaryStove) summaryStove.textContent = typeText;
      if (summaryScope) summaryScope.textContent = stateText;

      const extras = [];
      if (checkCanones && checkCanones.checked) extras.push('Cañones galvanizados / manta / sombrero');
      if (checkTermo && checkTermo.checked) extras.push('Termo Cañón Inox');
      if (checkTraslado && checkTraslado.checked) extras.push('Traslado directo (solo dentro del sector)');

      if (summaryExtras) {
        summaryExtras.textContent = extras.length > 0 ? extras.join(', ') : 'Ninguno seleccionado';
      }

      if (summaryEstTime) {
        if (stoveState && stoveState.value === 'lata-total') {
          summaryEstTime.textContent = '7 a 12 días hábiles aprox. (Restauración completa)';
        } else if (stoveState && stoveState.value === 'humo-latas') {
          summaryEstTime.textContent = '5 a 8 días hábiles aprox. (Cambio de latas)';
        } else if (stoveState && stoveState.value === 'ladrillos') {
          summaryEstTime.textContent = '3 a 5 días hábiles aprox. (Ladrillos refractarios)';
        } else if (stoveState && stoveState.value === 'cubierta') {
          summaryEstTime.textContent = '3 a 6 días hábiles aprox. (Rectificación de cubierta)';
        } else if (stoveState && stoveState.value === 'enlozado-fabrica') {
          summaryEstTime.textContent = '10 a 15 días hábiles aprox. (Enlozado vitrificado)';
        } else {
          summaryEstTime.textContent = 'Diagnóstico preliminar por fotos con Marcelo';
        }
      }
    } else {
      if (summaryEstTime) {
        if (selectedServiceVal === 'termos-canones' || selectedServiceVal === 'termo-inox') {
          summaryEstTime.textContent = 'Retiro en taller o coordinación en el sector';
        } else {
          summaryEstTime.textContent = 'Atención directa en taller Galvarino';
        }
      }
    }
  }

  // Event listeners for dynamic updates
  if (formService) formService.addEventListener('change', updateSummary);
  [stoveType, stoveState, checkTermo, checkCanones, checkTraslado].forEach(el => {
    if (el) el.addEventListener('change', updateSummary);
  });

  // Build payload text
  function buildMessagePayload() {
    const name = formName ? formName.value.trim() : '';
    const phone = formPhone ? formPhone.value.trim() : '';
    const city = formCity ? formCity.value.trim() : '';
    const serviceVal = formService ? formService.value : 'restauracion';
    const serviceText = formService ? formService.options[formService.selectedIndex].text : '';
    const message = formMessage ? formMessage.value.trim() : '';

    let payload = `Hola Marcelo (Taller Montalba), te contacto desde el sitio web:\n`;
    payload += `• Nombre: ${name}\n`;
    payload += `• Teléfono: ${phone}\n`;
    payload += `• Sector / Comuna: ${city || 'No especificada'}\n`;
    payload += `• Requerimiento: ${serviceText}\n`;

    if (serviceVal === 'restauracion') {
      const typeText = stoveType ? stoveType.options[stoveType.selectedIndex].text : '';
      const stateText = stoveState ? stoveState.options[stoveState.selectedIndex].text : '';
      const extras = [];
      if (checkCanones && checkCanones.checked) extras.push('Cañones galvanizados / evacuación');
      if (checkTermo && checkTermo.checked) extras.push('Termo Cañón Inox');
      if (checkTraslado && checkTraslado.checked) extras.push('Traslado dentro del sector');

      payload += `• Formato de cocina: ${typeText}\n`;
      payload += `• Intervención técnica: ${stateText}\n`;
      payload += `• Adicionales: ${extras.length > 0 ? extras.join(', ') : 'Ninguno'}\n`;
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

      const subject = `Consulta Taller Montalba - ${data.name}`;
      const mailtoUrl = `mailto:montalbalex.mamg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(data.payload)}`;
      window.location.href = mailtoUrl;
    });
  }

  // Initial run
  updateSummary();
}

/* ==========================================================================
   5. FAQ ACCORDION
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
   6. NAVIGATION DROPDOWN ("MÁS")
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
   7. MOBILE NAVIGATION
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
   7. STICKY HEADER ON SCROLL
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
   8. ACTIVE SECTION SCROLLSPY
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
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
        if (link.classList.contains('nav-dropdown-link')) {
          isInsideMoreDropdown = true;
        }
      }
    });

    // If active section is inside the "Más" dropdown (taller, ubicacion, faq), highlight "Más"
    if (moreDropdownBtn) {
      if (isInsideMoreDropdown || currentSectionId === 'taller' || currentSectionId === 'ubicacion' || currentSectionId === 'faq') {
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
   9. SCROLL TO TOP BUTTON
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
