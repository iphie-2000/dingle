'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Heart, ShoppingCart, User, Eye, Download, Grid3X3, List, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  reviewCount: number;
  thumbnail: string;
  category: string;
  tags: string[];
  downloads: number;
  featured: boolean;
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Complete Digital Marketing Course',
    description: 'Master digital marketing with practical strategies for African businesses. Includes SMS, email, and social media marketing.',
    price: 15000,
    currency: '₦',
    creator: {
      name: 'Adaora Okonkwo',
      avatar: 'AO',
      verified: true
    },
    rating: 4.8,
    reviewCount: 234,
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Courses',
    tags: ['marketing', 'business', 'digital'],
    downloads: 1250,
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'African Entrepreneurship Guide',
    description: 'A comprehensive eBook covering startup strategies, funding options, and success stories from across Africa.',
    price: 45,
    currency: 'GH₵',
    creator: {
      name: 'Kwame Asante',
      avatar: 'KA',
      verified: true
    },
    rating: 4.9,
    reviewCount: 156,
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'eBooks',
    tags: ['business', 'entrepreneurship', 'africa'],
    downloads: 890,
    featured: true,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    title: 'Afrobeat Production Pack',
    description: 'Professional Afrobeat samples, loops, and MIDI files. Perfect for producers creating authentic African sounds.',
    price: 8500,
    currency: '₦',
    creator: {
      name: 'Fela Kuti Jr.',
      avatar: 'FK',
      verified: true
    },
    rating: 4.7,
    reviewCount: 89,
    thumbnail: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Music',
    tags: ['afrobeat', 'samples', 'production'],
    downloads: 567,
    featured: false,
    createdAt: '2024-01-28'
  },
  {
    id: '4',
    title: 'Modern African Art Collection',
    description: 'High-resolution digital art pieces celebrating African culture and heritage. Perfect for prints and digital use.',
    price: 25,
    currency: 'GH₵',
    creator: {
      name: 'Amina Hassan',
      avatar: 'AH',
      verified: false
    },
    rating: 4.6,
    reviewCount: 67,
    thumbnail: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Art',
    tags: ['art', 'african', 'culture'],
    downloads: 234,
    featured: false,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    title: 'Business Website Templates',
    description: 'Professional website templates designed for African businesses. Includes 10 responsive designs.',
    price: 12000,
    currency: '₦',
    creator: {
      name: 'Chidi Okoro',
      avatar: 'CO',
      verified: true
    },
    rating: 4.5,
    reviewCount: 123,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Templates',
    tags: ['templates', 'website', 'business'],
    downloads: 445,
    featured: false,
    createdAt: '2024-01-20'
  },
  {
    id: '6',
    title: 'Photography Masterclass',
    description: 'Learn professional photography techniques with focus on African landscapes and portraits.',
    price: 18000,
    currency: '₦',
    creator: {
      name: 'Fatima Al-Rashid',
      avatar: 'FA',
      verified: true
    },
    rating: 4.9,
    reviewCount: 178,
    thumbnail: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Courses',
    tags: ['photography', 'masterclass', 'african'],
    downloads: 678,
    featured: true,
    createdAt: '2024-02-05'
  },
  {
    id: '7',
    title: 'African Recipes Collection',
    description: 'Traditional and modern African recipes with step-by-step instructions and beautiful photography.',
    price: 35,
    currency: 'GH₵',
    creator: {
      name: 'Mama Akosua',
      avatar: 'MA',
      verified: false
    },
    rating: 4.4,
    reviewCount: 92,
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'eBooks',
    tags: ['recipes', 'cooking', 'african'],
    downloads: 312,
    featured: false,
    createdAt: '2024-01-25'
  },
  {
    id: '8',
    title: 'Logo Design Templates',
    description: 'Professional logo templates for African businesses. Editable vector files included.',
    price: 7500,
    currency: '₦',
    creator: {
      name: 'Design Pro Africa',
      avatar: 'DP',
      verified: true
    },
    rating: 4.3,
    reviewCount: 156,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Templates',
    tags: ['logo', 'design', 'branding'],
    downloads: 789,
    featured: false,
    createdAt: '2024-02-08'
  }
];

const categories = [
  { id: 'all', name: 'All Products', count: mockProducts.length },
  { id: 'courses', name: 'Courses', count: mockProducts.filter(p => p.category === 'Courses').length },
  { id: 'ebooks', name: 'eBooks', count: mockProducts.filter(p => p.category === 'eBooks').length },
  { id: 'music', name: 'Music', count: mockProducts.filter(p => p.category === 'Music').length },
  { id: 'art', name: 'Art', count: mockProducts.filter(p => p.category === 'Art').length },
  { id: 'templates', name: 'Templates', count: mockProducts.filter(p => p.category === 'Templates').length },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addToCart } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400 fill-current opacity-50' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          
          {/* Overlay Actions */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={() => toggleFavorite(product.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-200 ${
                favorites.includes(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-purple-600 text-white border-0">
                Featured
              </Badge>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {product.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Title and Description */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Creator */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {product.creator.avatar}
              </div>
              <div className="flex-1">
                <button className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors duration-200 flex items-center">
                  {product.creator.name}
                  {product.creator.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Rating and Downloads */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Download className="w-4 h-4 mr-1" />
                {product.downloads.toLocaleString()}
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="text-2xl font-bold gradient-text">
                {product.currency}{product.price.toLocaleString()}
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToCart(product)}
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                </Button>
                <Link href={`/checkout?product=${product.id}`}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-orange-500 via-purple-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Digital Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Discover amazing digital products created by talented African entrepreneurs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products, creators, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Filters and View Options */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 border-2 border-gray-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ x: selectedCategory === category.id ? 0 : 5 }}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge 
                        variant="secondary" 
                        className={selectedCategory === category.id ? 'bg-white/20 text-white' : ''}
                      >
                        {category.count}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredAndSortedProducts.length} products found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
              </div>

              {/* Products */}
              <AnimatePresence mode="wait">
                {filteredAndSortedProducts.length > 0 ? (
                  <motion.div
                    key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'space-y-6'
                    }
                  >
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      variant="outline"
                      className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Load More Button */}
              {filteredAndSortedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-12"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-8 py-3"
                  >
                    Load More Products
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}