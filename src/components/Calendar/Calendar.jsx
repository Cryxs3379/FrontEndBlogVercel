import { useEffect, useState } from 'react';
import { Views } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import CalendarView from './CalendarView';
import EventForm from './EventForm';
import EventModal from './EventModal';
import EditModal from './EditModal';

const Calendar = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: ''
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  useEffect(() => {
    fetchEvents();
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
        email: user.email
      });

      setFormData({ title: '', description: '', start: '', end: '' });
      fetchEvents();
    } catch (err) {
      alert('❌ Error al guardar el evento');
    }
  };

  const handleSelectEvent = (event) => setSelectedEvent(event);

  const handleDelete = async () => {
    if (!selectedEvent || !window.confirm('¿Eliminar este evento?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/eventos/${selectedEvent._id}`);
      setSelectedEvent(null);
      fetchEvents();
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
        end: formData.end
      });
      setEditModalOpen(false);
      setSelectedEvent(null);
      fetchEvents();
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
        end
      });
      fetchEvents();
    } catch (err) {
      alert('❌ Error al mover evento');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📆 Calendario</h2>

      <EventForm
        formData={formData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />

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
    </div>
  );
};

export default Calendar;
