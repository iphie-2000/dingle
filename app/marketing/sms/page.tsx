'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Users, TrendingUp, Smartphone, ArrowLeft, Plus, Calendar, MoreHorizontal } from 'lucide-react';
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

const smsStats = [
  { label: 'Total Campaigns', value: '18', icon: MessageSquare, change: '+2 this month' },
  { label: 'Messages Sent', value: '8.7K', icon: Send, change: '+15% from last month' },
  { label: 'Delivery Rate', value: '94.2%', icon: Smartphone, change: '+1.5% improvement' },
  { label: 'Click Rate', value: '23.1%', icon: TrendingUp, change: '+3.2% improvement' }
];

const recentCampaigns = [
  {
    id: '1',
    name: 'Flash Sale Alert',
    message: 'Flash Sale: 50% off all courses! Use code FLASH50. Valid for 24hrs only.',
    status: 'Completed',
    sent: 1250,
    deliveryRate: 96,
    clickRate: 28,
    sentDate: '2024-01-20',
    type: 'Promotion'
  },
  {
    id: '2',
    name: 'Course Reminder',
    message: 'Your Digital Marketing course starts tomorrow! Get ready to transform your business.',
    status: 'Completed',
    sent: 890,
    deliveryRate: 94,
    clickRate: 15,
    sentDate: '2024-01-18',
    type: 'Reminder'
  },
  {
    id: '3',
    name: 'Welcome Series #1',
    message: 'Welcome to Dingle! Start your digital business journey today.',
    status: 'Active',
    sent: 450,
    deliveryRate: 95,
    clickRate: 22,
    sentDate: '2024-01-15',
    type: 'Welcome'
  }
];

export default function SMSMarketing() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: '',
    message: '',
    audience: '',
    schedule: 'now'
  });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    console.log('Creating SMS campaign:', campaignData);
    setIsCreateDialogOpen(false);
    setCampaignData({
      name: '',
      message: '',
      audience: '',
      schedule: 'now'
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">SMS Marketing</h1>
                <p className="text-gray-600">Reach customers instantly with SMS campaigns</p>
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
                <form onSubmit={handleCreateCampaign} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campaign Name</Label>
                      <Input
                        placeholder="e.g., Flash Sale Alert"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Audience</Label>
                      <Select value={campaignData.audience} onValueChange={(value) => setCampaignData({...campaignData, audience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subscribers</SelectItem>
                          <SelectItem value="customers">Customers Only</SelectItem>
                          <SelectItem value="prospects">Prospects Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>SMS Message</Label>
                    <Textarea
                      placeholder="Write your SMS message (max 160 characters)..."
                      value={campaignData.message}
                      onChange={(e) => setCampaignData({...campaignData, message: e.target.value})}
                      maxLength={160}
                      className="min-h-24"
                      required
                    />
                    <div className="text-right text-sm text-gray-500">
                      {campaignData.message.length}/160 characters
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Select value={campaignData.schedule} onValueChange={(value) => setCampaignData({...campaignData, schedule: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Now</SelectItem>
                        <SelectItem value="later">Schedule for Later</SelectItem>
                        <SelectItem value="draft">Save as Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      Create Campaign
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {smsStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-green-600" />
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
                <CardTitle className="text-lg font-semibold text-gray-900">Recent SMS Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {campaign.type}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{campaign.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Sent: {campaign.sent.toLocaleString()}</span>
                          <span>Delivery: {campaign.deliveryRate}%</span>
                          <span>Click: {campaign.clickRate}%</span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {campaign.sentDate}
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