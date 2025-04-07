import React from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onClose, formData, handleInput, handleSubmit }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Editar Evento"
    style={{
      overlay: { zIndex: 1002, backgroundColor: 'rgba(0,0,0,0.5)' },
      content: { zIndex: 1003, maxWidth: '500px', margin: 'auto', padding: '2rem' }
    }}
  >
    <h2>✏️ Editar Evento</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleInput} required placeholder="Título" style={{ marginBottom: '1rem', width: '100%' }} />
      <input type="text" name="description" value={formData.description} onChange={handleInput} required placeholder="Descripción" style={{ marginBottom: '1rem', width: '100%' }} />
      <input type="datetime-local" name="start" value={formData.start} onChange={handleInput} required style={{ marginBottom: '1rem', width: '100%' }} />
      <input type="datetime-local" name="end" value={formData.end} onChange={handleInput} required style={{ marginBottom: '1rem', width: '100%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit">✅ Actualizar</button>
        <button type="button" onClick={onClose}>❌ Cancelar</button>
      </div>
    </form>
  </Modal>
);

export default EditModal;
