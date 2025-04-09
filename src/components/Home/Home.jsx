import React from 'react';
import WordFormationAnimation from './WordFormationAnimation'; // Asegúrate que la ruta sea correcta

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#111',
        color: '#ddd',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      {/* SECCIÓN PRINCIPAL */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4rem',
          minHeight: 'calc(100vh - 80px)',
          padding: '2rem',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1.5rem' }}>
            Bienvenido<span style={{ color: '#f5d76e' }}>.</span>
          </h1>
          <p style={{ lineHeight: '1.6rem', fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
            Mi nombre es <strong>Pedro Trujillo</strong>, soy desarrollador front-end con base en España.
          </p>
          <p style={{ color: '#aaa', lineHeight: '1.6rem' }}>
            Me apasiona crear interfaces limpias, intuitivas y visualmente atractivas que conectan la lógica con la experiencia de usuario.
          </p>
        </div>

        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: '#222',
              border: '2px solid #f5d76e',
              marginBottom: '1.5rem',
            }}
          />
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Tu foto aquí</span>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#f5d76e', marginBottom: '0.5rem' }}>Pedro Trujillo Lucena</h2>
            <p>Málaga, España</p>
            <p>📞 +34 675 034 328</p>
            <p>✉️ pedrotl3379@gmail.com</p>
            <p>
              🔗 <a href="https://linkedin.com/in/pedrotrujillolucena" target="_blank" rel="noopener noreferrer" style={{ color: '#f5d76e' }}>LinkedIn</a>
            </p>
          </div>
        </div>
      </div>

      {/* ANIMACIÓN TEXTO CON BOLAS */}
      <WordFormationAnimation />

      {/* RESTO DE CONTENIDO */}
      <section style={{ marginTop: '4rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Perfil Profesional</h2>
        <p style={paragraph}>
          Profesional en Tecnologías de la Información con un Grado Superior en Administración de Sistemas Informáticos en Red,
          nivel alto de inglés (B2) y más de cuatro años de experiencia aplicando soluciones de inteligencia artificial, automatización
          de procesos y desarrollo full-stack. Apasionado por la innovación tecnológica, con amplio dominio de herramientas y frameworks actuales,
          enfocado en crear sistemas eficientes que optimicen recursos y potencien la toma de decisiones estratégicas.
        </p>
      </section>

      <section style={{ marginTop: '3rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Habilidades Técnicas</h2>
        <ul style={list}>
          <li><strong>Bases de Datos:</strong> MySQL, MariaDB</li>
          <li><strong>Frontend & Backend:</strong> React, JavaScript, PHP, MERN</li>
          <li><strong>Automatización y RPA:</strong> UiPath, VBA, BPMN</li>
          <li><strong>IA & ML:</strong> ChatGPT, TensorFlow, PyTorch</li>
          <li><strong>Lenguajes:</strong> JavaScript, C++, PHP</li>
          <li><strong>Ofimática:</strong> Excel, Word, macros</li>
          <li><strong>Versionado:</strong> GitHub</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Idiomas</h2>
        <ul style={list}>
          <li>Español: Nativo</li>
          <li>Inglés: Nivel B2</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Formación Académica</h2>
        <ul style={list}>
          <li><strong>Grado Superior ASIR</strong> – IES Campanillas</li>
          <li><strong>Certificación Cisco</strong> – Redes, Diagnóstico</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Formación Complementaria</h2>
        <ul style={list}>
          <li><strong>React MERN</strong> – 2022–2024</li>
          <li><strong>MySQL avanzado</strong></li>
          <li><strong>UiPath + Bizagi + VBA</strong></li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Proyectos & Competencias</h2>
        <ul style={list}>
          <li>Modelos de IA generativa (OpenAI, DALL-E, MidJourney)</li>
          <li>Automatización inteligente, análisis predictivo</li>
        </ul>
      </section>

      <footer
        style={{
          marginTop: '4rem',
          textAlign: 'right',
          fontSize: '0.9rem',
          color: '#666',
          padding: '1rem 2rem',
        }}
      >
        ©2024 pedrotrujillo.dev
      </footer>
    </div>
  );
};

const sectionTitle = {
  color: '#f5d76e',
  fontSize: '1.5rem',
  marginBottom: '1rem',
};

const paragraph = {
  lineHeight: '1.8rem',
  fontSize: '1rem',
  color: '#ccc',
};

const list = {
  listStyle: 'none',
  paddingLeft: 0,
  lineHeight: '1.8rem',
  color: '#ccc',
};

export default Home;
