import React from 'react';

const EventForm = ({ formData, handleInput, handleSubmit, buttonLabel = "Agregar Evento" }) => (
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h2 style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem'
    }}>
  
    </h2>

    <input
      type="text"
      name="title"
      placeholder="Título"
      value={formData.title}
      onChange={handleInput}
      required
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '6px'
      }}
    />
    <input
      type="text"
      name="description"
      placeholder="Descripción"
      value={formData.description}
      onChange={handleInput}
      required
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '6px'
      }}
    />
    <input
      type="datetime-local"
      name="start"
      value={formData.start}
      onChange={handleInput}
      required
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '6px'
      }}
    />
    <input
      type="datetime-local"
      name="end"
      value={formData.end}
      onChange={handleInput}
      required
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '6px'
      }}
    />
    <button
      type="submit"
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
    >
      {buttonLabel}
    </button>
  </form>
);

export default EventForm;
