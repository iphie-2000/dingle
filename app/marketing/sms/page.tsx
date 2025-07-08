'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Send, Users, BarChart, CheckCircle, Clock, TrendingUp, 
  ArrowLeft, Plus, Edit, Trash2, Calendar, Smartphone, Globe
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
import Navbar from '@/components/Navbar';

// Mock data for SMS campaigns
const mockSMSCampaigns = [
  {
    id: '1',
    message: 'New course available! Get 30% off Digital Marketing Masterclass. Limited time offer. Link: dingle.africa/course',
    product: 'Digital Marketing Course',
    sent: 2500,
    delivered: 2456,
    clicked: 234,
    conversions: 45,
    revenue: 675000,
    date: '2024-01-15',
    status: 'completed',
    senderName: 'Dingle'
  },
  {
    id: '2',
    message: 'Flash sale! 50% off African Art Collection ends in 2 hours. Don\'t miss out! Get yours: dingle.africa/art',
    product: 'African Art Collection',
    sent: 1800,
    delivered: 1789,
    clicked: 156,
    conversions: 28,
    revenue: 420000,
    date: '2024-01-12',
    status: 'completed',
    senderName: 'ArtStore'
  },
  {
    id: '3',
    message: 'Your business templates are ready! Download now and start building your brand today. Link: dingle.africa/templates',
    product: 'Business Templates Pack',
    sent: 3200,
    delivered: 3156,
    clicked: 445,
    conversions: 89,
    revenue: 1068000,
    date: '2024-01-10',
    status: 'completed',
    senderName: 'Templates'
  }
];

const smsProviders = [
  { id: 'termii', name: 'Termii', description: 'Leading SMS provider in Nigeria', coverage: 'Nigeria, Ghana, Kenya' },
  { id: 'smartsms', name: 'SmartSMS Nigeria', description: 'Reliable SMS gateway', coverage: 'Nigeria' },
  { id: 'africas-talking', name: 'Africa\'s Talking', description: 'Pan-African SMS service', coverage: '20+ African countries' }
];

export default function SMSMarketing() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [smsData, setSmsData] = useState({
    message: '',
    product: '',
    senderName: '',
    audience: 'all',
    provider: 'termii'
  });

  const stats = {
    totalSent: mockSMSCampaigns.reduce((sum, campaign) => sum + campaign.sent, 0),
    totalDelivered: mockSMSCampaigns.reduce((sum, campaign) => sum + campaign.delivered, 0),
    totalClicked: mockSMSCampaigns.reduce((sum, campaign) => sum + campaign.clicked, 0),
    totalRevenue: mockSMSCampaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
  };

  const deliveryRate = ((stats.totalDelivered / stats.totalSent) * 100).toFixed(1);
  const clickRate = ((stats.totalClicked / stats.totalDelivered) * 100).toFixed(1);

  const handleCreateSMS = (e) => {
    e.preventDefault();
    console.log('Creating SMS campaign:', smsData);
    setIsCreateDialogOpen(false);
    // Reset form
    setSmsData({
      message: '',
      product: '',
      senderName: '',
      audience: 'all',
      provider: 'termii'
    });
  };

  const getCharacterCount = () => {
    return smsData.message.length;
  };

  const getSMSCount = () => {
    return Math.ceil(smsData.message.length / 160);
  };

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
                <h1 className="text-3xl font-bold gradient-text">SMS Marketing</h1>
                <p className="text-gray-600">Reach customers instantly with targeted SMS campaigns</p>
              </div>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create SMS Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create SMS Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSMS} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input
                        id="senderName"
                        placeholder="e.g., YourBrand (max 11 chars)"
                        value={smsData.senderName}
                        onChange={(e) => setSmsData({...smsData, senderName: e.target.value.slice(0, 11)})}
                        maxLength={11}
                        required
                      />
                      <p className="text-xs text-gray-500">{smsData.senderName.length}/11 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Select Product</Label>
                      <Select value={smsData.product} onValueChange={(value) => setSmsData({...smsData, product: value})}>
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
                    <Label htmlFor="message">SMS Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your SMS message here..."
                      value={smsData.message}
                      onChange={(e) => setSmsData({...smsData, message: e.target.value})}
                      className="min-h-24"
                      required
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{getCharacterCount()}/160 characters</span>
                      <span>{getSMSCount()} SMS{getSMSCount() > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select value={smsData.audience} onValueChange={(value) => setSmsData({...smsData, audience: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subscribers</SelectItem>
                          <SelectItem value="buyers">Previous Buyers</SelectItem>
                          <SelectItem value="engaged">Engaged Users</SelectItem>
                          <SelectItem value="location">By Location</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">SMS Provider</Label>
                      <Select value={smsData.provider} onValueChange={(value) => setSmsData({...smsData, provider: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {smsProviders.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send SMS Campaign
                    </Button>
                    <Button type="button" variant="outline" className="border-gray-300">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Test SMS
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
              <TabsTrigger value="providers">Providers</TabsTrigger>
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
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-green-600" />
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
                          <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                          <p className="text-2xl font-bold text-green-600">{deliveryRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
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
                          <Smartphone className="w-6 h-6 text-purple-600" />
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

              {/* Why SMS Marketing in Africa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-green-500" />
                      Why SMS Marketing Works in Africa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      SMS marketing is incredibly effective in Africa due to high mobile phone penetration 
                      and the widespread use of basic phones. With over 98% delivery rates and instant 
                      reach, SMS campaigns can drive immediate action from your customers.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">98% Open Rate</h3>
                        <p className="text-sm text-gray-600">SMS messages are read within minutes of delivery</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Wide Reach</h3>
                        <p className="text-sm text-gray-600">Reach customers with basic phones and smartphones</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Instant Delivery</h3>
                        <p className="text-sm text-gray-600">Messages delivered within seconds across Africa</p>
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
                    <CardTitle>SMS Campaign History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSMSCampaigns.map((campaign, index) => (
                        <motion.div
                          key={campaign.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">{campaign.senderName}</Badge>
                              <span className="text-sm text-gray-600">{campaign.product}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{campaign.message}</p>
                            <div className="flex items-center space-x-4">
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
                                {((campaign.delivered / campaign.sent) * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">Delivered</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {((campaign.clicked / campaign.delivered) * 100).toFixed(1)}%
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

            {/* Providers Tab */}
            <TabsContent value="providers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {smsProviders.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{provider.description}</p>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Coverage:</div>
                          <div className="text-sm text-gray-600">{provider.coverage}</div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                          Configure
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
                      <BarChart className="w-5 h-5 mr-2 text-green-500" />
                      SMS Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
                      <p className="text-gray-600">
                        Advanced analytics with delivery tracking, conversion analysis, and ROI calculations will be available soon.
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