'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Package, DollarSign, TrendingUp, Users, Mail, MessageSquare, Smartphone, 
  Eye, Download, Star, Calendar, ArrowUpRight, ArrowDownRight, Plus,
  ShoppingCart, Activity, Target, Zap
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';

// Mock data for dashboard
const mockStats = {
  totalProducts: 12,
  totalSales: 847,
  totalRevenue: 2450000, // in Naira
  revenueGrowth: 23.5,
  salesGrowth: 18.2,
  productsGrowth: 15.8
};

const salesData = [
  { month: 'Jan', sales: 45, revenue: 180000 },
  { month: 'Feb', sales: 52, revenue: 220000 },
  { month: 'Mar', sales: 48, revenue: 195000 },
  { month: 'Apr', sales: 61, revenue: 280000 },
  { month: 'May', sales: 55, revenue: 245000 },
  { month: 'Jun', sales: 67, revenue: 320000 },
  { month: 'Jul', sales: 72, revenue: 385000 },
  { month: 'Aug', sales: 69, revenue: 365000 },
  { month: 'Sep', sales: 78, revenue: 420000 },
  { month: 'Oct', sales: 85, revenue: 485000 },
  { month: 'Nov', sales: 92, revenue: 520000 },
  { month: 'Dec', sales: 98, revenue: 580000 }
];

const categoryData = [
  { name: 'Courses', value: 35, color: '#F97316' },
  { name: 'eBooks', value: 25, color: '#8B5CF6' },
  { name: 'Templates', value: 20, color: '#14B8A6' },
  { name: 'Music', value: 12, color: '#F59E0B' },
  { name: 'Art', value: 8, color: '#EF4444' }
];

const recentOrders = [
  {
    id: '1',
    product: 'Digital Marketing Masterclass',
    customer: 'Adaora Okonkwo',
    amount: 25000,
    currency: '₦',
    status: 'completed',
    date: '2024-01-15',
    avatar: 'AO'
  },
  {
    id: '2',
    product: 'African Art Collection',
    customer: 'Kwame Asante',
    amount: 45,
    currency: 'GH₵',
    status: 'completed',
    date: '2024-01-14',
    avatar: 'KA'
  },
  {
    id: '3',
    product: 'Business Templates Pack',
    customer: 'Fatima Al-Rashid',
    amount: 18000,
    currency: '₦',
    status: 'pending',
    date: '2024-01-14',
    avatar: 'FA'
  },
  {
    id: '4',
    product: 'Afrobeat Production Kit',
    customer: 'Chidi Okoro',
    amount: 35,
    currency: 'GH₵',
    status: 'completed',
    date: '2024-01-13',
    avatar: 'CO'
  },
  {
    id: '5',
    product: 'Photography Course',
    customer: 'Amina Hassan',
    amount: 22000,
    currency: '₦',
    status: 'completed',
    date: '2024-01-13',
    avatar: 'AH'
  }
];

const marketingData = {
  email: {
    sent: 15420,
    opened: 8934,
    clicked: 2156,
    openRate: 58,
    clickRate: 14
  },
  sms: {
    sent: 8750,
    delivered: 8234,
    clicked: 1876,
    deliveryRate: 94,
    clickRate: 23
  },
  sponsoredAds: {
    impressions: 125000,
    clicks: 3250,
    conversions: 287,
    ctr: 2.6,
    conversionRate: 8.8
  }
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('12months');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color, currency = '' }) => (
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
          <div className="flex items-center text-sm">
            {change > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(change)}%
            </span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
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
            className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
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
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Creator Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your products.</p>
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
              value={mockStats.totalProducts}
              change={mockStats.productsGrowth}
              icon={Package}
              color="from-orange-500 to-red-500"
            />
            <StatCard
              title="Total Sales"
              value={mockStats.totalSales}
              change={mockStats.salesGrowth}
              icon={ShoppingCart}
              color="from-purple-500 to-pink-500"
            />
            <StatCard
              title="Total Revenue"
              value={mockStats.totalRevenue}
              change={mockStats.revenueGrowth}
              icon={DollarSign}
              color="from-teal-500 to-cyan-500"
              currency="₦"
            />
            <StatCard
              title="Growth Rate"
              value={`${mockStats.revenueGrowth}%`}
              change={mockStats.revenueGrowth}
              icon={TrendingUp}
              color="from-emerald-500 to-green-500"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="w-5 h-5 mr-2 text-orange-500" />
                    Sales Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
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
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#F97316" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#salesGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="w-5 h-5 mr-2 text-purple-500" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
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
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Category Distribution & Marketing Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-teal-500" />
                    Product Categories
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

            {/* Marketing Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-emerald-500" />
                    Marketing Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Marketing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="font-medium">Email Marketing</span>
                      </div>
                      <Badge variant="secondary">{marketingData.email.openRate}% open rate</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {marketingData.email.sent.toLocaleString()} sent • {marketingData.email.opened.toLocaleString()} opened • {marketingData.email.clicked.toLocaleString()} clicked
                    </div>
                  </div>

                  {/* SMS Marketing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
                        <span className="font-medium">SMS Marketing</span>
                      </div>
                      <Badge variant="secondary">{marketingData.sms.deliveryRate}% delivery rate</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {marketingData.sms.sent.toLocaleString()} sent • {marketingData.sms.delivered.toLocaleString()} delivered • {marketingData.sms.clicked.toLocaleString()} clicked
                    </div>
                  </div>

                  {/* Sponsored Ads */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="font-medium">Sponsored Ads</span>
                      </div>
                      <Badge variant="secondary">{marketingData.sponsoredAds.ctr}% CTR</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {marketingData.sponsoredAds.impressions.toLocaleString()} impressions • {marketingData.sponsoredAds.clicks.toLocaleString()} clicks • {marketingData.sponsoredAds.conversions} conversions
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-orange-500" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {order.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{order.product}</h4>
                          <p className="text-sm text-gray-600">by {order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {order.currency}{order.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={order.status === 'completed' ? 'default' : 'secondary'}
                            className={order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {order.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{order.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}