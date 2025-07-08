
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, Search, Calendar, Eye, Edit, Trash2, MoreHorizontal,
  Mail, MessageSquare, Megaphone, TrendingUp, Users, ArrowUpRight,
  ArrowDownRight, Play, Pause, Square, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

const allCampaigns = [
  {
    id: '1',
    name: 'Product Launch Series',
    type: 'email',
    status: 'active',
    subject: 'Introducing Our New Digital Marketing Course',
    audience: 'All Subscribers',
    sent: 1250,
    openRate: 68,
    clickRate: 18,
    conversions: 45,
    revenue: 112500,
    createdDate: '2024-01-20',
    lastModified: '2024-01-22',
    description: 'Email series to promote new digital marketing course launch',
    targetAudience: 'Existing customers and newsletter subscribers',
    budget: 0,
    spent: 0
  },
  {
    id: '2',
    name: 'Flash Sale Alert',
    type: 'sms',
    status: 'completed',
    message: 'Flash Sale: 50% off all courses! Use code FLASH50. Valid for 24hrs only.',
    audience: 'VIP Customers',
    sent: 890,
    deliveryRate: 96,
    clickRate: 28,
    conversions: 89,
    revenue: 178000,
    createdDate: '2024-01-18',
    lastModified: '2024-01-19',
    description: 'SMS campaign for limited time flash sale',
    targetAudience: 'High-value customers',
    budget: 5000,
    spent: 4200
  },
  {
    id: '3',
    name: 'Course Promotion Campaign',
    type: 'sponsored',
    status: 'active',
    product: 'Complete Digital Marketing Course',
    audience: 'Interest-based',
    impressions: 45000,
    clicks: 1200,
    ctr: 2.7,
    conversions: 67,
    revenue: 167500,
    createdDate: '2024-01-15',
    lastModified: '2024-01-23',
    description: 'Sponsored ads to promote digital marketing course',
    targetAudience: 'Business owners and marketers',
    budget: 15000,
    spent: 8500
  },
  {
    id: '4',
    name: 'Welcome Series #1',
    type: 'email',
    status: 'draft',
    subject: 'Welcome to Your Digital Business Journey',
    audience: 'New Subscribers',
    sent: 0,
    openRate: 0,
    clickRate: 0,
    conversions: 0,
    revenue: 0,
    createdDate: '2024-01-23',
    lastModified: '2024-01-23',
    description: 'Welcome email for new subscribers',
    targetAudience: 'New email subscribers',
    budget: 0,
    spent: 0
  },
  {
    id: '5',
    name: 'Retargeting Campaign',
    type: 'sponsored',
    status: 'paused',
    product: 'African Art Collection',
    audience: 'Website Visitors',
    impressions: 23000,
    clicks: 580,
    ctr: 2.5,
    conversions: 23,
    revenue: 34500,
    createdDate: '2024-01-12',
    lastModified: '2024-01-20',
    description: 'Retargeting campaign for art collection',
    targetAudience: 'Previous website visitors',
    budget: 8000,
    spent: 3200
  },
  {
    id: '6',
    name: 'Course Reminder',
    type: 'sms',
    status: 'completed',
    message: 'Your Digital Marketing course starts tomorrow! Get ready to transform your business.',
    audience: 'Course Purchasers',
    sent: 456,
    deliveryRate: 94,
    clickRate: 15,
    conversions: 12,
    revenue: 0,
    createdDate: '2024-01-10',
    lastModified: '2024-01-11',
    description: 'Reminder SMS for course participants',
    targetAudience: 'Course purchasers',
    budget: 2000,
    spent: 1800
  }
];

const campaignStats = {
  total: allCampaigns.length,
  active: allCampaigns.filter(c => c.status === 'active').length,
  completed: allCampaigns.filter(c => c.status === 'completed').length,
  draft: allCampaigns.filter(c => c.status === 'draft').length,
  totalRevenue: allCampaigns.reduce((sum, c) => sum + c.revenue, 0),
  totalSpent: allCampaigns.reduce((sum, c) => sum + c.spent, 0)
};

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || campaign.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'performance':
        return b.revenue - a.revenue;
      default:
        return 0;
    }
  });

  const getCampaignIcon = (type) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'sponsored': return Megaphone;
      default: return Mail;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CampaignCard = ({ campaign }) => {
    const Icon = getCampaignIcon(campaign.type);
    
    return (
      <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">{campaign.name}</CardTitle>
                <p className="text-sm text-gray-600 capitalize">{campaign.type} Campaign</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedCampaign(campaign)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  {campaign.status === 'active' && (
                    <DropdownMenuItem>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </DropdownMenuItem>
                  )}
                  {campaign.status === 'paused' && (
                    <DropdownMenuItem>
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">{campaign.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {campaign.type === 'email' && (
                <>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.sent?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500">Sent</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.openRate || 0}%</p>
                    <p className="text-xs text-gray-500">Open Rate</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.clickRate || 0}%</p>
                    <p className="text-xs text-gray-500">Click Rate</p>
                  </div>
                </>
              )}
              
              {campaign.type === 'sms' && (
                <>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.sent?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500">Sent</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.deliveryRate || 0}%</p>
                    <p className="text-xs text-gray-500">Delivery</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.clickRate || 0}%</p>
                    <p className="text-xs text-gray-500">Click Rate</p>
                  </div>
                </>
              )}

              {campaign.type === 'sponsored' && (
                <>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.impressions?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500">Impressions</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.clicks?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500">Clicks</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{campaign.ctr || 0}%</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>
                </>
              )}
              
              <div>
                <p className="text-lg font-bold text-green-600">₦{campaign.revenue?.toLocaleString() || 0}</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Updated {campaign.lastModified}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedCampaign(campaign)}
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Campaigns</h1>
              <p className="text-gray-600">Manage and track all your marketing campaigns</p>
            </div>
            <Link href="/marketing">
              <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                Create New Campaign
              </Button>
            </Link>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{campaignStats.total}</p>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{campaignStats.active}</p>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₦{campaignStats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₦{campaignStats.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  <ArrowDownRight className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Campaign Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="sponsored">Sponsored Ads</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No campaigns found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Campaign Details Modal */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCampaign?.name}</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Campaign Type</p>
                  <p className="text-lg capitalize">{selectedCampaign.type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Status</p>
                  <Badge className={getStatusColor(selectedCampaign.status)}>
                    {selectedCampaign.status}
                  </Badge>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Revenue</p>
                  <p className="text-lg font-bold text-green-600">₦{selectedCampaign.revenue?.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedCampaign.type === 'email' && (
                    <>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{selectedCampaign.sent?.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Emails Sent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{selectedCampaign.openRate}%</p>
                        <p className="text-sm text-gray-600">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{selectedCampaign.clickRate}%</p>
                        <p className="text-sm text-gray-600">Click Rate</p>
                      </div>
                    </>
                  )}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedCampaign.conversions}</p>
                    <p className="text-sm text-gray-600">Conversions</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedCampaign.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Target Audience</h3>
                <p className="text-gray-600">{selectedCampaign.targetAudience}</p>
              </div>

              {selectedCampaign.budget > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Budget</h3>
                    <p className="text-gray-600">₦{selectedCampaign.budget?.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Spent</h3>
                    <p className="text-gray-600">₦{selectedCampaign.spent?.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
