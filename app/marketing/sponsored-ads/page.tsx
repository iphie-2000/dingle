'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, Target, Calendar, DollarSign, BarChart, Eye, MousePointer, TrendingUp, 
  ArrowLeft, Plus, Edit, Trash2, Play, Pause, Image, Video
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

// Mock data for sponsored ads
const mockAds = [
  {
    id: '1',
    title: 'Digital Marketing Course Promotion',
    product: 'Complete Digital Marketing Course',
    budget: 50000,
    spent: 32500,
    impressions: 125000,
    clicks: 3250,
    conversions: 287,
    revenue: 4305000,
    startDate: '2024-01-10',
    endDate: '2024-01-24',
    status: 'active',
    adType: 'image',
    placements: ['homepage', 'category']
  },
  {
    id: '2',
    title: 'African Art Collection Banner',
    product: 'African Art Collection',
    budget: 30000,
    spent: 30000,
    impressions: 89000,
    clicks: 1780,
    conversions: 156,
    revenue: 2340000,
    startDate: '2024-01-05',
    endDate: '2024-01-19',
    status: 'completed',
    adType: 'video',
    placements: ['explore', 'mobile']
  },
  {
    id: '3',
    title: 'Business Templates Flash Sale',
    product: 'Business Templates Pack',
    budget: 75000,
    spent: 45000,
    impressions: 156000,
    clicks: 4680,
    conversions: 234,
    revenue: 2808000,
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    status: 'active',
    adType: 'image',
    placements: ['homepage', 'search']
  }
];

const adPlacements = [
  { id: 'homepage', name: 'Homepage Banner', description: 'Prime placement on the main homepage', reach: 'High' },
  { id: 'category', name: 'Category Pages', description: 'Show ads on relevant category pages', reach: 'Medium' },
  { id: 'explore', name: 'Explore Section', description: 'Featured in the explore products section', reach: 'High' },
  { id: 'search', name: 'Search Results', description: 'Appear in search results for relevant keywords', reach: 'Medium' },
  { id: 'mobile', name: 'Mobile App', description: 'Exclusive placement in the Dingle mobile app', reach: 'Very High' },
  { id: 'carousel', name: 'Product Carousel', description: 'Rotating banner in product carousels', reach: 'Medium' }
];

const targetingOptions = [
  { id: 'country', name: 'Country', options: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt'] },
  { id: 'interest', name: 'Interest', options: ['Digital Marketing', 'Entrepreneurship', 'Art & Design', 'Technology', 'Business'] },
  { id: 'category', name: 'Product Category', options: ['Courses', 'eBooks', 'Templates', 'Art', 'Music', 'Software'] }
];

export default function SponsoredAds() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [adData, setAdData] = useState({
    title: '',
    product: '',
    adType: 'image',
    budget: '',
    budgetType: 'total',
    startDate: '',
    endDate: '',
    placements: [],
    targeting: {
      countries: [],
      interests: [],
      categories: []
    },
    description: ''
  });

  const stats = {
    totalBudget: mockAds.reduce((sum, ad) => sum + ad.budget, 0),
    totalSpent: mockAds.reduce((sum, ad) => sum + ad.spent, 0),
    totalImpressions: mockAds.reduce((sum, ad) => sum + ad.impressions, 0),
    totalRevenue: mockAds.reduce((sum, ad) => sum + ad.revenue, 0)
  };

  const avgCTR = ((mockAds.reduce((sum, ad) => sum + ad.clicks, 0) / stats.totalImpressions) * 100).toFixed(2);
  const avgConversionRate = ((mockAds.reduce((sum, ad) => sum + ad.conversions, 0) / mockAds.reduce((sum, ad) => sum + ad.clicks, 0)) * 100).toFixed(1);

  const handleCreateAd = (e) => {
    e.preventDefault();
    console.log('Creating sponsored ad:', adData);
    setIsCreateDialogOpen(false);
    // Reset form
    setAdData({
      title: '',
      product: '',
      adType: 'image',
      budget: '',
      budgetType: 'total',
      startDate: '',
      endDate: '',
      placements: [],
      targeting: {
        countries: [],
        interests: [],
        categories: []
      },
      description: ''
    });
  };

  const togglePlacement = (placementId) => {
    setAdData(prev => ({
      ...prev,
      placements: prev.placements.includes(placementId)
        ? prev.placements.filter(id => id !== placementId)
        : [...prev.placements, placementId]
    }));
  };

  const toggleTargeting = (type, value) => {
    setAdData(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        [type]: prev.targeting[type].includes(value)
          ? prev.targeting[type].filter(item => item !== value)
          : [...prev.targeting[type], value]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CreatorNavbar />
      <CreatorSidebar />
      
      <div className="pt-24 pb-12 ml-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <Link href="/marketing">
                <Button variant="outline" size="sm" className="border-gray-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketing
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Sponsored Ads</h1>
                <p className="text-gray-600">Promote your products across the Dingle platform</p>
              </div>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Ad Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Sponsored Ad Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateAd} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Campaign Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter campaign title"
                        value={adData.title}
                        onChange={(e) => setAdData({...adData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Select Product</Label>
                      <Select value={adData.product} onValueChange={(value) => setAdData({...adData, product: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="course">Digital Marketing Course</SelectItem>
                          <SelectItem value="ebook">African Entrepreneurship Guide</SelectItem>
                          <SelectItem value="templates">Business Templates Pack</SelectItem>
                          <SelectItem value="art">African Art Collection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Ad Type */}
                  <div className="space-y-2">
                    <Label>Ad Type</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="image"
                          name="adType"
                          value="image"
                          checked={adData.adType === 'image'}
                          onChange={(e) => setAdData({...adData, adType: e.target.value})}
                        />
                        <Label htmlFor="image" className="flex items-center cursor-pointer">
                          <Image className="w-4 h-4 mr-2" />
                          Image Ad
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="video"
                          name="adType"
                          value="video"
                          checked={adData.adType === 'video'}
                          onChange={(e) => setAdData({...adData, adType: e.target.value})}
                        />
                        <Label htmlFor="video" className="flex items-center cursor-pointer">
                          <Video className="w-4 h-4 mr-2" />
                          Video Ad
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Amount (₦)</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="Enter budget"
                        value={adData.budget}
                        onChange={(e) => setAdData({...adData, budget: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetType">Budget Type</Label>
                      <Select value={adData.budgetType} onValueChange={(value) => setAdData({...adData, budgetType: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="total">Total Budget</SelectItem>
                          <SelectItem value="daily">Daily Budget</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={adData.startDate}
                        onChange={(e) => setAdData({...adData, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={adData.endDate}
                        onChange={(e) => setAdData({...adData, endDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Ad Placements */}
                  <div className="space-y-4">
                    <Label>Ad Placements</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {adPlacements.map((placement) => (
                        <div
                          key={placement.id}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            adData.placements.includes(placement.id)
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => togglePlacement(placement.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{placement.name}</h4>
                              <p className="text-sm text-gray-600">{placement.description}</p>
                            </div>
                            <Badge variant="secondary">{placement.reach}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Targeting */}
                  <div className="space-y-4">
                    <Label>Target Audience</Label>
                    {targetingOptions.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <h4 className="font-medium text-gray-900">{option.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {option.options.map((item) => (
                            <div
                              key={item}
                              className={`px-3 py-1 border rounded-full cursor-pointer text-sm transition-all duration-200 ${
                                adData.targeting[option.id + 's']?.includes(item)
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-300 hover:border-orange-300'
                              }`}
                              onClick={() => toggleTargeting(option.id + 's', item)}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Ad Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your ad campaign..."
                      value={adData.description}
                      onChange={(e) => setAdData({...adData, description: e.target.value})}
                      className="min-h-24"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                      <Megaphone className="w-4 h-4 mr-2" />
                      Create Ad Campaign
                    </Button>
                    <Button type="button" variant="outline" className="border-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalImpressions.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                          <Eye className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Click-Through Rate</p>
                          <p className="text-2xl font-bold text-purple-600">{avgCTR}%</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <MousePointer className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                          <p className="text-2xl font-bold text-green-600">{avgConversionRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
                          <p className="text-2xl font-bold text-blue-600">₦{stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* How Sponsored Ads Work */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Megaphone className="w-5 h-5 mr-2 text-orange-500" />
                      How Sponsored Ads Work
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      Sponsored ads allow you to promote your digital products across the Dingle platform 
                      and mobile app. Your ads will be shown to targeted audiences based on their interests, 
                      location, and browsing behavior, helping you reach potential customers effectively.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Target Audience</h3>
                        <p className="text-sm text-gray-600">Reach the right customers with precise targeting</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Prime Placement</h3>
                        <p className="text-sm text-gray-600">Show ads in high-visibility areas of the platform</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BarChart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Track Performance</h3>
                        <p className="text-sm text-gray-600">Monitor clicks, conversions, and ROI in real-time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Active & Past Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAds.map((ad, index) => (
                        <motion.div
                          key={ad.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{ad.title}</h4>
                              <Badge variant={ad.status === 'active' ? 'default' : 'secondary'}>
                                {ad.status}
                              </Badge>
                              <Badge variant="outline">{ad.adType}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{ad.product}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {ad.startDate} - {ad.endDate}
                              </span>
                              <span>Budget: ₦{ad.budget.toLocaleString()}</span>
                              <span>Spent: ₦{ad.spent.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-gray-900">{ad.impressions.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">Impressions</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {((ad.clicks / ad.impressions) * 100).toFixed(2)}%
                              </div>
                              <div className="text-xs text-gray-500">CTR</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-600">
                                {((ad.conversions / ad.clicks) * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">Conv. Rate</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-600">
                                ₦{ad.revenue.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">Revenue</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-orange-600">
                                {((ad.revenue / ad.spent) * 100).toFixed(0)}%
                              </div>
                              <div className="text-xs text-gray-500">ROAS</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {ad.status === 'active' && (
                              <Button size="sm" variant="outline">
                                <Pause className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Placements Tab */}
            <TabsContent value="placements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adPlacements.map((placement, index) => (
                  <motion.div
                    key={placement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{placement.name}</CardTitle>
                          <Badge variant="secondary">{placement.reach} Reach</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{placement.description}</p>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Features:</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• High visibility placement</li>
                            <li>• Responsive design support</li>
                            <li>• Real-time performance tracking</li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                          Select Placement
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="w-5 h-5 mr-2 text-orange-500" />
                      Ad Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
                      <p className="text-gray-600">
                        Detailed analytics with audience insights, conversion funnels, and ROI analysis will be available soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}