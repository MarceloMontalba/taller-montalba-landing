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
  initRestorationCalculator();
  initFaqAccordion();
  initMobileNav();
  initContactForm();
  initScrollHeader();
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
    name: 'Cocina a Leña Tipo Mueble Unque Clásica',
    category: 'mueble',
    categoryName: 'Cocina Tipo Mueble',
    badge: 'Kit Completo Incluido',
    badgeType: 'sale',
    image: 'img/cocina-mueble-unque-clasica.webp',
    description: 'Tradicional cocina a leña esmaltada marca Unque en acabado ocre clásico. Estructura de alta inercia térmica reforzada con acero de calibre pesado y ladrillos refractarios de alta densidad. Rendimiento calórico superior y horneado uniforme. Incluye kit completo de cañones, sombrerete, manta pasamuros y pala atizadora.',
    specs: {
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
    name: 'Cocina a Leña Tipo Mueble Alcázar Blanca',
    category: 'mueble',
    categoryName: 'Cocina Tipo Mueble',
    badge: 'Kit Completo Incluido',
    badgeType: 'sale',
    image: 'img/cocina-mueble-alcazar-blanca.webp',
    description: 'Imponente cocina tradicional marca Alcázar en esmaltado blanco brillante con herrajes cromados y pasamanos perimetral. Excelente acumulación de calor para calefaccionar amplios espacios y preparar pan artesanal. Se entrega con su kit integral de evacuación y accesorios.',
    specs: {
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
    name: 'Cocina Tipo Mueble Enlozada Caramelo Vintage',
    category: 'mueble',
    categoryName: 'Cocina Tipo Mueble',
    badge: 'Restaurada a Nuevo',
    badgeType: 'garantia',
    image: 'img/cocina-mueble-enlozada-caramelo.jpg',
    description: 'Modelo clásico del sur de Chile restaurado con terminación caramelo fuego. Cenicero independiente, regulador de tiro de precisión y chasis estructural reforzado para un funcionamiento confiable y prolongado. Lista para instalar con kit completo.',
    specs: {
      'Cubierta': '3 Platos térmicos de fundición pesada',
      'Estructura': 'Acero reforzado de alta resistencia térmica',
      'Refractarios': 'Cámara sellada con mortero refractario',
      'Equipamiento': 'Incluye 4 cañones, manta, sombrerete y pala'
    },
    price: 'Consultar en Taller'
  },
  {
    id: 'krisolt-blanca',
    name: 'Cocina a Leña Compacta Krisolt 1 Plato (Blanca)',
    category: 'compacta',
    categoryName: 'Cocina Compacta',
    badge: 'Kit Completo Incluido',
    badgeType: 'sale',
    image: 'img/cocina-economica-krisolt-blanca.webp',
    description: 'Cocina a leña de formato compacto con 1 plato grande y aros reductores de expansión. Diseñada para un rápido encendido y óptimo rendimiento en cabañas, quinchos o espacios acogedores con bajo consumo de leña. Se entrega equipada con su kit completo de cañones, sombrerete, manta y pala.',
    specs: {
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
    name: 'Cocina a Leña Compacta Krisolt 1 Plato (Café Ocre)',
    category: 'compacta',
    categoryName: 'Cocina Compacta',
    badge: 'Kit Completo Incluido',
    badgeType: 'sale',
    image: 'img/cocina-economica-krisolt-cafe.webp',
    description: 'Versión ocre tradicional de la cocina compacta Krisolt. Cuenta con pasamanos perimetral en acero inoxidable, gaveta cenicero y puerta superior para recarga rápida. Incluye kit completo de instalación.',
    specs: {
      'Plato': '1 Plato de fierro fundido macizo',
      'Medidas': '55 x 35 cm estándar',
      'Estructura': 'Chasis de acero esmaltado horneado',
      'Equipamiento': 'Incluye cañones, sombrerete, manta y pala',
      'Salida Cañón': '4 Pulgadas'
    },
    price: 'Disponible en Taller'
  },
  {
    id: 'termo-canon-inox',
    name: 'Termo de Cañón en Acero Inoxidable Sanitario',
    category: 'accesorios',
    categoryName: 'Termos y Ductos',
    badge: 'Garantía de Reemplazo',
    badgeType: 'inox',
    image: 'img/cocina-blanca-termo-inoxidable.jpg',
    description: 'Dispositivo termosifón de acero inoxidable calidad 304 que aprovecha la energía térmica del tiro de la cocina para generar agua caliente sanitaria continua a costo cero. Respaldado con la garantía de Taller Montalba: ante cualquier desperfecto técnico, Marcelo Montalba responde con reparación o reemplazo inmediato.',
    specs: {
      'Capacidad': '40 a 60 Litros continuos',
      'Material': 'Acero Inoxidable Sanitario Grado Alimenticio',
      'Control': 'Reloj termómetro análogo integrado',
      'Garantía': 'Respaldo directo de Taller Montalba'
    },
    price: 'Venta Directa en Taller'
  },
  {
    id: 'termo-vertical-stock',
    name: 'Estanque Termo Acumulador Vertical de Pie',
    category: 'accesorios',
    categoryName: 'Termos y Ductos',
    badge: 'Garantía de Taller',
    badgeType: 'inox',
    image: 'img/taller-cocinas-termos-stock.webp',
    description: 'Estanque acumulador en acero inoxidable para circuitos de agua caliente por termosifón con serpentín interior en cocinas tradicionales. Alta capacidad de reserva para viviendas familiares y cabañas.',
    specs: {
      'Capacidad': '80 / 120 Litros',
      'Estructura': 'Acero inoxidable reforzado sobre base de apoyo',
      'Garantía': 'Respaldo técnico de Marcelo Montalba'
    },
    price: 'A Pedido / Stock en Taller'
  },
  {
    id: 'canones-galvanizados-combustion',
    name: 'Ductos de Evacuación: Cañones Galvanizados y para Combustión',
    category: 'accesorios',
    categoryName: 'Ductos de Evacuación',
    badge: 'Venta por Unidad o Kit',
    badgeType: 'sale',
    image: 'img/kit-canones-manta-sombrero.webp',
    description: 'Suministramos cañones galvanizados de alto espesor en 4" y 5" para cocinas tradicionales, así como ductos especializados para estufas a combustión lenta (aclaramos que comercializamos ductos de alta calidad, pero nos dedicamos exclusivamente a la reparación de cocinas tradicionales). Disponibles también mantas pasamuros impermeables, sombreretes y codos.',
    specs: {
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
          <a href="https://wa.me/56912345678?text=Hola%20Marcelo,%20estoy%20buscando%20un%20producto%20o%20repuesto%20espec%C3%ADfico" target="_blank" class="btn btn-whatsapp">
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
            <a href="https://wa.me/56912345678?text=Hola%20Marcelo,%20me%20gustar%C3%ADa%20consultar%20por:%20${encodeURIComponent(p.name)}" target="_blank" class="btn btn-primary btn-sm">
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
  whatsappBtn.href = `https://wa.me/56912345678?text=Hola%20Marcelo%20(Taller%20Montalba),%20deseo%20consultar%20detalles%20sobre:%20${encodeURIComponent(product.name)}`;

  modalOverlay.classList.add('active');
}

/* ==========================================================================
   4. RESTORATION QUOTE CALCULATOR & WHATSAPP GENERATOR
   ========================================================================== */
function initRestorationCalculator() {
  const stoveType = document.getElementById('calcStoveType');
  const stoveState = document.getElementById('calcStoveState');
  const checkTermo = document.getElementById('calcAddTermo');
  const checkCanones = document.getElementById('calcAddCanones');
  const checkTraslado = document.getElementById('calcAddTraslado');
  
  const summaryStove = document.getElementById('summaryStove');
  const summaryScope = document.getElementById('summaryScope');
  const summaryExtras = document.getElementById('summaryExtras');
  const summaryEstTime = document.getElementById('summaryEstTime');
  const whatsappQuoteBtn = document.getElementById('calcWhatsappBtn');

  if (!stoveType || !stoveState || !whatsappQuoteBtn) return;

  function updateCalculator() {
    const typeText = stoveType.options[stoveType.selectedIndex].text;
    const stateText = stoveState.options[stoveState.selectedIndex].text;
    
    summaryStove.textContent = typeText;
    summaryScope.textContent = stateText;

    const extras = [];
    if (checkTermo && checkTermo.checked) extras.push('Termo Cañón Inox (+agua caliente sanitaria)');
    if (checkCanones && checkCanones.checked) extras.push('Kit de evacuación (cañones, manta, sombrerete, pala)');
    if (checkTraslado && checkTraslado.checked) extras.push('Traslado directo a domicilio (según cercanía)');

    if (extras.length > 0) {
      summaryExtras.textContent = extras.join(', ');
    } else {
      summaryExtras.textContent = 'Ninguno seleccionado';
    }

    // Estimated work duration
    if (stoveState.value === 'lata-total') {
      summaryEstTime.textContent = '7 a 12 días hábiles aprox.';
    } else if (stoveState.value === 'encementado') {
      summaryEstTime.textContent = '3 a 6 días hábiles aprox.';
    } else {
      summaryEstTime.textContent = '5 a 8 días hábiles aprox.';
    }

    // Build WhatsApp message
    const msg = `Hola Marcelo (Taller Montalba), deseo solicitar una cotización técnica para la restauración de mi cocina a leña:
- Modelo o formato: ${typeText}
- Intervención estimada: ${stateText}
- Adicionales: ${extras.length > 0 ? extras.join(', ') : 'Solo restauración básica'}
Me gustaría enviarte imágenes para una evaluación detallada en el taller de Chacabuco 128, Galvarino. Muchas gracias.`;

    whatsappQuoteBtn.href = `https://wa.me/56912345678?text=${encodeURIComponent(msg)}`;
  }

  [stoveType, stoveState, checkTermo, checkCanones, checkTraslado].forEach(el => {
    if (el) el.addEventListener('change', updateCalculator);
  });

  updateCalculator();
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
   6. MOBILE NAVIGATION
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
   8. CONTACT FORM SUBMISSION TO WHATSAPP
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const city = document.getElementById('formCity').value.trim();
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !phone || !message) {
      alert('Por favor completa los campos requeridos para enviar tu consulta.');
      return;
    }

    const payload = `Hola Marcelo (Taller Montalba), te contacto desde el sitio web:
- Nombre: ${name}
- Teléfono / WhatsApp: ${phone}
- Comuna o Sector: ${city || 'No especificada'}
- Asunto: ${service}
- Consulta: ${message}`;

    const url = `https://wa.me/56912345678?text=${encodeURIComponent(payload)}`;
    window.open(url, '_blank');
  });
}
