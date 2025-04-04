const Home = () => {
  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>👋 ¡Hola! Soy Pablo Trujillo</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
        Soy desarrollador web con experiencia en <strong>JavaScript, React, Node.js y MongoDB</strong>. 
        Me especializo en crear soluciones funcionales y escalables usando el stack MERN y herramientas modernas de automatización y bases de datos.
      </p>

      <h2 style={{ marginTop: '2rem' }}>🧠 Tecnologías Destacadas</h2>
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8rem' }}>
        <li>✅ React (Hooks, MERN, Redux)</li>
        <li>✅ Node.js + Express</li>
        <li>✅ MongoDB + MySQL</li>
        <li>✅ CSS moderno (Flexbox, Grid, responsive)</li>
        <li>✅ Automatización con UiPath y VBA</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>🎓 Formación</h2>
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.7rem' }}>
        <li><strong>Curso React: De cero a experto (MERN)</strong> – 2022 - 2024</li>
        <li><strong>Curso MySQL Ver 5.7 y 8</strong> – Diseño, triggers, funciones, vistas</li>
        <li><strong>Programa RPA con UiPath</strong> – Escuela EOI + Fundación Generation</li>
        <li><strong>Grado Superior ASIR</strong> – Administración de Sistemas Informáticos en Red</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>💼 Experiencia Relevante</h2>
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.7rem' }}>
        <li><strong>Técnico informático - AyrConsulting</strong> (2022 - 2023)</li>
        <li>→ Automatización de procesos con UiPath y macros en VBA</li>
        <li>→ Optimización y mantenimiento web, análisis de datos</li>
        <li>→ Excel avanzado, .NET y tareas de infraestructura</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>📂 Proyectos</h2>
      <p style={{ marginBottom: '1rem' }}>Explora mis aplicaciones:</p>
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8rem' }}>
        <li>🔗 <a href="/blog">BlogDinámico</a> – Crea y gestiona artículos con MongoDB</li>
        <li>🔜 Calendario – Gestión de eventos (en desarrollo)</li>
        <li>🔜 Biblioteca de Películas – Explora y guarda títulos (en desarrollo)</li>
      </ul>
    </section>
  );
};

export default Home;

  