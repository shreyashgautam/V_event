"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudentRegistrations } from '../../stores/student/register-slice';

import {
  Button
} from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import {
  Input
} from '../../components/ui/input'
import {
  Label
} from '../../components/ui/label'
import {
  logout
} from '../../stores/auth-slice'
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
  Clock,
  Trash2,
  UserCheck,
  Crown,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Activity,
  BookOpen,
  Rocket,
  Shield,
  Heart,
  Globe,
  ChevronRight,
  Gift,
  Camera,
  Edit3
} from 'lucide-react'
import {
  createTeam,
  fetchTeamsByLeader,
  deleteTeam
} from '../../stores/student/team-slice/index'

// ✅ Sonner toast
import { toast } from 'sonner'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const { user, isLoading: authLoading } = useSelector(state => state.auth)
  const {
    teams,
    loading: teamsLoading,
    error: teamsError
  } = useSelector(state => state.team)

  const [teamForm, setTeamForm] = useState({
    teamName: '',
    members: ''
  })
  const { registeredEvents, loading: registrationLoading } = useSelector(
    (state) => state.studentRegister
  );
  
  useEffect(() => {
    if (user?.regNo) {
      dispatch(fetchStudentRegistrations(user.regNo));
    }
  }, [user?.regNo, dispatch]);
  

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      toast.success("Logged out successfully", {
        description: "You have been safely logged out of your account."
      })
      // redirect to login page as needed
    } catch (err) {
      console.error(err)
      toast.error("Logout failed", {
        description: "An error occurred while logging out."
      })
    }
  }

  useEffect(() => {
    if (user?.regNo) {
      dispatch(fetchTeamsByLeader(user.regNo))
    }
  }, [dispatch, user])

  const handleInput = (name, value) =>
    setTeamForm(prev => ({
      ...prev,
      [name]: value
    }))

  const handleCreate = async () => {
    if (!teamForm.teamName || !teamForm.members) {
      toast.error('Please fill all fields', {
        description: 'Both team name and members are required to create a team.'
      })
      return
    }

    const memberArray = teamForm.members.split(',').map(m => m.trim()).filter(Boolean)

    try {
      await dispatch(
        createTeam({
          teamName: teamForm.teamName,
          teamLeader: user.regNo,
          teamMembers: memberArray
        })
      ).unwrap()

      toast.success("Team created successfully! 🎉", {
        description: `Team "${teamForm.teamName}" has been created with ${memberArray.length} members.`,
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "1px solid #8b5cf6"
        }
      })
      
      setTeamForm({ teamName: '', members: '' })
      dispatch(fetchTeamsByLeader(user.regNo))
    } catch (err) {
      toast.error("Failed to create team", {
        description: err.message || "Something went wrong while creating the team.",
        style: {
          background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
          color: "white",
          border: "1px solid #ef4444"
        }
      })
    }
  }

  const handleDelete = async teamId => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await dispatch(deleteTeam({ teamId, regno: user.regNo })).unwrap()
        
        toast.success("Team deleted successfully", {
          description: "The team has been permanently removed.",
          style: {
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
            color: "white",
            border: "1px solid #ef4444"
          },
          action: {
            label: "Undo",
            onClick: () => {
              toast.info("Undo functionality coming soon!", {
                description: "This feature will be available in the next update.",
                style: {
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "1px solid #8b5cf6"
                }
              })
            }
          }
        })
        
        dispatch(fetchTeamsByLeader(user.regNo))
      } catch (err) {
        toast.error("Failed to delete team", {
          description: err.message || "Error occurred while deleting the team.",
          style: {
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
            color: "white",
            border: "1px solid #ef4444"
          }
        })
      }
    }
  }

  const totalPoints = 0 // You can calculate from participatedEvents if available

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative">
            <div className="animate-spin h-20 w-20 border-4 border-purple-300 border-t-white rounded-full mx-auto mb-6" />
            <div className="absolute inset-0 animate-ping h-20 w-20 border-4 border-white rounded-full mx-auto opacity-20" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Dashboard</h2>
          <p className="text-purple-200 font-medium">Preparing your personalized experience...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Enhanced Header with Glassmorphism */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 rounded-2xl flex justify-center items-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <User className="text-white h-8 w-8" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-2 -left-2 h-5 w-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <Crown className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  Welcome back, {user.userName || user.name}! ✨
                </h1>
                <p className="text-gray-600 font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                  Manage your events & teams with magical ease
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                size="sm" 
                variant="outline" 
                className="relative border-purple-200 hover:bg-purple-50 bg-white/50 backdrop-blur-sm transform transition-all duration-200 hover:scale-105"
                onClick={() => toast.info("Notifications", { description: "No new notifications" })}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-purple-200 hover:bg-purple-50 bg-white/50 backdrop-blur-sm transform transition-all duration-200 hover:scale-105"
                onClick={() => toast.info("Settings", { description: "Settings panel coming soon!" })}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-purple-500/25"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Teams</p>
                  <p className="text-3xl font-bold">{teams.length}</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-emerald-500/25 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Events Registered</p>
                  <p className="text-3xl font-bold">{registeredEvents?.length || 0}</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Achievement Points</p>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Active Status</p>
                  <p className="text-xl font-bold">Online</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile & Teams Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ultra Enhanced Profile Card */}
          <Card className="lg:col-span-1 bg-white/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 h-32 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="relative px-8 pb-8">
              <div className="text-center -mt-16 mb-8">
                <div className="relative inline-block">
                  <div className="h-32 w-32 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 rounded-3xl mx-auto flex justify-center items-center shadow-2xl border-4 border-white transform hover:rotate-3 transition-transform duration-300">
                    <User className="text-white h-16 w-16" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-800">
                  {user.userName || user.name}
                </h3>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-bold mt-3 shadow-lg">
                  <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                  {user.role}
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 transform hover:scale-105 transition-transform duration-200">
                  <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Email Address</p>
                    <p className="text-sm text-gray-700 font-medium truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 transform hover:scale-105 transition-transform duration-200">
                  <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Registration ID</p>
                    <p className="text-sm text-gray-700 font-mono font-bold">{user.regNo}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 transform hover:scale-105 transition-transform duration-200">
                  <div className="h-12 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Member Since</p>
                    <p className="text-sm text-gray-700 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100 transform hover:scale-105 transition-transform duration-200">
                  <div className="h-12 w-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Location</p>
                    <p className="text-sm text-gray-700 font-medium">{user.location || 'Earth 🌍'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ultra Enhanced My Teams Card */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center text-2xl font-bold relative z-10">
                <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                My Amazing Teams ({teams.length})
                <div className="ml-auto">
                  <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Rocket className="h-5 w-5" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {teamsLoading ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="animate-spin h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"></div>
                    <div className="absolute inset-0 animate-ping h-12 w-12 border-4 border-emerald-600 rounded-full mx-auto opacity-20"></div>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">Loading your teams...</p>
                </div>
              ) : teamsError ? (
                <div className="text-center py-12">
                  <div className="h-20 w-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-10 w-10 text-red-500" />
                  </div>
                  <p className="text-red-600 font-bold text-lg">{teamsError}</p>
                </div>
              ) : teams.length === 0 ? (
                <div className="text-center py-16">
                  <div className="h-24 w-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-gray-600 text-xl font-bold mb-2">No teams created yet</h3>
                  <p className="text-gray-400 text-lg">Create your first team below and start your journey! 🚀</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {teams.map((team, index) => (
                    <div
                      key={team.teamId || team._id}
                      className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`h-4 w-4 rounded-full shadow-lg ${
                              index % 4 === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                              index % 4 === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              index % 4 === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                            }`}></div>
                            <h4 className="font-bold text-gray-800 text-xl">{team.teamName}</h4>
                            <div className="ml-auto">
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                              <Crown className="h-4 w-4 text-yellow-500" />
                              <span className="font-bold text-yellow-700">Leader: {team.teamLeader}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span className="font-bold text-blue-700">{team.teamMembers?.length || 0} members</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {team.teamMembers?.map((member, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-bold border border-indigo-200 transform hover:scale-105 transition-transform duration-200"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 bg-white/80 backdrop-blur-sm"
                          onClick={() => handleDelete(team.teamId || team._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ultra Enhanced Create Team Card */}
        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <CardTitle className="flex items-center text-2xl font-bold relative z-10">
              <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Plus className="h-7 w-7" />
              </div>
              Create New Team
              <div className="ml-auto flex items-center space-x-2">
                <Zap className="h-6 w-6" />
                <Sparkles className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center">
                  <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  Team Name *
                </Label>
                <Input
                  placeholder="Enter an awesome team name ✨"
                  value={teamForm.teamName}
                  onChange={e => handleInput('teamName', e.target.value)}
                  className="border-2 border-gray-300 focus:border-green-500 focus:ring-green-500 h-14 text-lg rounded-xl bg-white/50 backdrop-blur-sm font-medium placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center">
                  <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                  Members (RegNo comma-separated) *
                </Label>
                <Input
                  placeholder="e.g. 23BCE1002, 23BCE1003, 23BCE1004 🚀"
                  value={teamForm.members}
                  onChange={e => handleInput('members', e.target.value)}
                  className="border-2 border-gray-300 focus:border-green-500 focus:ring-green-500 h-14 text-lg rounded-xl bg-white/50 backdrop-blur-sm font-medium placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <div className="mt-10 flex justify-end space-x-6">
              <Button
                variant="outline"
                onClick={() => {
                  setTeamForm({ teamName: '', members: '' })
                  toast.info("Form cleared", { description: "All fields have been reset." })
                }}
                className="px-8 py-4 border-2 border-gray-300 hover:bg-gray-50 text-lg font-medium rounded-xl transform hover:scale-105 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                <Target className="h-5 w-5 mr-2" />
                Reset Form
              </Button>
              <Button
                onClick={handleCreate}
                disabled={teamsLoading}
                className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 text-white px-10 py-4 shadow-2xl disabled:opacity-50 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-200 hover:shadow-green-500/25"
              >
                <Plus className="h-6 w-6 mr-3" />
                {teamsLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Create Team'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ultra Enhanced Registered Events Section */}
        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mb-12"></div>
            <CardTitle className="text-2xl font-bold relative z-10 flex items-center">
              <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <BookOpen className="h-7 w-7" />
              </div>
              My Registered Events
              <div className="ml-4 px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
                {registeredEvents?.length || 0} Events
              </div>
              <div className="ml-auto">
                <Gift className="h-8 w-8" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {registrationLoading ? (
              <div className="text-center py-16">
                <div className="relative">
                  <div className="animate-spin h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-6"></div>
                  <div className="absolute inset-0 animate-ping h-16 w-16 border-4 border-indigo-600 rounded-full mx-auto opacity-20"></div>
                </div>
                <p className="text-gray-600 text-xl font-medium">Loading your registrations...</p>
              </div>
            ) : registeredEvents?.length === 0 ? (
              <div className="text-center py-20">
                <div className="h-32 w-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-8 transform hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-16 w-16 text-indigo-400" />
                </div>
                <h3 className="text-gray-600 text-2xl font-bold mb-3">No events registered yet</h3>
                <p className="text-gray-400 text-lg">Start your journey by registering for exciting events! 🎯</p>
              </div>
            ) : (
              <div className="space-y-6">
                {registeredEvents.map((reg, index) => (
                  <div key={reg._id} className="group p-6 bg-gradient-to-br from-white to-indigo-50 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-14 -mt-14 opacity-60"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg ${
                            index % 4 === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                            index % 4 === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            index % 4 === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}>
                            <Star className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{reg.eventName}</h3>
                            <p className="text-sm text-gray-500 font-medium">Organized by {reg.eventOrg}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {reg.teamName ? (
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                              <Users className="h-4 w-4 mr-2 text-purple-600" />
                              <span className="text-sm font-bold text-purple-700">Team: {reg.teamName}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
                              <User className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="text-sm font-bold text-blue-700">Individual</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                          <Calendar className="h-5 w-5 text-indigo-500" />
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Registered On</p>
                            <p className="text-sm text-gray-700 font-medium">{new Date(reg.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                          <Globe className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Event Status</p>
                            <p className="text-sm text-emerald-600 font-bold">Confirmed ✓</p>
                          </div>
                        </div>
                      </div>

                      {reg.teamMembers?.length > 0 && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                          <p className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                            <Users className="h-4 w-4 mr-2 text-indigo-500" />
                            Team Members ({reg.teamMembers.length})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {reg.teamMembers.map((member, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-bold border border-indigo-200 transform hover:scale-105 transition-transform duration-200"
                              >
                                <UserCheck className="h-3 w-3 mr-1" />
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer with additional visual appeal */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg">
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-gray-600 font-medium">Made with love for amazing students</span>
            <Sparkles className="h-5 w-5 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard