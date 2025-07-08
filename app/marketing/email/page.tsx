'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Send, Users, BarChart, Eye, MousePointer, TrendingUp, 
  ArrowLeft, Plus, Edit, Trash2, Calendar, Target, FileText
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
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: '1',
    subject: 'New Digital Marketing Course Available!',
    product: 'Complete Digital Marketing Course',
    sent: 1250,
    opened: 687,
    clicked: 156,
    conversions: 23,
    revenue: 345000,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    subject: 'Limited Time: 50% Off African Art Collection',
    product: 'African Art Collection',
    sent: 890,
    opened: 534,
    clicked: 89,
    conversions: 12,
    revenue: 180000,
    date: '2024-01-10',
    status: 'completed'
  },
  {
    id: '3',
    subject: 'Your Business Templates Are Ready!',
    product: 'Business Templates Pack',
    sent: 2100,
    opened: 1260,
    clicked: 234,
    conversions: 45,
    revenue: 540000,
    date: '2024-01-08',
    status: 'completed'
  }
];

const emailTemplates = [
  {
    id: '1',
    name: 'Product Launch',
    description: 'Perfect for announcing new digital products',
    preview: 'Exciting news! Our latest product is now available...'
  },
  {
    id: '2',
    name: 'Limited Offer',
    description: 'Create urgency with time-sensitive promotions',
    preview: 'Don\'t miss out! Limited time offer ending soon...'
  },
  {
    id: '3',
    name: 'Welcome Series',
    description: 'Onboard new customers with a warm welcome',
    preview: 'Welcome to our community! Here\'s what you can expect...'
  }
];

export default function EmailMarketing() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [campaignData, setCampaignData] = useState({
    subject: '',
    product: '',
    template: '',
    content: '',
    audience: 'all'
  });

  const stats = {
    totalSent: mockCampaigns.reduce((sum, campaign) => sum + campaign.sent, 0),
    totalOpened: mockCampaigns.reduce((sum, campaign) => sum + campaign.opened, 0),
    totalClicked: mockCampaigns.reduce((sum, campaign) => sum + campaign.clicked, 0),
    totalRevenue: mockCampaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
  };

  const openRate = ((stats.totalOpened / stats.totalSent) * 100).toFixed(1);
  const clickRate = ((stats.totalClicked / stats.totalOpened) * 100).toFixed(1);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    console.log('Creating campaign:', campaignData);
    setIsCreateDialogOpen(false);
    // Reset form
    setCampaignData({
      subject: '',
      product: '',
      template: '',
      content: '',
      audience: 'all'
    });
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
                <h1 className="text-3xl font-bold gradient-text">Email Marketing</h1>
                <p className="text-gray-600">Create and manage email campaigns to reach your customers</p>
              </div>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Email Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateCampaign} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter email subject"
                        value={campaignData.subject}
                        onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Select Product</Label>
                      <Select value={campaignData.product} onValueChange={(value) => setCampaignData({...campaignData, product: value})}>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Template</Label>
                    <Select value={campaignData.template} onValueChange={(value) => setCampaignData({...campaignData, template: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name} - {template.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your email content here..."
                      value={campaignData.content}
                      onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select value={campaignData.audience} onValueChange={(value) => setCampaignData({...campaignData, audience: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribers</SelectItem>
                        <SelectItem value="buyers">Previous Buyers</SelectItem>
                        <SelectItem value="engaged">Engaged Users</SelectItem>
                        <SelectItem value="new">New Subscribers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Campaign
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
              <TabsTrigger value="templates">Templates</TabsTrigger>
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
                          <p className="text-sm font-medium text-gray-600">Total Sent</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-blue-600" />
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
                          <p className="text-sm font-medium text-gray-600">Open Rate</p>
                          <p className="text-2xl font-bold text-green-600">{openRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                          <Eye className="w-6 h-6 text-green-600" />
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
                          <p className="text-sm font-medium text-gray-600">Click Rate</p>
                          <p className="text-2xl font-bold text-purple-600">{clickRate}%</p>
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
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Revenue</p>
                          <p className="text-2xl font-bold text-orange-600">₦{stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-500" />
                      How Email Marketing Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      Email marketing is one of the most effective ways to reach your customers directly. 
                      With our platform, you can create beautiful email campaigns, track performance, 
                      and convert subscribers into paying customers.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Create Campaign</h3>
                        <p className="text-sm text-gray-600">Choose a template and customize your message</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Target Audience</h3>
                        <p className="text-sm text-gray-600">Select who receives your email campaign</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BarChart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Track Results</h3>
                        <p className="text-sm text-gray-600">Monitor opens, clicks, and conversions</p>
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
                    <CardTitle>Campaign History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCampaigns.map((campaign, index) => (
                        <motion.div
                          key={campaign.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{campaign.subject}</h4>
                            <p className="text-sm text-gray-600">{campaign.product}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {campaign.date}
                              </span>
                              <Badge variant={campaign.status === 'completed' ? 'default' : 'secondary'}>
                                {campaign.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-gray-900">{campaign.sent}</div>
                              <div className="text-xs text-gray-500">Sent</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-600">
                                {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">Opened</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">Clicked</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-orange-600">
                                ₦{campaign.revenue.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">Revenue</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
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

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {emailTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{template.description}</p>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 italic">{template.preview}</p>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white">
                          Use Template
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
                      <BarChart className="w-5 h-5 mr-2 text-purple-500" />
                      Email Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
                      <p className="text-gray-600">
                        Advanced analytics with charts, conversion tracking, and detailed insights will be available soon.
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