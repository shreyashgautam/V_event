"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  Crown
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
          background: "black", // light green
          color: "white",       // dark green text
          border: "1px solid #10B981"
        }
      })
      
      setTeamForm({ teamName: '', members: '' })
      dispatch(fetchTeamsByLeader(user.regNo))
    } catch (err) {
      toast.error("Failed to create team", {
        description: err.message || "Something went wrong while creating the team.",
        style: {
          background: "red", // light green
          color: "white",       // dark green text
          border: "1px solid #10B981"
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
            background: "red", // light green
            color: "white",       // dark green text
            border: "1px solid #10B981"
          },
          action: {
            label: "Undo",
            onClick: () => {
              toast.info("Undo functionality coming soon!", {
                description: "This feature will be available in the next update.",
                style: {
                  background: "black", // light green
                  color: "white",       // dark green text
                  border: "1px solid #10B981"
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
            background: "red", // light green
            color: "white",       // dark green text
            border: "1px solid #10B981"
          }
        })
      }
    }
  }

  const totalPoints = 0 // You can calculate from participatedEvents if available

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex justify-center items-center shadow-lg">
                  <User className="text-white h-7 w-7" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {user.userName || user.name}!
                </h1>
                <p className="text-gray-500 font-medium">Manage your events & teams with ease</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                size="sm" 
                variant="outline" 
                className="relative border-indigo-200 hover:bg-indigo-50"
                onClick={() => toast.info("Notifications", { description: "No new notifications" })}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-indigo-200 hover:bg-indigo-50"
                onClick={() => toast.info("Settings", { description: "Settings panel coming soon!" })}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards Row */}
    

        {/* Profile & Teams Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Profile Card with Complete Personal Details */}
          <Card className="lg:col-span-1 bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-24"></div>
            <CardContent className="relative px-6 pb-6">
              <div className="text-center -mt-12 mb-6">
                <div className="h-24 w-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex justify-center items-center shadow-xl border-4 border-white">
                  <User className="text-white h-10 w-10" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  {user.userName || user.name}
                </h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mt-2">
                  <Crown className="h-3 w-3 mr-1" />
                  {user.role}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-700 truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Registration Number</p>
                    <p className="text-sm text-gray-700 font-mono">{user.regNo}</p>
                  </div>
                </div>
                
          
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Member Since</p>
                    <p className="text-sm text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="text-sm text-gray-700">{user.location || 'Not Provided'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced My Teams Card */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 mr-2" />
                My Teams ({teams.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {teamsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-3"></div>
                  <p className="text-gray-500">Loading teams...</p>
                </div>
              ) : teamsError ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-8 w-8 text-red-500" />
                  </div>
                  <p className="text-red-600 font-medium">{teamsError}</p>
                </div>
              ) : teams.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No teams created yet</p>
                  <p className="text-gray-400 text-sm mt-1">Create your first team below!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {teams.map((team, index) => (
                    <div
                      key={team.teamId || team._id}
                      className="group p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`h-3 w-3 rounded-full ${
                              index % 4 === 0 ? 'bg-blue-500' :
                              index % 4 === 1 ? 'bg-green-500' :
                              index % 4 === 2 ? 'bg-purple-500' : 'bg-orange-500'
                            }`}></div>
                            <h4 className="font-bold text-gray-800 text-lg">{team.teamName}</h4>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Crown className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">Leader: {team.teamLeader}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{team.teamMembers?.length || 0} members:</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {team.teamMembers?.map((member, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
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

        {/* Enhanced Create Team Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center text-xl">
              <Plus className="h-6 w-6 mr-2" />
              Create New Team
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  Team Name *
                </Label>
                <Input
                  placeholder="Enter an awesome team name"
                  value={teamForm.teamName}
                  onChange={e => handleInput('teamName', e.target.value)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 h-12 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                  Members (RegNo comma-separated) *
                </Label>
                <Input
                  placeholder="e.g. 23BCE1002, 23BCE1003, 23BCE1004"
                  value={teamForm.members}
                  onChange={e => handleInput('members', e.target.value)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 h-12 text-lg"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setTeamForm({ teamName: '', members: '' })
                  toast.info("Form cleared", { description: "All fields have been reset." })
                }}
                className="px-6 py-3 border-gray-300 hover:bg-gray-50"
              >
                Reset Form
              </Button>
              <Button
                onClick={handleCreate}
                disabled={teamsLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 shadow-lg disabled:opacity-50"
              >
                <Plus className="h-5 w-5 mr-2" />
                {teamsLoading ? 'Creating...' : 'Create Team'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserDashboard