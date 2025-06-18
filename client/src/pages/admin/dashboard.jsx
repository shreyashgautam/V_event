import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../stores/auth-slice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalStudents: 0,
    totalClubs: 0,
    recentEvents: [],
    upcomingEvents: [],
    topClubs: [],
    loading: true
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        totalEvents: 48,
        activeEvents: 12,
        totalStudents: 2340,
        totalClubs: 15,
        recentEvents: [
          { id: 1, name: 'Tech Fest 2025', club: 'KJ Club', date: '2025-07-15', participants: 320, status: 'Completed' },
          { id: 2, name: 'Cultural Night', club: 'Cultural Club', date: '2025-07-20', participants: 450, status: 'Active' },
          { id: 3, name: 'Sports Meet', club: 'Sports Club', date: '2025-07-25', participants: 280, status: 'Upcoming' }
        ],
        upcomingEvents: [
          { id: 4, name: 'Hackathon 2025', club: 'Programming Club', date: '2025-08-05', expectedParticipants: 200 },
          { id: 5, name: 'Dance Competition', club: 'Dance Club', date: '2025-08-10', expectedParticipants: 150 },
          { id: 6, name: 'Science Exhibition', club: 'Science Club', date: '2025-08-15', expectedParticipants: 300 }
        ],
        topClubs: [
          { id: 1, name: ' KJ Club', events: 8, members: 245 },
          { id: 2, name: 'Cultural Club', events: 6, members: 180 },
          { id: 3, name: 'Sports Club', events: 5, members: 320 }
        ],
        loading: false
      });
    }, 1000);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/auth/login');
  };

  const StatCard = ({ icon, title, value, color, subtitle }) => (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{dashboardData.loading ? '...' : value}</p>
          {subtitle && (
            <p className="text-white/80 text-xs mt-2">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const EventCard = ({ event, isUpcoming = false }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{event.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          event.status === 'Active' ? 'bg-green-100 text-green-800' :
          event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.status || 'Upcoming'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">🏛️ {event.club}</p>
      <p className="text-sm text-gray-600 mb-1">📅 {event.date}</p>
      <p className="text-sm text-gray-600">
        👥 {isUpcoming ? `Expected: ${event.expectedParticipants}` : `Participants: ${event.participants}`}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                🎓 College Event Admin
              </h1>
              <p className="text-gray-600 mt-2">Manage college events, clubs and student activities</p>
            </div>
            
            {/* User Profile & Logout */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg">
                {user?.userName?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">{user?.userName}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-xs text-purple-600 font-medium">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="🎪"
            title="Total Events"
            value={dashboardData.totalEvents}
            color="from-purple-500 to-purple-600"
            subtitle="All time events organized"
          />
          <StatCard
            icon="⚡"
            title="Active Events"
            value={dashboardData.activeEvents}
            color="from-green-500 to-green-600"
            subtitle="Currently running events"
          />
          <StatCard
            icon="🎓"
            title="Total Students"
            value={dashboardData.totalStudents.toLocaleString()}
            color="from-blue-500 to-blue-600"
            subtitle="Registered students"
          />
          <StatCard
            icon="🏛️"
            title="Active Clubs"
            value={dashboardData.totalClubs}
            color="from-orange-500 to-orange-600"
            subtitle="Student organizations"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left">
              <div className="text-2xl mb-2">➕</div>
              <div className="font-semibold">Create Event</div>
              <div className="text-sm opacity-90">Add new college event</div>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-semibold">Manage Clubs</div>
              <div className="text-sm opacity-90">View & edit club details</div>
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">View Reports</div>
              <div className="text-sm opacity-90">Event analytics & stats</div>
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left">
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-semibold">Student List</div>
              <div className="text-sm opacity-90">Manage student database</div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📅</span>
              Recent Events
            </h2>
            <div className="space-y-4">
              {dashboardData.loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                dashboardData.recentEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">🔮</span>
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {dashboardData.loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                dashboardData.upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} isUpcoming={true} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Top Performing Clubs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">🏆</span>
            Top Performing Clubs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardData.loading ? (
              <div className="text-center py-8 text-gray-500 col-span-3">Loading...</div>
            ) : (
              dashboardData.topClubs.map((club, index) => (
                <div key={club.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">{club.name}</h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">📊 Events Organized: <span className="font-semibold">{club.events}</span></p>
                    <p className="text-sm text-gray-600">👥 Members: <span className="font-semibold">{club.members}</span></p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;