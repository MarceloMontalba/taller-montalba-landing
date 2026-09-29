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
   2. PRODUCT CATALOG DATA & FILTERS
   ========================================================================== */
const PRODUCTS = [
  {
    id: 'unque-clasica',
    name: 'Cocina a Leña Nueva Unque Clásica (Tipo Mueble)',
    category: 'mueble',
    categoryName: 'Cocina Nueva Tipo Mueble',
    badge: 'Nueva · Kit Completo',
    badgeType: 'sale',
    image: 'img/cocina-mueble-unque-clasica.webp',
    description: 'Cocina a leña 100% nueva de fábrica marca Unque en acabado ocre clásico. Estructura de alta inercia térmica con cubierta y piezas en fierro fundido y ladrillos refractarios de alta densidad. Rendimiento calórico superior y horneado uniforme. Incluye kit completo de cañones, sombrerete, manta pasamuros y pala atizadora.',
    specs: {
      'Estado': '100% Nueva de Fábrica',
      'Cubierta': 'Fierro fundido rectificado con 3 platos desmontables',
      'Horno': 'Interior enlozado con registro térmico',
      'Cámara Térmica': 'Ladrillos refractarios de alta densidad sellados',
      'Equipamiento': 'Incluye 4 cañones, manta, sombrerete y pala',
      'Garantía': 'Respaldo técnico directo de Marcelo Montalba'
    },
    price: 'Consultar Disponibilidad en Taller'
  },
  {
    id: 'alcazar-blanca',
    name: 'Cocina a Leña Nueva Alcázar Blanca (Tipo Mueble)',
    category: 'mueble',
    categoryName: 'Cocina Nueva Tipo Mueble',
    badge: 'Nueva · Kit Completo',
    badgeType: 'sale',
    image: 'img/cocina-mueble-alcazar-blanca.webp',
    description: 'Imponente cocina a leña nueva de fábrica marca Alcázar en esmaltado blanco brillante con herrajes cromados y pasamanos perimetral. Excelente acumulación de calor para calefaccionar amplios espacios y preparar pan artesanal. Se entrega nueva con su kit integral de evacuación y accesorios.',
    specs: {
      'Estado': '100% Nueva de Fábrica',
      'Cubierta': '4 Platos en fierro fundido con aros reductores',
      'Acabado': 'Esmaltado vitrificado de alta resistencia',
      'Horno': 'Amplia capacidad con parrilla de fundición',
      'Equipamiento': 'Incluye 4 cañones, manta, sombrerete y pala',
      'Garantía': 'Garantía directa de taller'
    },
    price: 'Consultar Disponibilidad en Taller'
  },
  {
    id: 'unque-caramelo',
    name: 'Cocina a Leña Nueva Unque Caramelo (Tipo Mueble)',
    category: 'mueble',
    categoryName: 'Cocina Nueva Tipo Mueble',
    badge: 'Nueva · Kit Completo',
    badgeType: 'sale',
    image: 'img/cocina-mueble-enlozada-caramelo.jpg',
    description: 'Cocina a leña 100% nueva en clásica terminación caramelo vitrificado. Cenicero independiente, regulador de tiro de precisión y chasis firme con cubierta de fierro fundido. Lista para instalar con kit completo de cañones y accesorios.',
    specs: {
      'Estado': '100% Nueva de Fábrica',
      'Cubierta': '3 Platos térmicos de fundición pesada',
      'Estructura': 'Chasis firme con piezas de fierro fundido',
      'Refractarios': 'Cámara sellada con mortero refractario',
      'Equipamiento': 'Incluye 4 cañones, manta, sombrerete y pala'
    },
    price: 'Consultar en Taller'
  },
  {
    id: 'krisolt-blanca',
    name: 'Cocina a Leña Nueva Krisolt 1 Plato (Blanca)',
    category: 'compacta',
    categoryName: 'Cocina Nueva Compacta',
    badge: 'Nueva · Kit Completo',
    badgeType: 'sale',
    image: 'img/cocina-economica-krisolt-blanca.webp',
    description: 'Cocina a leña de formato compacto 100% nueva con 1 plato grande y aros reductores de expansión. Diseñada para un rápido encendido y óptimo rendimiento en cabañas, quinchos o espacios acogedores con bajo consumo de leña. Se entrega equipada con su kit completo de cañones, sombrerete, manta y pala.',
    specs: {
      'Estado': '100% Nueva de Fábrica',
      'Plato': '1 Plato de fierro fundido con aros concéntricos',
      'Dimensiones': '55 cm ancho x 35 cm fondo estándar',
      'Cámara': 'Refractarios interiores de alta retención térmica',
      'Equipamiento': 'Incluye cañones, sombrerete, manta y pala atizadora',
      'Salida Cañón': '4 Pulgadas'
    },
    price: 'Disponible en Taller'
  },
  {
    id: 'krisolt-cafe',
    name: 'Cocina a Leña Nueva Krisolt 1 Plato (Café Ocre)',
    category: 'compacta',
    categoryName: 'Cocina Nueva Compacta',
    badge: 'Nueva · Kit Completo',
    badgeType: 'sale',
    image: 'img/cocina-economica-krisolt-cafe.webp',
    description: 'Versión ocre tradicional 100% nueva de la cocina compacta Krisolt. Cuenta con pasamanos perimetral en acero inoxidable, gaveta cenicero y puerta superior para recarga rápida. Incluye kit completo de instalación.',
    specs: {
      'Estado': '100% Nueva de Fábrica',
      'Plato': '1 Plato de fierro fundido macizo',
      'Medidas': '55 x 35 cm estándar',
      'Estructura': 'Cuerpo esmaltado con plato y piezas de fierro fundido',
      'Equipamiento': 'Incluye cañones, sombrerete, manta y pala',
      'Salida Cañón': '4 Pulgadas'
    },
    price: 'Disponible en Taller'
  },
  {
    id: 'termo-canon-inox',
    name: 'Termo de Cañón Nuevo en Acero Inoxidable Sanitario',
    category: 'accesorios',
    categoryName: 'Termos y Ductos Nuevos',
    badge: 'Nuevo · Garantía de Taller',
    badgeType: 'inox',
    image: 'img/cocina-blanca-termo-inoxidable.jpg',
    description: 'Dispositivo termosifón nuevo en acero inoxidable calidad 304 que aprovecha la energía térmica del tiro de la cocina para generar agua caliente sanitaria continua a costo cero. Respaldado con la garantía de Taller Montalba: ante cualquier desperfecto técnico, Marcelo Montalba responde con reparación o reemplazo inmediato.',
    specs: {
      'Estado': '100% Nuevo de Fábrica',
      'Capacidad': '40 a 60 Litros continuos',
      'Material': 'Acero Inoxidable Sanitario Grado Alimenticio',
      'Control': 'Reloj termómetro análogo integrado',
      'Garantía': 'Respaldo directo de Taller Montalba'
    },
    price: 'Venta Directa en Taller'
  },
  {
    id: 'termo-vertical-stock',
    name: 'Estanque Termo Acumulador Vertical Nuevo (De Pie)',
    category: 'accesorios',
    categoryName: 'Termos y Ductos Nuevos',
    badge: 'Nuevo · Garantía de Taller',
    badgeType: 'inox',
    image: 'img/taller-cocinas-termos-stock.webp',
    description: 'Estanque acumulador nuevo en acero inoxidable para circuitos de agua caliente por termosifón con serpentín interior en cocinas tradicionales. Alta capacidad de reserva para viviendas familiares y cabañas.',
    specs: {
      'Estado': '100% Nuevo de Fábrica',
      'Capacidad': '80 / 120 Litros',
      'Estructura': 'Acero inoxidable reforzado sobre base de apoyo',
      'Garantía': 'Respaldo técnico de Marcelo Montalba'
    },
    price: 'A Pedido / Stock en Taller'
  },
  {
    id: 'canones-galvanizados-combustion',
    name: 'Ductos de Evacuación Nuevos: Cañones Galvanizados y para Combustión',
    category: 'accesorios',
    categoryName: 'Ductos Nuevos',
    badge: 'Nuevos · Venta por Unidad o Kit',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Suministramos cañones galvanizados de alto espesor nuevos en 4" y 5" para cocinas tradicionales, así como ductos nuevos especializados para estufas a combustión lenta (aclaramos que comercializamos ductos de alta calidad, pero nos dedicamos exclusivamente a la reparación de cocinas tradicionales). Disponibles también mantas pasamuros impermeables, sombreretes y codos.',
    specs: {
      'Estado': 'Materiales Nuevos de Fábrica',
      'Cocinas a Leña': 'Cañones de 4" y 5" pulgadas galvanizados',
      'Estufas Combustión': 'Ductos para evacuación de estufas a combustión',
      'Complementos': 'Mantas pasamuros, sombreretes antiviento, codos y palas',
      'Nota': 'No realizamos labores de instalación en techumbres'
    },
    price: 'Venta por Pieza o Kit'
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
          <i class="fa-solid fa-fire-burner" style="font-size: 3rem; color: var(--color-slate-400); margin-bottom: 1rem;"></i>
          <h4 style="font-size: 1.3rem; color: var(--color-dark-900); margin-bottom: 0.5rem;">No se encontraron artículos</h4>
          <p style="color: var(--color-slate-500); max-width: 450px; margin: 0 auto 1.5rem;">
            ¿Buscas un repuesto o modelo específico? Consulta directamente a Marcelo Montalba por WhatsApp.
          </p>
          <a href="https://wa.me/56995253536?text=Hola%20Marcelo,%20estoy%20buscando%20un%20producto%20o%20repuesto%20espec%C3%ADfico" target="_blank" class="btn btn-whatsapp">
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

      const packBanner = (p.category === 'mueble' || p.category === 'compacta') ? `
        <div class="stove-pack-banner">
          <i class="fa-solid fa-box-open"></i>
          <div><strong>Kit de Instalación Incluido:</strong> Cañones, manta, pala y sombrero</div>
        </div>
      ` : '';

      card.innerHTML = `
        <div class="product-thumb">
          <span class="product-badge ${p.badgeType}">${p.badge}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${p.categoryName}</span>
          <h4 class="product-name">${p.name}</h4>
          ${packBanner}
          <p class="product-desc">${p.description}</p>
          <div class="product-specs">
            ${specsHtml}
          </div>
          <div class="product-footer">
            <button class="btn btn-secondary btn-sm btn-quickview" data-id="${p.id}">
              <i class="fa-solid fa-eye"></i> Ver Ficha Técnica
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
  whatsappBtn.href = `https://wa.me/56995253536?text=Hola%20Marcelo%20(Taller%20Montalba),%20deseo%20consultar%20detalles%20sobre:%20${encodeURIComponent(product.name)}`;

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
    } else if (selectedServiceVal === 'cocina-mueble' || selectedServiceVal === 'cocina-compacta') {
      if (formMessage) formMessage.placeholder = 'Ej: ¿Tienes stock para entrega inmediata? ¿Haces despacho a mi sector? ¿Puedo ir a verla al taller?...';
      if (formMessageLabel) formMessageLabel.textContent = 'Dudas sobre disponibilidad, despacho o entrega (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-box-open';
      if (noticeText) noticeText.innerHTML = '<strong>Incluye Kit Completo:</strong> Todos nuestros modelos nuevos vienen con cañones, manta pasamuros, sombrerete, pala y garantía de reparación directa en taller.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Disponibilidad por WhatsApp';
    } else if (selectedServiceVal === 'termos-canones') {
      if (formMessage) formMessage.placeholder = 'Ej: ¿Qué medidas de cañones tienes disponibles? ¿O qué capacidad de termo inox me recomiendas?...';
      if (formMessageLabel) formMessageLabel.textContent = 'Detalle de los artículos o medidas que necesitas (opcional):';
      if (photoNoticeBox) photoNoticeBox.style.display = 'flex';
      if (noticeIcon) noticeIcon.className = 'fa-solid fa-fire-flame-curved';
      if (noticeText) noticeText.innerHTML = '<strong>Fierro y Acero Inoxidable:</strong> Fabricación resistente de termos y cañones compatibles con cocinas tradicionales a leña.';
      if (submitBtnText) submitBtnText.textContent = 'Consultar Repuestos / Accesorios por WhatsApp';
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
      if (checkTermo && checkTermo.checked) extras.push('Termo Cañón Inox');
      if (checkCanones && checkCanones.checked) extras.push('Kit de evacuación (cañones, manta, sombrerete, pala)');
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
        if (selectedServiceVal === 'cocina-mueble' || selectedServiceVal === 'cocina-compacta') {
          summaryEstTime.textContent = 'Entrega inmediata / Retiro en taller o flete en el sector';
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
      if (checkTermo && checkTermo.checked) extras.push('Termo Cañón Inox');
      if (checkCanones && checkCanones.checked) extras.push('Kit de evacuación');
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
