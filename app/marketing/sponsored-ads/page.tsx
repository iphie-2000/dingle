'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Eye, MousePointer, TrendingUp, DollarSign, ArrowLeft, Plus, Calendar, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

const adStats = [
  { label: 'Active Campaigns', value: '12', icon: Megaphone, change: '+2 this month' },
  { label: 'Total Impressions', value: '125K', icon: Eye, change: '+18% from last month' },
  { label: 'Click-Through Rate', value: '2.6%', icon: MousePointer, change: '+0.3% improvement' },
  { label: 'Total Spend', value: '₦45K', icon: DollarSign, change: '+12% from last month' }
];

const recentCampaigns = [
  {
    id: '1',
    name: 'Digital Marketing Course Promo',
    product: 'Complete Digital Marketing Course',
    status: 'Active',
    budget: 15000,
    spent: 8500,
    impressions: 45000,
    clicks: 1200,
    ctr: 2.7,
    startDate: '2024-01-15',
    endDate: '2024-01-30'
  },
  {
    id: '2',
    name: 'Art Collection Campaign',
    product: 'African Art Digital Collection',
    status: 'Completed',
    budget: 10000,
    spent: 9800,
    impressions: 32000,
    clicks: 850,
    ctr: 2.4,
    startDate: '2024-01-10',
    endDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Business Templates Boost',
    product: 'Professional Business Templates',
    status: 'Paused',
    budget: 8000,
    spent: 3200,
    impressions: 18000,
    clicks: 450,
    ctr: 2.5,
    startDate: '2024-01-18',
    endDate: '2024-01-25'
  }
];

export default function SponsoredAds() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: '',
    product: '',
    budget: '',
    duration: '',
    targeting: '',
    description: ''
  });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    console.log('Creating ad campaign:', campaignData);
    setIsCreateDialogOpen(false);
    setCampaignData({
      name: '',
      product: '',
      budget: '',
      duration: '',
      targeting: '',
      description: ''
    });
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
            <div className="flex items-center space-x-4">
              <Link href="/marketing">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sponsored Ads</h1>
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Ad Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateCampaign} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campaign Name</Label>
                      <Input
                        placeholder="e.g., Course Launch Campaign"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Product to Promote</Label>
                      <Select value={campaignData.product} onValueChange={(value) => setCampaignData({...campaignData, product: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="course1">Digital Marketing Course</SelectItem>
                          <SelectItem value="ebook1">Business Strategy eBook</SelectItem>
                          <SelectItem value="template1">Website Templates Pack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Budget (₦)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 50000"
                        value={campaignData.budget}
                        onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select value={campaignData.duration} onValueChange={(value) => setCampaignData({...campaignData, duration: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select value={campaignData.targeting} onValueChange={(value) => setCampaignData({...campaignData, targeting: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select targeting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="interest">Interest-based</SelectItem>
                        <SelectItem value="demographic">Demographic</SelectItem>
                        <SelectItem value="behavior">Behavioral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ad Description</Label>
                    <Textarea
                      placeholder="Describe your ad campaign..."
                      value={campaignData.description}
                      onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                      className="min-h-24"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                      Create Campaign
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                      <p className="text-xs text-gray-600">{stat.change}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Campaigns List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Ad Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{campaign.product}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Budget: ₦{campaign.budget.toLocaleString()}</span>
                          <span>Spent: ₦{campaign.spent.toLocaleString()}</span>
                          <span>Impressions: {campaign.impressions.toLocaleString()}</span>
                          <span>CTR: {campaign.ctr}%</span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {campaign.startDate} - {campaign.endDate}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
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