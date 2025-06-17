import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import {
  Calendar, MapPin, Users, Star, Clock,
  Trophy, Camera, Code, Gift, Search
} from 'lucide-react';
import { fetchAllFilteredEvents } from '../../stores/student/event-slice/index';

const gradientClasses = [
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-green-400 to-lime-500',
  'from-yellow-400 to-orange-500',
  'from-red-400 to-pink-500',
  'from-sky-400 to-indigo-500',
  'from-rose-400 to-pink-600',
];

const iconMap = {
  Code: <Code className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
};

const getRandomGradient = () =>
  gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

const Technical = () => {
  const dispatch = useDispatch();
  const { eventList = [], isLoading } = useSelector((state) => state.events || {});
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    dispatch(fetchAllFilteredEvents({}));
  }, [dispatch]);

  // Custom debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const filtered = eventList.filter(event =>
      event.type === 'Technical' &&
      (event.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        event.organisation.toLowerCase().includes(debouncedSearch.toLowerCase()))
    );
    setFilteredList(filtered);
  }, [eventList, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto mb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Explore Technical Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participate in coding contests, robotics races, and tech fests to challenge your skills!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Tech Events', value: filteredList.length || '0', icon: <Code />, color: 'indigo' },
            { label: 'Participants', value: '2,000+', icon: <Users />, color: 'blue' },
            { label: 'Top Rated', value: '4.9', icon: <Star />, color: 'yellow' },
            { label: 'Support', value: '24/7', icon: <Clock />, color: 'green' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                  {React.cloneElement(stat.icon, { className: `w-6 h-6 text-${stat.color}-600` })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by event or organisation name..."
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Event Cards */}
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading events...</p>
        ) : filteredList.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No technical events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredList.map((event, index) => {
              const gradient = getRandomGradient();
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden hover:-translate-y-2">
                  <div className={`h-32 relative bg-gradient-to-r ${gradient}`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      {iconMap[event.icon] || <Code className="w-5 h-5" />}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium text-gray-800">{event.rating || '4.5'}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <CardTitle className="text-white text-lg font-bold leading-tight">
                        {event.name}
                      </CardTitle>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description || 'No description available.'}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{event.members} Members</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2" />
                        <span>By {event.organisation}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-2xl font-bold text-gray-800">₹{event.fees}</span>
                      <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                        Join Now
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Technical;
