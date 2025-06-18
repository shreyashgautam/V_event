import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import {
  ShoppingCart, Heart, Star, Tag, Package,
  Shirt, Crown, Coffee, Gift, Zap, Eye
} from 'lucide-react';
import { useDispatch } from "react-redux";
import { fetchFilteredMerch } from '../../stores/student/merch-slice/index';


// Available gradients
const gradientClasses = [
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-green-400 to-lime-500',
  'from-yellow-400 to-orange-500',
  'from-red-400 to-pink-500',
  'from-sky-400 to-indigo-500',
  'from-rose-400 to-pink-600',
  'from-emerald-400 to-teal-500',
];

const categoryIcons = {
  'T-Shirts': <Shirt className="w-5 h-5" />,
  'Caps': <Crown className="w-5 h-5" />,
  'Mugs': <Coffee className="w-5 h-5" />,
  'Accessories': <Gift className="w-5 h-5" />,
  'Hoodies': <Package className="w-5 h-5" />,
  'Stickers': <Star className="w-5 h-5" />
};

const getRandomGradient = () =>
  gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

const Merchandise = () => {
  const dispatch = useDispatch(); // 👈 add this
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  // Fetch merchandise data from Redux store
  const merchandiseData = useSelector(state => state.merch.merchList);
  useEffect(() => {
    dispatch(fetchFilteredMerch());
  }, [dispatch]);
  console.log(merchandiseData);
  // <-- Adjust 'state.merchandise.items' based on your Redux slice structure

  const categories = ['All', ...new Set(merchandiseData.map(item => item.category))];

  const filteredItems = selectedCategory === 'All' 
    ? merchandiseData 
    : merchandiseData.filter(item => item.category === selectedCategory);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addToCart = (id) => {
    const newCart = new Set(cart);
    newCart.add(id);
    setCart(newCart);
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Bestseller': 'bg-gradient-to-r from-yellow-400 to-orange-500',
      'Limited': 'bg-gradient-to-r from-red-400 to-pink-500',
      'Popular': 'bg-gradient-to-r from-green-400 to-lime-500',
      'New': 'bg-gradient-to-r from-blue-400 to-indigo-500',
      'Value Pack': 'bg-gradient-to-r from-purple-400 to-pink-500',
      'Essential': 'bg-gradient-to-r from-gray-400 to-gray-600',
      'Exclusive': 'bg-gradient-to-r from-indigo-500 to-purple-600',
      'Eco-Friendly': 'bg-gradient-to-r from-emerald-400 to-teal-500'
    };
    return colors[badge] || 'bg-gradient-to-r from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Official Merchandise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Show your love for tech events with our exclusive collection of premium merchandise
          </p>
        </div>



        {/* Category Filter */}
       

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const gradient = getRandomGradient();
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

            return (
              <Card key={item.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden hover:-translate-y-2">
                {/* Image and Actions */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
                          favorites.has(item.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Badge */}
                

                  {/* Stock Status */}
                  {!item.noOfPieces && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white text-center py-2 rounded-lg font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Category and Rating */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-600 font-medium">{item.category}</span>
                    <div className="flex items-center space-x-1">
                   
                     
                     
                    </div>
                  </div>

                  {/* Product Name */}
                  <CardTitle className="text-lg font-bold text-gray-800 leading-tight">
                    {item.name}
                  </CardTitle>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">₹{item.price}</span>
                      
                    </div>
                    <button
                      onClick={() => addToCart(item.id)}
                      disabled={!item.noOfPieces}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        item.noOfPieces
                          ? cart.has(item.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Buy</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Merchandise;
