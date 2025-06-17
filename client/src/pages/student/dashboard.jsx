import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { logout } from '../../stores/auth-slice'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Trophy, 
  Users, 
  Award, 
  LogOut,
  Plus,
  Settings,
  Bell,
  Star,
  MapPin,
  Clock
} from 'lucide-react'

const participatedEvents = [
  {
    eventName: "CodeX Hackathon",
    type: "Tech",
    teamName: "ByteBlasters",
    role: "Leader",
    date: "2025-07-05",
    status: "Completed",
    position: "1st Place",
    points: 500
  },
  {
    eventName: "Mock IPL Auction",
    type: "Non-Tech",
    teamName: "Auction Kings",
    role: "Member",
    date: "2025-07-06",
    status: "Completed",
    position: "3rd Place",
    points: 200
  },
  {
    eventName: "Design T-Shirt",
    type: "Merchandise",
    teamName: "TrendSetters",
    role: "Designer",
    date: "2025-07-07",
    status: "In Progress",
    position: "-",
    points: 0
  },
  {
    eventName: "AI Challenge",
    type: "Tech",
    teamName: "Neural Networks",
    role: "Developer",
    date: "2025-06-15",
    status: "Completed",
    position: "2nd Place",
    points: 350
  }
];

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);
  const [teamForm, setTeamForm] = useState({
    teamName: '',
    eventName: '',
    members: ''
  });

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      // Navigate to login page or handle logout success
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleTeamSubmit = () => {
    if (!teamForm.teamName || !teamForm.eventName || !teamForm.members) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Creating team:', teamForm);
    // Handle team creation logic here
    setTeamForm({ teamName: '', eventName: '', members: '' });
    alert('Team created successfully!');
  };

  const handleInputChange = (field, value) => {
    setTeamForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalPoints = participatedEvents.reduce((sum, event) => sum + event.points, 0);
  const completedEvents = participatedEvents.filter(event => event.status === 'Completed').length;
  const activeEvents = participatedEvents.filter(event => event.status === 'In Progress').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, {user?.userName || user?.name || 'User'}!
                </h1>
                <p className="text-gray-600">Manage your events and teams</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* User Profile & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">
                {user?.userName || user?.name || 'John Doe'}
              </CardTitle>
              <p className="text-gray-600">{user?.role || 'Participant'}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user?.email || 'user@example.com'}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{user?.regNo || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Dec 2024'}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{user?.location || 'Mumbai, India'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{totalPoints}</p>
                    <p className="text-gray-600 text-sm">Total Points</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-600">{completedEvents}</p>
                    <p className="text-gray-600 text-sm">Events Completed</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-orange-600">{activeEvents}</p>
                    <p className="text-gray-600 text-sm">Active Events</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Participated Events */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>My Participated Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Event Name</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Team Name</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Position</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {participatedEvents.map((event, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors border-b">
                      <td className="p-4 font-medium">{event.eventName}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{event.teamName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.role === 'Leader' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {event.role}
                        </span>
                      </td>
                      <td className="p-4">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {event.position !== '-' ? (
                          <span className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{event.position}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-purple-600">
                          {event.points > 0 ? `+${event.points}` : '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Create Team */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create New Team</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div onSubmit={handleTeamSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-sm font-medium text-gray-700">
                    Team Name *
                  </Label>
                  <Input 
                    id="teamName" 
                    placeholder="Enter your team name" 
                    value={teamForm.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventSelect" className="text-sm font-medium text-gray-700">
                    Event Name *
                  </Label>
                  <Input 
                    id="eventSelect" 
                    placeholder="Enter event name" 
                    value={teamForm.eventName}
                    onChange={(e) => handleInputChange('eventName', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="members" className="text-sm font-medium text-gray-700">
                  Team Members (Comma Separated) *
                </Label>
                <Input 
                  id="members" 
                  placeholder="Eg: Shreyash, Ananya, Ravi, Priya" 
                  value={teamForm.members}
                  onChange={(e) => handleInputChange('members', e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
                <p className="text-xs text-gray-500">
                  Enter member names separated by commas. You will be added as the team leader automatically.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setTeamForm({ teamName: '', eventName: '', members: '' })}
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleTeamSubmit}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;