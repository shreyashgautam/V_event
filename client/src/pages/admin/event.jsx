import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  deleteEvent,
  addEvent,
  editEvent,
} from '../../stores/admin/admin-event-slice';
import axios from 'axios';

const initialFormState = {
  name: '',
  image: '',
  description: '',
  organisation: '',
  date: '',
  fees: '',
  venue: '',
  members: '',
  noOfSeats: '',
  type: 'Technical',
};

const AdminEvent = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.adminEvent);

  const [form, setForm] = useState(initialFormState);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('my_file', file);

    try {
      const res = await axios.post(
        'http://localhost:5001/api/admin/event/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      return res.data.result.secure_url;
    } catch (error) {
      alert('Image upload failed');
      return '';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(id));
    }
  };

  const handleEdit = (event) => {
    setForm({ ...event, date: event.date.split('T')[0] });
    setImagePreview(event.image);
    setIsEdit(true);
    setEditId(event._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };

    if (!form.image) {
      alert('Please upload an image first');
      return;
    }

    if (isEdit) {
      dispatch(editEvent({ id: editId, updatedData: payload }));
    } else {
      dispatch(addEvent(payload));
    }

    setForm(initialFormState);
    setImagePreview('');
    setIsEdit(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await handleImageUpload(file);
      if (url) {
        setForm({ ...form, image: url });
        setImagePreview(url);
      }
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organisation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const resetForm = () => {
    setForm(initialFormState);
    setIsEdit(false);
    setEditId(null);
    setImagePreview('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🎪 Event Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Create, manage and organize amazing college events</p>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <span className="text-2xl">{showForm ? '❌' : '✨'}</span>
              <span>{showForm ? 'Close Form' : 'Create Event'}</span>
            </button>
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 transform animate-in slide-in-from-top duration-500">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
              <span className="mr-3">{isEdit ? '✏️' : '🚀'}</span>
              {isEdit ? 'Edit Event' : 'Create New Event'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Event Name */}
                <div className="lg:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">🎯 Event Name</label>
                  <input
                    name="name"
                    placeholder="Enter amazing event name..."
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="lg:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">🖼️ Event Poster</label>
                  <div className="border-2 border-dashed border-purple-300 rounded-2xl p-6 bg-purple-50/50 hover:bg-purple-100/50 transition-all duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {imagePreview && (
                      <div className="mt-4">
                        <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-2xl shadow-lg mx-auto" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">📝 Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your event in detail..."
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                    required
                  />
                </div>

                {/* Organisation */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">🏛️ Organisation</label>
                  <input
                    name="organisation"
                    placeholder="Club/Society name"
                    value={form.organisation}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">📅 Event Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Fees */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">💰 Entry Fees</label>
                  <input
                    type="number"
                    name="fees"
                    placeholder="₹ 0"
                    value={form.fees}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Venue */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">📍 Venue</label>
                  <input
                    name="venue"
                    placeholder="Event location"
                    value={form.venue}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Members */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">👥 Team Members</label>
                  <input
                    type="number"
                    name="members"
                    placeholder="Required members"
                    value={form.members}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">🪑 Available Seats</label>
                  <input
                    type="number"
                    name="noOfSeats"
                    placeholder="Total seats available"
                    value={form.noOfSeats}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">🎯 Event Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  >
                    <option value="Technical">🔧 Technical</option>
                    <option value="Non-Technical">🎨 Non-Technical</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isEdit ? '✅ Update Event' : '🚀 Create Event'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-purple-400 p-4 pl-12 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border-2 border-gray-200 focus:border-purple-400 p-4 rounded-2xl text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <option value="All">🎯 All Types</option>
                <option value="Technical">🔧 Technical</option>
                <option value="Non-Technical">🎨 Non-Technical</option>
              </select>
              
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-2xl font-bold text-lg">
                📊 Total: {filteredEvents.length}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
            <span className="mr-3">🎪</span>
            All Events ({filteredEvents.length})
          </h2>

          {loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-xl text-gray-600">Loading awesome events...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-700 px-6 py-4 rounded-2xl text-center">
              <span className="text-2xl mr-2">❌</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                      event.type === 'Technical' ? 'bg-blue-500' : 'bg-pink-500'
                    }`}>
                      {event.type === 'Technical' ? '🔧 Tech' : '🎨 Non-Tech'}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {event.name}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <span className="text-lg mr-2">🏛️</span>
                      <span className="font-medium">{event.organisation}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <span className="text-lg mr-2">📅</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <span className="text-lg mr-2">📍</span>
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₹{event.fees}</div>
                      <div className="text-sm text-gray-600">Entry Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{event.members}</div>
                      <div className="text-sm text-gray-600">Team Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{event.noOfSeats}</div>
                      <div className="text-sm text-gray-600">Seats</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>✏️</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-8xl mb-4">🎪</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Events Found</h3>
              <p className="text-gray-500">Create your first amazing event!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEvent;