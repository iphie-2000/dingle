
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, 
  Star, Download, DollarSign, TrendingUp, Calendar, Image
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

// Mock products data
const mockProducts = [
  {
    id: '1',
    title: 'Complete Digital Marketing Course',
    description: 'Master digital marketing with practical strategies for African businesses.',
    price: 15000,
    currency: '₦',
    category: 'Courses',
    status: 'published',
    downloads: 1250,
    rating: 4.8,
    reviews: 234,
    revenue: 1875000,
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-20'
  },
  {
    id: '2',
    title: 'African Entrepreneurship Guide',
    description: 'A comprehensive eBook covering startup strategies and funding options.',
    price: 8500,
    currency: '₦',
    category: 'eBooks',
    status: 'published',
    downloads: 890,
    rating: 4.9,
    reviews: 156,
    revenue: 756500,
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-02-01',
    lastUpdated: '2024-02-05'
  },
  {
    id: '3',
    title: 'Business Templates Pack',
    description: 'Professional templates for African businesses and startups.',
    price: 12000,
    currency: '₦',
    category: 'Templates',
    status: 'draft',
    downloads: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-02-10',
    lastUpdated: '2024-02-10'
  },
  {
    id: '4',
    title: 'Photography Masterclass',
    description: 'Learn professional photography techniques and editing.',
    price: 22000,
    currency: '₦',
    category: 'Courses',
    status: 'published',
    downloads: 567,
    rating: 4.7,
    reviews: 89,
    revenue: 1247400,
    thumbnail: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-25',
    lastUpdated: '2024-02-08'
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0);
  const totalDownloads = products.reduce((sum, product) => sum + product.downloads, 0);
  const averageRating = products.filter(p => p.rating > 0).reduce((sum, product) => sum + product.rating, 0) / products.filter(p => p.rating > 0).length;

  const StatCard = ({ title, value, icon: Icon, color, currency = '' }) => (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {currency}{typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CreatorNavbar />
      <CreatorSidebar />
      
      <div className="pt-20 pb-12 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">My Products</h1>
              <p className="text-gray-600">Manage your digital products and track their performance.</p>
            </div>
            <Link href="/dashboard/create">
              <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Create Product
              </Button>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Products"
              value={products.length}
              icon={Package}
              color="from-orange-500 to-red-500"
            />
            <StatCard
              title="Total Revenue"
              value={totalRevenue}
              icon={DollarSign}
              color="from-teal-500 to-cyan-500"
              currency="₦"
            />
            <StatCard
              title="Total Downloads"
              value={totalDownloads}
              icon={Download}
              color="from-purple-500 to-pink-500"
            />
            <StatCard
              title="Average Rating"
              value={averageRating ? averageRating.toFixed(1) : '0'}
              icon={Star}
              color="from-emerald-500 to-green-500"
            />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Courses">Courses</SelectItem>
                <SelectItem value="eBooks">eBooks</SelectItem>
                <SelectItem value="Templates">Templates</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Art">Art</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        product.status === 'published' ? 'bg-green-100 text-green-800' :
                        product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold line-clamp-1">{product.title}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {product.currency}{product.price.toLocaleString()}
                        </span>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{product.downloads}</div>
                          <div className="text-gray-600">Downloads</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">
                            {product.rating > 0 ? product.rating.toFixed(1) : 'N/A'}
                          </div>
                          <div className="text-gray-600">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">
                            {product.currency}{product.revenue.toLocaleString()}
                          </div>
                          <div className="text-gray-600">Revenue</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(product.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterCategory !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your filters or search query.'
                  : 'Create your first product to get started.'
                }
              </p>
              {(!searchQuery && filterCategory === 'all' && filterStatus === 'all') && (
                <Link href="/dashboard/create">
                  <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Product
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
