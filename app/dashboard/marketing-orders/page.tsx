
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Clock, CheckCircle, XCircle, AlertCircle, Eye, 
  Filter, Search, Calendar, DollarSign, Package, ArrowLeft,
  MessageSquare, Star, MapPin, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

interface MarketingOrder {
  id: string;
  marketer: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    rating: number;
    verified: boolean;
    country: string;
  };
  products: {
    title: string;
    commission: number;
  }[];
  message: string;
  budget: string;
  timeline: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed';
  submittedAt: string;
  respondedAt?: string;
  type: 'received' | 'sent';
}

// Mock data for marketing orders
const mockMarketingOrders: MarketingOrder[] = [
  {
    id: '1',
    marketer: {
      id: '1',
      name: 'Adaora Okonkwo',
      username: 'adaora-marketing',
      avatar: 'AO',
      rating: 4.9,
      verified: true,
      country: 'Nigeria'
    },
    products: [
      { title: 'Digital Marketing Masterclass', commission: 25 },
      { title: 'Business Templates Pack', commission: 15 }
    ],
    message: 'I would love to help promote your courses to my audience in Nigeria. I have extensive experience with educational content marketing.',
    budget: '₦50,000 - ₦100,000',
    timeline: '2 weeks',
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z',
    type: 'received'
  },
  {
    id: '2',
    marketer: {
      id: '2',
      name: 'Kwame Asante',
      username: 'kwame-growth',
      avatar: 'KA',
      rating: 4.8,
      verified: true,
      country: 'Ghana'
    },
    products: [
      { title: 'African Art Collection', commission: 30 }
    ],
    message: 'Your art collection aligns perfectly with my audience. I can create a comprehensive campaign across multiple channels.',
    budget: 'GH₵500 - GH₵1,000',
    timeline: '3 weeks',
    status: 'accepted',
    submittedAt: '2024-01-14T14:20:00Z',
    respondedAt: '2024-01-15T09:15:00Z',
    type: 'received'
  },
  {
    id: '3',
    marketer: {
      id: '3',
      name: 'Fatima Al-Rashid',
      username: 'fatima-digital',
      avatar: 'FA',
      rating: 4.7,
      verified: true,
      country: 'Egypt'
    },
    products: [
      { title: 'Photography Course', commission: 20 }
    ],
    message: 'I specialize in promoting creative courses and would love to market your photography content.',
    budget: '₦30,000 - ₦60,000',
    timeline: '1 month',
    status: 'in-progress',
    submittedAt: '2024-01-12T16:45:00Z',
    respondedAt: '2024-01-13T11:30:00Z',
    type: 'sent'
  },
  {
    id: '4',
    marketer: {
      id: '4',
      name: 'Chidi Okoro',
      username: 'chidi-conversion',
      avatar: 'CO',
      rating: 4.6,
      verified: false,
      country: 'Nigeria'
    },
    products: [
      { title: 'Afrobeat Production Kit', commission: 35 }
    ],
    message: 'I have a strong network in the music industry and can help promote your production kit effectively.',
    budget: '₦40,000 - ₦80,000',
    timeline: '2 weeks',
    status: 'rejected',
    submittedAt: '2024-01-10T12:00:00Z',
    respondedAt: '2024-01-11T08:45:00Z',
    type: 'received'
  },
  {
    id: '5',
    marketer: {
      id: '5',
      name: 'Amina Hassan',
      username: 'amina-creative',
      avatar: 'AH',
      rating: 4.8,
      verified: true,
      country: 'Kenya'
    },
    products: [
      { title: 'Digital Marketing Masterclass', commission: 22 },
      { title: 'Photography Course', commission: 18 }
    ],
    message: 'I would like to create a comprehensive marketing campaign for your creative courses targeting East African markets.',
    budget: '₦70,000 - ₦120,000',
    timeline: '4 weeks',
    status: 'completed',
    submittedAt: '2024-01-08T09:30:00Z',
    respondedAt: '2024-01-08T15:20:00Z',
    type: 'sent'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-purple-100 text-purple-800'
};

const statusIcons = {
  pending: Clock,
  accepted: CheckCircle,
  rejected: XCircle,
  'in-progress': AlertCircle,
  completed: CheckCircle
};

export default function MarketingOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<MarketingOrder | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const filteredOrders = useMemo(() => {
    let filtered = mockMarketingOrders;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.marketer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.products.some(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        order.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(order => order.type === typeFilter);
    }

    return filtered;
  }, [searchQuery, statusFilter, typeFilter]);

  const handleOrderAction = (orderId: string, action: 'accept' | 'reject', message?: string) => {
    console.log(`${action} order ${orderId}`, { message });
    // Here you would typically update the order status in your backend
    setIsDetailDialogOpen(false);
    setResponseMessage('');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const OrderCard = ({ order }: { order: MarketingOrder }) => {
    const StatusIcon = statusIcons[order.status];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {order.marketer.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.marketer.name}</h3>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{order.marketer.country}</span>
                      <div className="flex items-center">
                        {renderStars(order.marketer.rating)}
                        <span className="text-xs text-gray-500 ml-1">{order.marketer.rating}</span>
                      </div>
                      {order.marketer.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={statusColors[order.status]}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline">
                    {order.type === 'received' ? 'Received' : 'Sent'}
                  </Badge>
                </div>
              </div>

              {/* Products */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Products:</Label>
                <div className="mt-1 space-y-1">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-900">{product.title}</span>
                      <Badge variant="secondary">{product.commission}% commission</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Preview */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Message:</Label>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{order.message}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-700">Budget:</Label>
                  <p className="text-gray-900">{order.budget}</p>
                </div>
                <div>
                  <Label className="text-gray-700">Timeline:</Label>
                  <p className="text-gray-900">{order.timeline}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Submitted {new Date(order.submittedAt).toLocaleDateString()}
                  {order.respondedAt && (
                    <span> • Responded {new Date(order.respondedAt).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {order.status === 'pending' && order.type === 'received' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleOrderAction(order.id, 'reject')}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleOrderAction(order.id, 'accept')}
                      >
                        Accept
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const getOrderCounts = () => {
    return {
      all: mockMarketingOrders.length,
      pending: mockMarketingOrders.filter(o => o.status === 'pending').length,
      accepted: mockMarketingOrders.filter(o => o.status === 'accepted').length,
      rejected: mockMarketingOrders.filter(o => o.status === 'rejected').length,
      'in-progress': mockMarketingOrders.filter(o => o.status === 'in-progress').length,
      completed: mockMarketingOrders.filter(o => o.status === 'completed').length
    };
  };

  const counts = getOrderCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CreatorNavbar />
      <CreatorSidebar />
      
      <div className="pt-20 pb-12 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-gray-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Marketing Orders</h1>
                <p className="text-gray-600">Manage marketing collaboration requests</p>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search orders, marketers, or products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-2 border-gray-200"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 h-12 border-2 border-gray-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status ({counts.all})</SelectItem>
                    <SelectItem value="pending">Pending ({counts.pending})</SelectItem>
                    <SelectItem value="accepted">Accepted ({counts.accepted})</SelectItem>
                    <SelectItem value="rejected">Rejected ({counts.rejected})</SelectItem>
                    <SelectItem value="in-progress">In Progress ({counts['in-progress']})</SelectItem>
                    <SelectItem value="completed">Completed ({counts.completed})</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-48 h-12 border-2 border-gray-200">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Order Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Marketing Order Details</DialogTitle>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-6">
                  {/* Marketer Info */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedOrder.marketer.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedOrder.marketer.name}</h3>
                      <p className="text-gray-600">@{selectedOrder.marketer.username}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedOrder.marketer.country}</span>
                        <div className="flex items-center">
                          {renderStars(selectedOrder.marketer.rating)}
                          <span className="text-sm text-gray-500 ml-1">{selectedOrder.marketer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <Label className="text-lg font-semibold">Products to Market</Label>
                    <div className="mt-2 space-y-2">
                      {selectedOrder.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{product.title}</span>
                          <Badge variant="secondary">{product.commission}% commission</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label className="text-lg font-semibold">Message</Label>
                    <p className="mt-2 text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedOrder.message}</p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Budget</Label>
                      <p className="text-gray-700">{selectedOrder.budget}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Timeline</Label>
                      <p className="text-gray-700">{selectedOrder.timeline}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Status</Label>
                      <Badge className={statusColors[selectedOrder.status]}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <Label className="font-semibold">Type</Label>
                      <p className="text-gray-700">{selectedOrder.type === 'received' ? 'Received' : 'Sent'}</p>
                    </div>
                  </div>

                  {/* Actions for pending received orders */}
                  {selectedOrder.status === 'pending' && selectedOrder.type === 'received' && (
                    <div className="space-y-4 pt-4 border-t">
                      <Label className="text-lg font-semibold">Response</Label>
                      <Textarea
                        placeholder="Add a message with your response (optional)"
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        className="min-h-20"
                      />
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleOrderAction(selectedOrder.id, 'reject', responseMessage)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Order
                        </Button>
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleOrderAction(selectedOrder.id, 'accept', responseMessage)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Order
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
