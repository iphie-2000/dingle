'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Users, Megaphone, TrendingUp, Target, BarChart, Zap, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

const marketingTools = [
  {
    id: 'email',
    title: 'Email Marketing',
    description: 'Create powerful email campaigns with personalized messages and advanced analytics.',
    icon: Mail,
    color: 'from-blue-500 to-cyan-500',
    stats: { campaigns: 45, openRate: '58%', clicks: '2.1K' },
    href: '/marketing/email'
  },
  {
    id: 'sms',
    title: 'SMS Marketing',
    description: 'Reach customers instantly with high-converting SMS campaigns.',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-500',
    stats: { campaigns: 23, deliveryRate: '94%', clicks: '1.8K' },
    href: '/marketing/sms'
  },
  {
    id: 'marketers',
    title: 'Expert Marketers',
    description: 'Connect with verified marketing professionals to scale your business.',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    stats: { experts: 156, avgConversion: '45%', hired: 89 },
    href: '/marketing/hire'
  },
  {
    id: 'sponsored',
    title: 'Sponsored Ads',
    description: 'Promote your products across the Dingle platform with targeted ads.',
    icon: Megaphone,
    color: 'from-orange-500 to-red-500',
    stats: { campaigns: 12, impressions: '125K', ctr: '2.6%' },
    href: '/marketing/sponsored-ads'
  }
];

const marketingStats = [
  { label: 'Active Campaigns', value: '28', icon: TrendingUp, change: '+12%' },
  { label: 'Total Reach', value: '145K', icon: Target, change: '+18%' },
  { label: 'Conversion Rate', value: '24.5%', icon: BarChart, change: '+5.2%' },
  { label: 'Revenue Generated', value: '₦2.4M', icon: Zap, change: '+23%' }
];

const recentActivity = [
  {
    type: 'Email Campaign',
    name: 'Product Launch Series',
    status: 'Active',
    metric: '68% open rate',
    time: '2 hours ago'
  },
  {
    type: 'SMS Campaign',
    name: 'Flash Sale Alert',
    status: 'Completed',
    metric: '156 conversions',
    time: '1 day ago'
  },
  {
    type: 'Marketer Hire',
    name: 'Adaora Okonkwo',
    status: 'In Progress',
    metric: '3 products',
    time: '3 days ago'
  },
  {
    type: 'Sponsored Ad',
    name: 'Course Promotion',
    status: 'Active',
    metric: '2.8% CTR',
    time: '1 week ago'
  }
];

export default function MarketingOverview() {
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Hub</h1>
              <p className="text-gray-600">Manage your marketing campaigns and grow your business</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Marketing Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketingTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">{tool.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="grid grid-cols-3 gap-4 flex-1">
                        {Object.entries(tool.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-lg font-bold text-gray-900">{value}</p>
                            <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                          </div>
                        ))}
                      </div>
                      <Link href={tool.href}>
                        <Button variant="ghost" size="sm" className="group-hover:bg-gray-100">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                          <span className="font-medium text-gray-900">{activity.name}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            activity.status === 'Active' ? 'bg-green-100 text-green-800' :
                            activity.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activity.status}
                          </span>
                          <span>{activity.metric}</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
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