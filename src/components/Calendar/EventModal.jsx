import React from 'react';
import Modal from 'react-modal';

const EventModal = ({ event, isOpen, onClose, onEdit, onDelete, user }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Detalles"
    style={{
      overlay: { zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)' },
      content: { zIndex: 1001, maxWidth: '500px', margin: 'auto', padding: '2rem' }
    }}
  >
    {event && (
      <div>
        <h2>{event.title}</h2>
        <p><strong>Descripción:</strong> {event.description}</p>
        <p><strong>Inicio:</strong> {new Date(event.start).toLocaleString()}</p>
        <p><strong>Fin:</strong> {new Date(event.end).toLocaleString()}</p>
        <p><strong>Creado por:</strong> {event.createdByEmail}</p>

        {(user.role === 'admin' || user.role === 'editor') && (
          <div style={{ marginTop: '1rem' }}>
            <button style={{ marginRight: '1rem' }} onClick={onEdit}>✏️ Editar</button>
            <button onClick={onDelete} style={{ backgroundColor: '#c0392b', color: '#fff' }}>🗑️ Eliminar</button>
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: '1rem' }}>
          Cerrar
        </button>
      </div>
    )}
  </Modal>
);

export default EventModal;
