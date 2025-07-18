'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Users, Eye, MessageSquare, ArrowLeft, Plus, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

// Mock marketer data
const mockMarketers = [
  {
    id: '1',
    username: 'adaora-marketing',
    name: 'Adaora Okonkwo',
    bio: 'Digital marketing specialist with 8+ years experience helping African creators scale their businesses.',
    country: 'Nigeria',
    rating: 4.9,
    reviewCount: 127,
    campaignsCompleted: 89,
    conversionRate: 23.5,
    focusAreas: ['courses', 'ebooks', 'software'],
    avatar: 'AO',
    verified: true,
    status: 'approved',
    joinedDate: '2023-01-15',
    successStories: 45
  },
  {
    id: '2',
    username: 'kwame-growth',
    name: 'Kwame Asante',
    bio: 'Growth marketing expert specializing in African markets. Helped 200+ creators increase revenue.',
    country: 'Ghana',
    rating: 4.8,
    reviewCount: 98,
    campaignsCompleted: 156,
    conversionRate: 28.2,
    focusAreas: ['music', 'art', 'templates'],
    avatar: 'KA',
    verified: true,
    status: 'approved',
    joinedDate: '2022-11-20',
    successStories: 67
  },
  {
    id: '3',
    username: 'fatima-digital',
    name: 'Fatima Al-Rashid',
    bio: 'Social media and content marketing strategist focused on empowering African entrepreneurs.',
    country: 'Egypt',
    rating: 4.7,
    reviewCount: 84,
    campaignsCompleted: 72,
    conversionRate: 19.8,
    focusAreas: ['photography', 'art', 'courses'],
    avatar: 'FA',
    verified: true,
    status: 'approved',
    joinedDate: '2023-03-10',
    successStories: 32
  },
  {
    id: '4',
    username: 'chidi-conversion',
    name: 'Chidi Okoro',
    bio: 'Conversion optimization specialist with expertise in African consumer behavior. Data-driven approach to marketing.',
    country: 'Nigeria',
    rating: 4.6,
    reviewCount: 56,
    campaignsCompleted: 43,
    conversionRate: 31.4,
    focusAreas: ['software', 'templates', 'courses'],
    avatar: 'CO',
    verified: false,
    joinedDate: '2023-06-05',
    successStories: 28,
    status: 'approved'
  },
  {
    id: '5',
    username: 'amina-creative',
    name: 'Amina Hassan',
    bio: 'Creative marketing strategist specializing in visual content and brand storytelling for digital products.',
    country: 'Kenya',
    rating: 4.8,
    reviewCount: 73,
    campaignsCompleted: 61,
    conversionRate: 25.7,
    focusAreas: ['art', 'photography', 'videos'],
    avatar: 'AH',
    verified: true,
    joinedDate: '2023-02-28',
    successStories: 39,
    status: 'approved'
  }
];

const categories = [
  { value: 'all', name: 'All Categories' },
  { value: 'courses', name: 'Online Courses' },
  { value: 'ebooks', name: 'eBooks' },
  { value: 'music', name: 'Music & Audio' },
  { value: 'templates', name: 'Templates' },
  { value: 'art', name: 'Digital Art' },
  { value: 'software', name: 'Software Tools' },
  { value: 'photography', name: 'Photography' },
  { value: 'videos', name: 'Video Content' }
];

const countries = [
  { value: 'all', name: 'All Countries' },
  { value: 'Nigeria', name: 'Nigeria' },
  { value: 'Ghana', name: 'Ghana' },
  { value: 'Kenya', name: 'Kenya' },
  { value: 'South Africa', name: 'South Africa' },
  { value: 'Egypt', name: 'Egypt' }
];

export default function HireMarketer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedMarketer, setSelectedMarketer] = useState(null);
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [hireFormData, setHireFormData] = useState({
    products: [{ title: '', commission: '15' }],
    message: '',
    budget: '',
    timeline: ''
  });

  const userProducts = [
    { id: '1', title: 'Digital Marketing Masterclass', price: 25000 },
    { id: '2', title: 'African Art Collection', price: 18000 },
    { id: '3', title: 'Business Templates Pack', price: 12000 },
    { id: '4', title: 'Afrobeat Production Kit', price: 15000 },
    { id: '5', title: 'Photography Course', price: 22000 }
  ];

  const filteredAndSortedMarketers = useMemo(() => {
    let filtered = mockMarketers.filter(marketer => marketer.status === 'approved');

    if (searchQuery) {
      filtered = filtered.filter(marketer =>
        marketer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        marketer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        marketer.focusAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(marketer => 
        marketer.focusAreas.includes(selectedCategory)
      );
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(marketer => marketer.country === selectedCountry);
    }

    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'campaigns':
        filtered.sort((a, b) => b.campaignsCompleted - a.campaignsCompleted);
        break;
      case 'conversion':
        filtered.sort((a, b) => b.conversionRate - a.conversionRate);
        break;
      case 'recent':
          filtered.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
          break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedCountry, sortBy]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleHireClick = (marketer) => {
    setSelectedMarketer(marketer);
    setIsHireDialogOpen(true);
  };

  const handleHireSubmit = (e) => {
    e.preventDefault();
    setIsHireDialogOpen(false);
    setHireFormData({
      products: [{ title: '', commission: '15' }],
      message: '',
      budget: '',
      timeline: ''
    });
    alert('Hire request sent successfully!');
  };

  const MarketerCard = ({ marketer }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {marketer.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                    {marketer.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{marketer.country}</span>
                    {marketer.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm line-clamp-3">
              {marketer.bio}
            </p>

            {/* Focus Areas */}
            <div className="flex flex-wrap gap-2">
              {marketer.focusAreas.slice(0, 3).map((area) => (
                <Badge key={area} variant="secondary" className="text-xs">
                  {categories.find(c => c.value === area)?.name || area}
                </Badge>
              ))}
              {marketer.focusAreas.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{marketer.focusAreas.length - 3} more
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  {renderStars(marketer.rating)}
                </div>
                <div className="text-sm font-medium text-gray-900">{marketer.rating}</div>
                <div className="text-xs text-gray-500">({marketer.reviewCount})</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600 mb-1">
                  {marketer.campaignsCompleted}
                </div>
                <div className="text-xs text-gray-500">Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 mb-1">
                  {marketer.conversionRate}%
                </div>
                <div className="text-xs text-gray-500">Conversion</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Link href={`/marketers/${marketer.username}`} className="flex-1">
                <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </Link>
              <Button
                onClick={() => handleHireClick(marketer)}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Hire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CreatorNavbar />
      <CreatorSidebar />

      <div className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Link href="/marketing">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Hire Expert Marketers</h1>
                <p className="text-gray-600">Connect with verified marketing professionals</p>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search marketers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Best Rated</SelectItem>
                      <SelectItem value="campaigns">Most Campaigns</SelectItem>
                      <SelectItem value="conversion">Best Conversion</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredAndSortedMarketers.length} marketers found
            </p>
          </div>

          {/* Marketers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedMarketers.map((marketer) => (
              <motion.div
                key={marketer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {marketer.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{marketer.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{marketer.country}</span>
                              {marketer.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {marketer.bio}
                      </p>

                      {/* Focus Areas */}
                      <div className="flex flex-wrap gap-2">
                        {marketer.focusAreas.slice(0, 3).map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {categories.find(c => c.value === area)?.name || area}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            {renderStars(marketer.rating)}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{marketer.rating}</div>
                          <div className="text-xs text-gray-500">({marketer.reviewCount})</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 mb-1">
                            {marketer.campaignsCompleted}
                          </div>
                          <div className="text-xs text-gray-500">Campaigns</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600 mb-1">
                            {marketer.conversionRate}%
                          </div>
                          <div className="text-xs text-gray-500">Conversion</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4">
                        <Link href={`/marketers/${marketer.username}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleHireClick(marketer)}
                          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Hire
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Hire Dialog */}
          <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Hire {selectedMarketer?.name}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleHireSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Products to Market</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setHireFormData({
                        ...hireFormData,
                        products: [...hireFormData.products, { title: '', commission: '15' }]
                      })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>

                  {hireFormData.products.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Product {index + 1}</Label>
                        {hireFormData.products.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setHireFormData({
                              ...hireFormData,
                              products: hireFormData.products.filter((_, i) => i !== index)
                            })}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Select Product</Label>
                        <Select 
                          value={product.title} 
                          onValueChange={(value) => {
                            const updatedProducts = [...hireFormData.products];
                            updatedProducts[index].title = value;
                            setHireFormData({...hireFormData, products: updatedProducts});
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {userProducts.map((prod) => (
                              <SelectItem key={prod.id} value={prod.title}>
                                {prod.title} - ₦{prod.price.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Commission Percentage</Label>
                        <Select 
                          value={product.commission} 
                          onValueChange={(value) => {
                            const updatedProducts = [...hireFormData.products];
                            updatedProducts[index].commission = value;
                            setHireFormData({...hireFormData, products: updatedProducts});
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[5, 10, 15, 20, 25, 30, 35, 40].map(rate => (
                              <SelectItem key={rate} value={rate.toString()}>{rate}%</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Input
                    placeholder="e.g., ₦50,000 - ₦100,000"
                    value={hireFormData.budget}
                    onChange={(e) => setHireFormData({...hireFormData, budget: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timeline</Label>
                  <Input
                    placeholder="e.g., 2 weeks, 1 month"
                    value={hireFormData.timeline}
                    onChange={(e) => setHireFormData({...hireFormData, timeline: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Message (Optional)</Label>
                  <Textarea
                    placeholder="Tell the marketer about your project..."
                    value={hireFormData.message}
                    onChange={(e) => setHireFormData({...hireFormData, message: e.target.value})}
                    className="min-h-20"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                  disabled={!hireFormData.products.some(p => p.title)}
                >
                  Send Hire Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}