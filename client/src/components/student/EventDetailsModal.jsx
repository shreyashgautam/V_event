import React from 'react';
import { Calendar, MapPin, Users, Tag, X,Trophy,Star,Gift } from 'lucide-react';

const gradientClasses = [
    'from-purple-500 to-pink-500',
    'from-indigo-500 to-blue-500',
    'from-green-400 to-lime-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500',
    'from-sky-400 to-indigo-500',
    'from-rose-400 to-pink-600',
  ];
const getRandomGradient = () =>
    gradientClasses[Math.floor(Math.random() * gradientClasses.length)];
  
  
const EventDetailsModal = ({ event, isOpen, onClose }) => {
    const gradient = getRandomGradient();
    if (!isOpen || !event) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in duration-300 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
  
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="relative bg-gradient-to-br h-64 md:h-full p-0 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <img
                src={event.image || 'https://via.placeholder.com/600x400'}
                alt="Event Visual"
                className="object-cover w-full h-full"
              />
            </div>
  
            <div className="p-8 overflow-y-auto space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{event.name}</h2>
              <p className="text-gray-600">{event.description}</p>
  
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Date & Time</p>
                    <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Venue</p>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Team of</p>
                    <p className="text-gray-600">{event.members}</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <Trophy className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">By</p>
                    <p className="text-gray-600">{event.organisation}</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <Star className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Rating</p>
                    <p className="text-gray-600">{event.rating || '4.5'}</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <Gift className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Registration Fee</p>
                    <p className="text-2xl font-bold text-gray-900">₹{event.fees}</p>
                  </div>
                </div>
              </div>
  
              <div className="pt-6">
                <button className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default EventDetailsModal;
