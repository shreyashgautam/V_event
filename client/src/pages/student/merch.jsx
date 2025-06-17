import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import {
  ShoppingCart, Heart, Star, Tag, Package,
  Shirt, Crown, Coffee, Gift, Zap, Eye
} from 'lucide-react';

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

// Dummy merchandise data
const merchandiseData = [
  {
    id: 1,
    name: "Tech Conference T-Shirt",
    category: "T-Shirts",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    description: "Premium cotton t-shirt with event logo. Comfortable and stylish.",
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Developer Baseball Cap",
    category: "Caps",
    price: 599,
    originalPrice: 799,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop&crop=center",
    description: "Adjustable baseball cap with embroidered logo. Perfect for coding sessions.",
    colors: ["Black", "Gray", "Navy"],
    sizes: ["One Size"],
    inStock: true,
    badge: "Limited"
  },
  {
    id: 3,
    name: "Code & Coffee Mug",
    category: "Mugs",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&crop=center",
    description: "11oz ceramic mug with motivational coding quotes. Microwave safe.",
    colors: ["White", "Black"],
    sizes: ["Standard"],
    inStock: true,
    badge: "Popular"
  },
  {
    id: 4,
    name: "Event Hoodie Premium",
    category: "Hoodies",
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
    description: "Warm and cozy hoodie with front pocket. Perfect for winter events.",
    colors: ["Gray", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    badge: "New"
  },
  {
    id: 5,
    name: "Tech Sticker Pack",
    category: "Stickers",
    price: 199,
    originalPrice: 299,
    rating: 4.5,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    description: "Pack of 10 waterproof vinyl stickers. Perfect for laptops and water bottles.",
    colors: ["Multi"],
    sizes: ["Pack of 10"],
    inStock: true,
    badge: "Value Pack"
  },
  {
    id: 6,
    name: "Programmer's Notebook",
    category: "Accessories",
    price: 449,
    originalPrice: 599,
    rating: 4.4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    description: "A5 dot grid notebook for sketching algorithms and taking notes.",
    colors: ["Black", "Brown"],
    sizes: ["A5"],
    inStock: true,
    badge: "Essential"
  },
  {
    id: 7,
    name: "Hackathon Winner Tee",
    category: "T-Shirts",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop&crop=center",
    description: "Exclusive t-shirt for hackathon participants and winners.",
    colors: ["White", "Black", "Red"],
    sizes: ["S", "M", "L", "XL"],
    inStock: false,
    badge: "Exclusive"
  },
  {
    id: 8,
    name: "Smart Water Bottle",
    category: "Accessories",
    price: 799,
    originalPrice: 999,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    description: "Insulated water bottle with event branding. Keeps drinks cold for 24 hours.",
    colors: ["Silver", "Black", "Blue"],
    sizes: ["500ml"],
    inStock: true,
    badge: "Eco-Friendly"
  }
];

const Merchandise = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Products', value: merchandiseData.length.toString(), icon: <Package />, color: 'purple' },
            { label: 'Categories', value: (categories.length - 1).toString(), icon: <Tag />, color: 'blue' },
            { label: 'Happy Customers', value: '10K+', icon: <Heart />, color: 'pink' },
            { label: 'Fast Delivery', value: '2-3 Days', icon: <Zap />, color: 'green' },
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

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category !== 'All' && categoryIcons[category]}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

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
                  {item.badge && (
                    <div className={`absolute top-4 left-4 ${getBadgeColor(item.badge)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                      {item.badge}
                    </div>
                  )}

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{discount}%
                    </div>
                  )}

                  {/* Stock Status */}
                  {!item.inStock && (
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
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-gray-500">({item.reviews})</span>
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

                  {/* Colors */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Colors:</span>
                    <div className="flex space-x-1">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-gray-300"
                          style={{
                            backgroundColor: color.toLowerCase() === 'multi' ? 
                              `linear-gradient(45deg, red, blue, green)` : 
                              color.toLowerCase()
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(item.id)}
                      disabled={!item.inStock}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        item.inStock
                          ? cart.has(item.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{cart.has(item.id) ? 'Added' : 'Add to Cart'}</span>
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