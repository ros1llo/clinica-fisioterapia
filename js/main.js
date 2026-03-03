// ============================================================
// MAIN.JS — FisioVida
// ============================================================
// 1. Navbar: sombra al hacer scroll
// 2. Animaciones reveal al hacer scroll
// 3. Formulario: validación y feedback
// ============================================================


// ============================================================
// 1. NAVBAR — sombra al hacer scroll
//
// En esta web la nav es blanca, así que en lugar de cambiar
// el color de fondo, añadimos una sombra sutil cuando el
// usuario baja. Esto da sensación de profundidad.
// ============================================================
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 2. ANIMACIONES REVEAL AL HACER SCROLL
//
// Igual que en el portfolio: IntersectionObserver vigila
// qué elementos son visibles y les añade la clase "visible".
// La diferencia es que aquí añadimos la clase reveal por JS
// a los elementos que queremos animar.
// ============================================================
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


// ============================================================
// 3. FORMULARIO — validación y feedback visual
//
// Cuando el usuario envía el formulario:
//   - Comprobamos que todos los campos requeridos están rellenos
//   - Si falta algo, marcamos el campo en rojo
//   - Si todo está bien, mostramos un mensaje de éxito
//
// preventDefault() → evita que el formulario recargue la página
// El comportamiento por defecto de un form es recargar la página
// al hacer submit. Con esto lo controlamos nosotros con JS.
// ============================================================
const formulario = document.querySelector('.formulario');

if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let valido = true;

    // Recorremos todos los campos requeridos
    formulario.querySelectorAll('[required]').forEach(campo => {
      if (!campo.value.trim()) {
        // Campo vacío → borde rojo
        campo.style.borderColor = '#e63946';
        valido = false;

        // Quitamos el rojo cuando el usuario empieza a escribir
        campo.addEventListener('input', () => {
          campo.style.borderColor = '';
        }, { once: true }); // once: true → solo se ejecuta una vez
      }
    });

    if (valido) {
      // Todo correcto → mostramos mensaje de éxito
      // En un proyecto real aquí harías un fetch() a tu backend Node.js
      // para enviar el email. Por ahora simulamos el éxito.
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


// ============================================================
// 4. HIGHLIGHT enlace activo en la navegación
//
// Detectamos en qué página estamos comparando la URL actual
// con el href de cada enlace del menú.
// Así no tenemos que añadir la clase "activo" manualmente
// en cada página (aunque ya lo hicimos, esto es una capa extra).
//
// window.location.pathname → la ruta actual, ej: "/servicios.html"
// ============================================================
const rutaActual = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-links a').forEach(enlace => {
  const rutaEnlace = enlace.getAttribute('href');
  if (rutaEnlace === rutaActual || (rutaActual === '' && rutaEnlace === 'index.html')) {
    enlace.classList.add('activo');
  }
});