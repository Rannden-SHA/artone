document.addEventListener('DOMContentLoaded', function() {
  // Terminal animation (se ejecuta solo si existe el elemento)
  const terminalText = document.getElementById('terminal-text');
  if (terminalText) {
    const commands = [
      { text: '$ ./art_one --start', delay: 500 },
      { text: '[+] Initializing Art One C&C Platform...', delay: 1000 },
      { text: '[+] Loading modules...', delay: 800 },
      { text: '[+] Scanning network...', delay: 1200 },
      { text: '[+] Detected 8 nodes in local network', delay: 1000 },
      { text: '[+] Establishing secure connections...', delay: 1500 },
      { text: '[+] 5/8 agents connected successfully', delay: 1000 },
      { text: '[+] Vulnerability scan in progress...', delay: 1800 },
      { text: '[+] Found 22 potential vulnerabilities', delay: 1200 },
      { text: '[+] Generating report...', delay: 1500 },
      { text: '[+] Art One C&C Platform ready', delay: 1000 },
      { text: '$ _', delay: 500, blink: true }
    ];

    let i = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function typeWriter() {
      if (i < commands.length) {
        const command = commands[i];

        if (!isDeleting && charIndex <= command.text.length) {
          currentText = command.text.substring(0, charIndex);
          terminalText.innerHTML += (charIndex === 0 ? '' : currentText.charAt(currentText.length - 1));
          charIndex++;
          setTimeout(typeWriter, 50);
        } else if (charIndex > command.text.length) {
          if (command.blink) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '█';
            terminalText.appendChild(cursor);

            setInterval(() => {
              cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }, 500);
          }

          terminalText.innerHTML += '<br>';
          isDeleting = false;
          i++;
          charIndex = 0;
          setTimeout(typeWriter, command.delay);
        }
      }
    }
    typeWriter();
  }

  // Animate dashboard elements (status bar, chart bars, etc.)
  const statusFill = document.querySelector('.status-fill');
  if (statusFill) {
    statusFill.style.width = '0';
    setTimeout(() => {
      statusFill.style.transition = 'width 1.5s ease-in-out';
      statusFill.style.width = '78%';
    }, 500);
  }

  const chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length) {
    chartBars.forEach(bar => {
      const originalHeight = bar.style.height;
      bar.style.height = '0';
      setTimeout(() => {
        bar.style.transition = 'height 1s ease-in-out';
        bar.style.height = originalHeight;
      }, 800);
    });
  }

  // --- Filtrado para Tools ---

  // Filtrado por botones de categoría
  const filterOptions = document.querySelectorAll('.filter-option');
  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remover la clase active de todas las opciones
      filterOptions.forEach(opt => opt.classList.remove('active'));
      // Añadir clase active a la opción seleccionada
      option.classList.add('active');

      const selectedFilter = option.textContent.trim().toLowerCase();
      const toolCards = document.querySelectorAll('.tool-card');

      toolCards.forEach(card => {
        // Extraer las etiquetas de la herramienta (puede haber varias)
        const tags = Array.from(card.querySelectorAll('.tool-tag')).map(el => el.textContent.trim().toLowerCase());
        if (selectedFilter === 'todas' || tags.includes(selectedFilter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Búsqueda en herramientas
  const toolsSearchInput = document.querySelector('.search-tools input');
  if (toolsSearchInput) {
    toolsSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const toolCards = document.querySelectorAll('.tool-card');
      toolCards.forEach(card => {
        const title = card.querySelector('.tool-title h3')?.textContent.toLowerCase();
        const description = card.querySelector('.tool-description')?.textContent.toLowerCase();
        if ((title && title.includes(searchTerm)) || (description && description.includes(searchTerm))) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Filtrado genérico para otras páginas (news, etc.)
  const searchInput = document.querySelector('.news-search input, .tools-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.news-article, .tool-card, .doc-section');

      items.forEach(item => {
        const title = item.querySelector('.article-title, .tool-title h3, .doc-title')
          ?.textContent.toLowerCase();
        const content = item.querySelector('.article-excerpt, .tool-description, .doc-content')
          ?.textContent.toLowerCase();

        if ((title && title.includes(searchTerm)) || (content && content.includes(searchTerm))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('animate-section');
    observer.observe(section);
  });

  // Insertar estilos de animación
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animate-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      }
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      .cursor {
        animation: blink 1s step-end infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    </style>
  `);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Función para cargar un fragmento HTML en un contenedor
function loadFragment(url, containerId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar ${url}: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Carga el header y el footer
document.addEventListener('DOMContentLoaded', () => {
  loadFragment('header.html', 'header-container');
  loadFragment('footer.html', 'footer-container');
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  // Selecciona todos los enlaces dentro del contenedor del header
  const headerLinks = document.querySelectorAll('#header-container a');

  headerLinks.forEach(link => {
    // Compara el atributo href con la ruta actual.
    // Puede que necesites ajustar la comparación según cómo estén definidos los href.
    if (link.getAttribute('href') === currentPath || 
        // Si la ruta raíz es '/' y el enlace es '/index.html'
        (currentPath === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

//########### MODAL HACKBN
window.addEventListener('load', () => {
  // Fecha del evento
  const countdownDate = new Date("May 16, 2025 10:00:00").getTime();

  // Función auxiliar para actualizar un número con efecto glitch
  function updateNumber(element, newValue) {
    // Solo aplica el efecto si el valor realmente cambió
    if (element.textContent !== newValue.toString()) {
      element.textContent = newValue;
      // Forzamos un reflow para reiniciar la animación
      element.classList.remove('glitch');
      void element.offsetWidth; // "hack" para reiniciar animaciones CSS
      element.classList.add('glitch');
    }
  }

  // Actualiza el contador cada segundo
  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      updateNumber(document.getElementById("days"), 0);
      updateNumber(document.getElementById("hours"), 0);
      updateNumber(document.getElementById("minutes"), 0);
      updateNumber(document.getElementById("seconds"), 0);
      return;
    }

    // Cálculo de días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizamos cada span con efecto glitch
    updateNumber(document.getElementById("days"), days);
    updateNumber(document.getElementById("hours"), hours);
    updateNumber(document.getElementById("minutes"), minutes);
    updateNumber(document.getElementById("seconds"), seconds);
  }, 1000);

  // Mostrar el modal a los 3 segundos (o cuando tú decidas)
  setTimeout(() => {
    const hackbcnModal = document.getElementById('hackbcn-modal');
    hackbcnModal.classList.add('active');
  }, 3000);

  // Cerrar modal
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const hackbcnModal = document.getElementById('hackbcn-modal');

  modalClose.addEventListener('click', () => {
    hackbcnModal.classList.remove('active');
  });
  modalOverlay.addEventListener('click', () => {
    hackbcnModal.classList.remove('active');
  });
});
//########### END MODAL HACKBN
