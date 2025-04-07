import React from 'react';

const EventForm = ({ formData, handleInput, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
    <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleInput} required style={{ marginRight: '0.5rem', width: '200px' }} />
    <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleInput} required style={{ marginRight: '0.5rem', width: '300px' }} />
    <input type="datetime-local" name="start" value={formData.start} onChange={handleInput} required style={{ marginRight: '0.5rem' }} />
    <input type="datetime-local" name="end" value={formData.end} onChange={handleInput} required style={{ marginRight: '0.5rem' }} />
    <button type="submit">Agregar Evento</button>
  </form>
);

export default EventForm;
