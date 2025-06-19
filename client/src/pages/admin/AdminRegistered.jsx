import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRegistrations,
  deleteRegistration,
} from "../../stores/admin/register-event-slice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { 
  Trash2, 
  Search, 
  Users, 
  Eye, 
  Calendar,
  Building,
  Hash,
  User,
  X,
  UserCheck,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const AdminRegistered = () => {
  const dispatch = useDispatch();
  const { registrations, loading, error, deleteStatus } = useSelector(
    (state) => state.adminRegister
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    dispatch(fetchAllRegistrations());
  }, [dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      toast.success("Registration deleted successfully", {
        style: {
          background: "#f0fdf4",
          border: "1px solid #22c55e",
          color: "#15803d"
        }
      });
    } else if (deleteStatus === "failed") {
      toast.error("Failed to delete registration", {
        style: {
          background: "#fef2f2",
          border: "1px solid #ef4444",
          color: "#dc2626"
        }
      });
    }
  }, [deleteStatus]);

  // Filter registrations based on search term
  useEffect(() => {
    if (!registrations) return;
    
    const filtered = registrations.filter((reg) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        reg.regNo?.toLowerCase().includes(searchLower) ||
        reg.eventName?.toLowerCase().includes(searchLower) ||
        reg.teamName?.toLowerCase().includes(searchLower) ||
        reg.teamId?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm]);

  const handleDelete = (regId) => {
    dispatch(deleteRegistration(regId));
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Event Registrations Dashboard
          </h1>
          <p className="text-lg text-gray-600">Manage and monitor all event registrations</p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by registration number, event name, or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-12 h-12 text-lg bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Stats */}
        {!loading && !error && (
          <div className="flex justify-center items-center gap-6 text-sm">
            <Badge variant="secondary" className="px-6 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200 text-blue-800 font-semibold text-base rounded-full">
              <Users className="h-4 w-4 mr-2" />
              Total: {registrations?.length || 0}
            </Badge>
            {searchTerm && (
              <Badge variant="outline" className="px-6 py-2 bg-white/80 backdrop-blur-sm border-orange-200 text-orange-700 font-semibold text-base rounded-full">
                <Search className="h-4 w-4 mr-2" />
                Filtered: {filteredRegistrations.length}
              </Badge>
            )}
          </div>
        )}

        {/* Enhanced Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 animate-pulse"></div>
              </div>
              <span className="text-lg text-gray-600 font-medium">Loading registrations...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-red-700 font-semibold text-lg">Error loading registrations</p>
              <p className="text-red-600 text-sm mt-2">{error}</p>
            </div>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-700 font-semibold text-lg">
                {searchTerm ? "No matching registrations found" : "No registrations found"}
              </p>
              <p className="text-gray-500 mt-2">
                {searchTerm ? "Try adjusting your search criteria" : "Registrations will appear here once available"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRegistrations.map((reg) => (
              <Card key={reg._id} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group">
                {/* Colorful top border */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>
                
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                        {reg.eventName}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          <Hash className="h-3 w-3 mr-1" />
                          {reg.regNo}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="truncate font-medium">{reg.teamName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Enhanced View Details Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border-0 shadow-2xl">
                        <DialogHeader className="pb-6 border-b border-gray-100">
                          <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                              <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                              {reg.eventName}
                            </span>
                          </DialogTitle>
                          <DialogDescription className="text-lg text-gray-600 mt-2">
                            Complete registration details and team information
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-8 pt-6">
                          {/* Enhanced Basic Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                  <Hash className="h-5 w-5 text-blue-600" />
                                  <p className="font-semibold text-gray-900">Registration Number</p>
                                </div>
                                <p className="text-blue-700 font-bold text-lg">{reg.regNo}</p>
                              </div>
                              
                              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                <div className="flex items-center gap-3 mb-2">
                                  <Users className="h-5 w-5 text-green-600" />
                                  <p className="font-semibold text-gray-900">Team Name</p>
                                </div>
                                <p className="text-green-700 font-bold text-lg">{reg.teamName}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                  <Hash className="h-5 w-5 text-purple-600" />
                                  <p className="font-semibold text-gray-900">Team ID</p>
                                </div>
                                <p className="text-purple-700 font-bold text-lg">{reg.teamId}</p>
                              </div>
                              
                              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                                <div className="flex items-center gap-3 mb-2">
                                  <Building className="h-5 w-5 text-orange-600" />
                                  <p className="font-semibold text-gray-900">Organization</p>
                                </div>
                                <p className="text-orange-700 font-bold text-lg">{reg.eventOrg}</p>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-6" />

                          {/* Enhanced Team Members */}
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                                <UserCheck className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-900">
                                Team Members ({reg.teamMembers?.length || 0})
                              </h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {reg.teamMembers?.map((member, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                                >
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-sm font-bold text-white">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <span className="text-gray-800 font-medium text-lg">{member}</span>
                                </div>
                              )) || (
                                <p className="text-gray-500 col-span-2 text-center py-8 italic">No team members listed</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Enhanced Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl border-0 shadow-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                            <div className="p-2 bg-red-100 rounded-full">
                              <Trash2 className="h-5 w-5 text-red-600" />
                            </div>
                            Delete Registration
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-lg text-gray-600 mt-4">
                            Are you sure you want to delete the registration for{" "}
                            <span className="font-semibold text-blue-700">{reg.teamName}</span> in{" "}
                            <span className="font-semibold text-indigo-700">{reg.eventName}</span>? 
                            <br />
                            <span className="text-red-600 font-medium">This action cannot be undone.</span>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-3 mt-6">
                          <AlertDialogCancel className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(reg._id)}
                            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Registration
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRegistered;