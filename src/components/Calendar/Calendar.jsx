import { useEffect, useState } from 'react';
import { Views } from 'react-big-calendar';
import axios from 'axios';
import Modal from 'react-modal';
import CalendarView from './CalendarView';
import EventForm from './EventForm';
import EventModal from './EventModal';
import EditModal from './EditModal';

Modal.setAppElement('#root');

const Calendar = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: ''
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/eventos');
      const data = res.data.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end)
      }));
      setEvents(data);
    } catch (err) {
      console.error('Error al cargar eventos:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/historial');
      setHistory(res.data);
    } catch (err) {
      console.error('Error al cargar historial:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchHistory();
  }, []);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user._id || !user.email) return;

    try {
      await axios.post('http://localhost:5000/api/eventos', {
        ...formData,
        userId: user._id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido
      });

      setFormData({ title: '', description: '', start: '', end: '' });
      setCreateModalOpen(false);
      fetchEvents();
      fetchHistory();
    } catch (err) {
      alert('❌ Error al guardar el evento');
    }
  };

  const handleSelectEvent = (event) => setSelectedEvent(event);

  const handleDelete = async () => {
    if (!selectedEvent || !window.confirm('¿Eliminar este evento?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/eventos/${selectedEvent._id}`, {
        data: {
          userId: user._id,
          nombre: user.nombre,
          apellido: user.apellido
        }
      });

      setSelectedEvent(null);
      fetchEvents();
      fetchHistory();
    } catch (err) {
      alert('❌ Error al eliminar');
    }
  };

  const startEdit = () => {
    setFormData({
      title: selectedEvent.title,
      description: selectedEvent.description,
      start: new Date(selectedEvent.start).toISOString().slice(0, 16),
      end: new Date(selectedEvent.end).toISOString().slice(0, 16)
    });
    setEditModalOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/eventos/${selectedEvent._id}`, {
        title: formData.title,
        description: formData.description,
        start: formData.start,
        end: formData.end,
        userId: user._id,
        nombre: user.nombre,
        apellido: user.apellido
      });
      setEditModalOpen(false);
      setSelectedEvent(null);
      fetchEvents();
      fetchHistory();
    } catch (err) {
      alert('❌ Error al actualizar');
    }
  };

  const moveEvent = async ({ event, start, end }) => {
    try {
      await axios.put(`http://localhost:5000/api/eventos/${event._id}`, {
        title: event.title,
        description: event.description,
        start,
        end,
        userId: user._id,
        nombre: user.nombre,
        apellido: user.apellido
      });
      fetchEvents();
      fetchHistory();
    } catch (err) {
      alert('❌ Error al mover evento');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📆 Calendario</h2>
      <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
        👋 Bienvenido, {user?.nombre} {user?.apellido}
      </h3>

      <button
        onClick={() => setCreateModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          padding: '0.75rem 1.25rem',
          fontSize: '1rem',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        📝 Crear nueva nota
      </button>

      <CalendarView
        user={user}
        events={events}
        view={view}
        setView={setView}
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
      />

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent && !editModalOpen}
        onClose={() => setSelectedEvent(null)}
        onEdit={startEdit}
        onDelete={handleDelete}
        user={user}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        formData={formData}
        handleInput={handleInput}
        handleSubmit={submitEdit}
      />

      <Modal
        isOpen={createModalOpen}
        onRequestClose={() => setCreateModalOpen(false)}
        contentLabel="Nuevo Evento"
        style={{
          overlay: { zIndex: 1002, backgroundColor: 'rgba(0,0,0,0.5)' },
          content: { zIndex: 1003, maxWidth: '500px', margin: 'auto', padding: '2rem' }
        }}
      >
        <h2>📝 Crear nueva nota</h2>
        <EventForm
          formData={formData}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          buttonLabel="Agregar Evento"
        />
      </Modal>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        maxHeight: '250px',
        overflowY: 'auto'
      }}>
        <h4 style={{ marginBottom: '1rem' }}>🧾 Historial de cambios:</h4>
        {history.length === 0 ? (
          <p>No hay acciones registradas.</p>
        ) : (
          history.map((h, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <strong>{h.nombre} {h.apellido}</strong> {h.accion} <em>“{h.eventoTitulo}”</em><br />
              <small style={{ color: '#777' }}>{new Date(h.fecha).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
