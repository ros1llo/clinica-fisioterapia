const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


const elementosAnimados = document.querySelectorAll(
  '.servicio-card, .stat, .miembro-card, .servicio-detalle, ' +
  '.dato, .seccion-titulo, #cta-reserva h2, #cta-reserva p, ' +
  '#formulario-reserva, .contacto-grid'
);

elementosAnimados.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

elementosAnimados.forEach(el => observer.observe(el));


const formulario = document.querySelector('.formulario');

if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let valido = true;

    formulario.querySelectorAll('[required]').forEach(campo => {
      if (!campo.value.trim()) {
        campo.style.borderColor = '#e63946';
        valido = false;

        campo.addEventListener('input', () => {
          campo.style.borderColor = '';
        }, { once: true });
      }
    });

    if (valido) {
      formulario.innerHTML = `
        <div style="
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          background: var(--acento-claro);
          border-radius: 4px;
          border: 1px solid var(--acento);
        ">
          <p style="font-size: 2rem; margin-bottom: 1rem">✅</p>
          <h3 style="
            font-family: var(--fuente-titulo);
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
            color: var(--acento-oscuro);
          ">¡Solicitud enviada!</h3>
          <p style="color: var(--gris-texto)">
            Nos pondremos en contacto contigo en menos de 24 horas.
          </p>
        </div>
      `;
    }
  });
}


const rutaActual = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-links a').forEach(enlace => {
  const rutaEnlace = enlace.getAttribute('href');
  if (rutaEnlace === rutaActual || (rutaActual === '' && rutaEnlace === 'index.html')) {
    enlace.classList.add('activo');
  }
});