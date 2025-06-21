import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBuys,
  deleteBuyById,
} from "../../stores/admin/admin-buy-slice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
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
import { 
  Loader2, 
  Trash2, 
  Search, 
  ShoppingBag, 
  Building2, 
  Hash,
  Filter,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const AdminBuy = () => {
  const dispatch = useDispatch();
  const { buys, loading, error } = useSelector((state) => state.adminBuy);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuys, setFilteredBuys] = useState([]);

  useEffect(() => {
    dispatch(fetchAllBuys());
  }, [dispatch]);

  useEffect(() => {
    if (buys) {
      const filtered = buys.filter(
        (buy) =>
          buy.merchName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          buy.merchOrg?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          buy.regNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          buy.merchId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBuys(filtered);
    }
  }, [buys, searchTerm]);

  const handleDelete = async (buyId, merchName) => {
    try {
      await dispatch(deleteBuyById(buyId)).unwrap();
      toast.success(`${merchName} purchase deleted successfully!`, {
        description: "The purchase record has been removed from the system.",
      });
    } catch (error) {
      toast.error("Failed to delete purchase", {
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleRefresh = () => {
    dispatch(fetchAllBuys());
    toast.info("Refreshing purchases...");
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Error Loading Purchases</h3>
                  <p className="text-sm text-gray-500 mt-1">{error}</p>
                </div>
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            Merchandise Purchases
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all merchandise purchase records
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm font-medium">
            {filteredBuys.length} {filteredBuys.length === 1 ? 'Purchase' : 'Purchases'}
          </Badge>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by merchandise name, organization, reg no, or merch ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">Loading purchases...</p>
              <p className="text-sm text-gray-500">Please wait while we fetch the data</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBuys.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {searchTerm ? 'No matching purchases' : 'No purchases found'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {searchTerm 
                      ? 'Try adjusting your search criteria' 
                      : 'Purchase records will appear here once available'
                    }
                  </p>
                </div>
                {searchTerm && (
                  <Button 
                    onClick={() => setSearchTerm("")} 
                    variant="outline"
                    size="sm"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Purchases Grid */}
      {!loading && filteredBuys.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBuys.map((buy) => (
            <Card 
              key={buy._id} 
              className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm hover:shadow-blue-100/50"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {buy.merchName}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span className="line-clamp-1">{buy.merchOrg}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Hash className="w-4 h-4" />
                      <span>Reg No</span>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">
                      {buy.regNo}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Merch ID</span>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">
                      {buy.merchId}
                    </Badge>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="w-full group-hover:bg-red-600 transition-colors"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Purchase
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </div>
                        Delete Purchase Record
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <p>
                          Are you sure you want to delete the purchase record for{" "}
                          <span className="font-semibold text-gray-900">{buy.merchName}</span>?
                        </p>
                        <p className="text-sm text-gray-500">
                          This action cannot be undone and will permanently remove this purchase record.
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(buy._id, buy.merchName)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBuy;