'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Users, UserCheck, UserX, Package, DollarSign, TrendingUp, AlertTriangle, 
  Shield, Eye, EyeOff, CheckCircle, XCircle, Clock, Star, Award,
  Activity, Target, Zap, Crown, Settings, Bell, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';

// Mock data for admin dashboard
const platformStats = {
  totalUsers: 12450,
  totalCreators: 8920,
  totalMarketers: 156,
  pendingMarketers: 23,
  totalProducts: 45680,
  flaggedProducts: 12,
  totalRevenue: 125000000, // in Naira
  monthlyGrowth: 18.5,
  activeDisputes: 3,
  pendingPayouts: 2450000
};

const revenueData = [
  { month: 'Jan', revenue: 8500000, users: 1200 },
  { month: 'Feb', revenue: 9200000, users: 1450 },
  { month: 'Mar', revenue: 8800000, users: 1380 },
  { month: 'Apr', revenue: 10500000, users: 1620 },
  { month: 'May', revenue: 11200000, users: 1780 },
  { month: 'Jun', revenue: 12800000, users: 1950 },
  { month: 'Jul', revenue: 14200000, users: 2100 },
  { month: 'Aug', revenue: 13800000, users: 2050 },
  { month: 'Sep', revenue: 15600000, users: 2300 },
  { month: 'Oct', revenue: 17200000, users: 2480 },
  { month: 'Nov', revenue: 18900000, users: 2650 },
  { month: 'Dec', revenue: 21500000, users: 2890 }
];

const categoryData = [
  { name: 'Courses', value: 35, revenue: 45000000, color: '#F97316' },
  { name: 'eBooks', value: 25, revenue: 32000000, color: '#8B5CF6' },
  { name: 'Templates', value: 20, revenue: 25000000, color: '#14B8A6' },
  { name: 'Music', value: 12, revenue: 15000000, color: '#F59E0B' },
  { name: 'Art', value: 8, revenue: 8000000, color: '#EF4444' }
];

const topSellers = [
  {
    id: '1',
    name: 'Adaora Okonkwo',
    email: 'adaora@example.com',
    products: 12,
    revenue: 2450000,
    rating: 4.9,
    country: 'Nigeria',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Kwame Asante',
    email: 'kwame@example.com',
    products: 8,
    revenue: 1890000,
    rating: 4.8,
    country: 'Ghana',
    status: 'active',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Fatima Hassan',
    email: 'fatima@example.com',
    products: 15,
    revenue: 1650000,
    rating: 4.7,
    country: 'Egypt',
    status: 'active',
    joinDate: '2023-03-10'
  }
];

const topMarketers = [
  {
    id: '1',
    name: 'Chidi Okoro',
    email: 'chidi@example.com',
    campaigns: 89,
    conversionRate: 23.5,
    revenue: 890000,
    rating: 4.9,
    status: 'approved',
    specialties: ['courses', 'ebooks']
  },
  {
    id: '2',
    name: 'Amina Al-Rashid',
    email: 'amina@example.com',
    campaigns: 67,
    conversionRate: 28.2,
    revenue: 750000,
    rating: 4.8,
    status: 'approved',
    specialties: ['art', 'templates']
  }
];

const pendingMarketers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Digital marketing expert with 5+ years experience...',
    experience: 'Worked with 100+ clients across Africa...',
    focusAreas: ['courses', 'software'],
    country: 'Kenya',
    appliedDate: '2024-01-15',
    website: 'https://johndoe.com',
    socialLinks: {
      linkedin: 'linkedin.com/in/johndoe',
      twitter: '@johndoe'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    bio: 'SMS and email marketing specialist...',
    experience: 'Helped creators increase sales by 300%...',
    focusAreas: ['ebooks', 'music'],
    country: 'South Africa',
    appliedDate: '2024-01-18',
    website: 'https://sarahmarketing.com',
    socialLinks: {
      linkedin: 'linkedin.com/in/sarahjohnson',
      twitter: '@sarahmarketing'
    }
  }
];

const flaggedProducts = [
  {
    id: '1',
    title: 'Suspicious Course Content',
    creator: 'Unknown User',
    reason: 'Copyright infringement',
    reportedBy: 'user@example.com',
    reportDate: '2024-01-20',
    status: 'pending',
    category: 'Courses'
  },
  {
    id: '2',
    title: 'Spam eBook',
    creator: 'Fake Creator',
    reason: 'Spam content',
    reportedBy: 'another@example.com',
    reportDate: '2024-01-19',
    status: 'under_review',
    category: 'eBooks'
  }
];

const disputes = [
  {
    id: '1',
    type: 'Payment Dispute',
    creator: 'Adaora Okonkwo',
    marketer: 'Chidi Okoro',
    amount: 45000,
    description: 'Disagreement over commission rate',
    status: 'open',
    createdDate: '2024-01-18',
    priority: 'high'
  },
  {
    id: '2',
    type: 'Product Quality',
    creator: 'Kwame Asante',
    customer: 'buyer@example.com',
    amount: 25000,
    description: 'Customer claims product is not as described',
    status: 'investigating',
    createdDate: '2024-01-17',
    priority: 'medium'
  }
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('12months');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleApproveMarketer = (marketerId: string) => {
    console.log('Approving marketer:', marketerId);
    // API call to approve marketer
  };

  const handleRejectMarketer = (marketerId: string) => {
    console.log('Rejecting marketer:', marketerId);
    // API call to reject marketer
  };

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId);
    // API call to suspend user
  };

  const handleResolveDispute = (disputeId: string, resolution: string) => {
    console.log('Resolving dispute:', disputeId, resolution);
    // API call to resolve dispute
  };

  const handleFlaggedProduct = (productId: string, action: string) => {
    console.log('Handling flagged product:', productId, action);
    // API call to handle flagged product
  };

  const StatCard = ({ title:any, value:a ny,  change: any, icon: Icon, color, currency = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {currency}{typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {change && (
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">{change}%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage the entire Dingle platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button variant="outline" className="border-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="marketers">Marketers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="disputes">Disputes</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={platformStats.totalUsers}
                  change={platformStats.monthlyGrowth}
                  icon={Users}
                  color="from-blue-500 to-cyan-500"
                />
                <StatCard
                  title="Total Revenue"
                  value={platformStats.totalRevenue}
                  change={platformStats.monthlyGrowth}
                  icon={DollarSign}
                  color="from-green-500 to-emerald-500"
                  currency="₦"
                />
                <StatCard
                  title="Active Products"
                  value={platformStats.totalProducts}
                  change={15.2}
                  icon={Package}
                  color="from-orange-500 to-red-500"
                />
                <StatCard
                  title="Pending Issues"
                  value={platformStats.flaggedProducts + platformStats.activeDisputes + platformStats.pendingMarketers}
                  icon={AlertTriangle}
                  color="from-purple-500 to-pink-500"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-green-500" />
                        Revenue Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: 'none', 
                              borderRadius: '8px', 
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                            }}
                            formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#10B981" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#revenueGradient)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Category Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-purple-500" />
                        Category Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Top Performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Sellers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="w-5 h-5 mr-2 text-orange-500" />
                        Top Sellers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topSellers.map((seller, index) => (
                          <div key={seller.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                {seller.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{seller.name}</h4>
                                <p className="text-sm text-gray-600">{seller.products} products • {seller.country}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">₦{seller.revenue.toLocaleString()}</div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                {seller.rating}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Top Marketers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="w-5 h-5 mr-2 text-purple-500" />
                        Top Marketers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topMarketers.map((marketer, index) => (
                          <div key={marketer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                {marketer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{marketer.name}</h4>
                                <p className="text-sm text-gray-600">{marketer.campaigns} campaigns • {marketer.conversionRate}% conversion</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-purple-600">₦{marketer.revenue.toLocaleString()}</div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                {marketer.rating}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex items-center space-x-3">
                        <Input placeholder="Search users..." className="w-64" />
                        <Select defaultValue="all">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="creators">Creators</SelectItem>
                            <SelectItem value="buyers">Buyers</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topSellers.map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{user.name}</h4>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary">{user.country}</Badge>
                                <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                  {user.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <UserX className="w-4 h-4 mr-1" />
                              Suspend
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Marketers Tab */}
            <TabsContent value="marketers" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Pending Marketer Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {pendingMarketers.map((marketer, index) => (
                        <div key={marketer.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{marketer.name}</h3>
                              <p className="text-gray-600">{marketer.email}</p>
                              <p className="text-sm text-gray-500">Applied: {marketer.appliedDate}</p>
                            </div>
                            <Badge variant="secondary">{marketer.country}</Badge>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Bio</h4>
                              <p className="text-gray-700 text-sm">{marketer.bio}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Experience</h4>
                              <p className="text-gray-700 text-sm">{marketer.experience}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Focus Areas</h4>
                              <div className="flex flex-wrap gap-2">
                                {marketer.focusAreas.map((area) => (
                                  <Badge key={area} variant="outline">{area}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Links</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Website: {marketer.website}</p>
                                <p>LinkedIn: {marketer.socialLinks.linkedin}</p>
                                <p>Twitter: {marketer.socialLinks.twitter}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleApproveMarketer(marketer.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleRejectMarketer(marketer.id)}
                              variant="outline" 
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Flagged Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {flaggedProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">{product.title}</h4>
                            <p className="text-sm text-gray-600">Creator: {product.creator}</p>
                            <p className="text-sm text-red-600">Reason: {product.reason}</p>
                            <p className="text-xs text-gray-500">Reported by: {product.reportedBy} on {product.reportDate}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={product.status === 'pending' ? 'secondary' : 'default'}>
                              {product.status.replace('_', ' ')}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Disputes Tab */}
            <TabsContent value="disputes" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Active Disputes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {disputes.map((dispute, index) => (
                        <div key={dispute.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{dispute.type}</h4>
                              <p className="text-sm text-gray-600">
                                {dispute.creator} vs {dispute.marketer || dispute.customer}
                              </p>
                              <p className="text-sm text-gray-500">Created: {dispute.createdDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={dispute.priority === 'high' ? 'destructive' : 'secondary'}>
                                {dispute.priority}
                              </Badge>
                              <Badge variant="outline">{dispute.status}</Badge>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{dispute.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-green-600">Amount: ₦{dispute.amount.toLocaleString()}</span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Details
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Resolve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Payouts Tab */}
            <TabsContent value="payouts" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Payout Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">₦{platformStats.pendingPayouts.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Pending Payouts</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">₦{(platformStats.totalRevenue * 0.8).toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Paid Out</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">156</div>
                        <div className="text-sm text-gray-600">Pending Requests</div>
                      </div>
                    </div>
                    
                    <div className="text-center py-8">
                      <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Payout Management System</h3>
                      <p className="text-gray-600 mb-4">
                        Detailed payout management interface will be implemented here
                      </p>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                        Process Payouts
                      </Button>
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