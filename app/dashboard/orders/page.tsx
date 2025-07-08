
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Search, Filter, Calendar, Download, Eye, MoreVertical,
  TrendingUp, DollarSign, Package, Users, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    product: 'Complete Digital Marketing Course',
    customer: {
      name: 'Adaora Okonkwo',
      email: 'adaora@example.com',
      avatar: 'AO'
    },
    amount: 15000,
    currency: '₦',
    status: 'completed',
    paymentMethod: 'Card',
    orderDate: '2024-02-15T10:30:00Z',
    completedDate: '2024-02-15T10:31:00Z',
    downloadCount: 3,
    country: 'Nigeria'
  },
  {
    id: 'ORD-002',
    product: 'African Entrepreneurship Guide',
    customer: {
      name: 'Kwame Asante',
      email: 'kwame@example.com',
      avatar: 'KA'
    },
    amount: 8500,
    currency: '₦',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    orderDate: '2024-02-14T15:45:00Z',
    completedDate: '2024-02-14T16:00:00Z',
    downloadCount: 1,
    country: 'Ghana'
  },
  {
    id: 'ORD-003',
    product: 'Photography Masterclass',
    customer: {
      name: 'Fatima Al-Rashid',
      email: 'fatima@example.com',
      avatar: 'FA'
    },
    amount: 22000,
    currency: '₦',
    status: 'pending',
    paymentMethod: 'Card',
    orderDate: '2024-02-14T09:20:00Z',
    completedDate: null,
    downloadCount: 0,
    country: 'Nigeria'
  },
  {
    id: 'ORD-004',
    product: 'Business Templates Pack',
    customer: {
      name: 'Chidi Okoro',
      email: 'chidi@example.com',
      avatar: 'CO'
    },
    amount: 12000,
    currency: '₦',
    status: 'failed',
    paymentMethod: 'Card',
    orderDate: '2024-02-13T14:10:00Z',
    completedDate: null,
    downloadCount: 0,
    country: 'Nigeria'
  },
  {
    id: 'ORD-005',
    product: 'Complete Digital Marketing Course',
    customer: {
      name: 'Amina Hassan',
      email: 'amina@example.com',
      avatar: 'AH'
    },
    amount: 15000,
    currency: '₦',
    status: 'completed',
    paymentMethod: 'Mobile Money',
    orderDate: '2024-02-13T11:30:00Z',
    completedDate: '2024-02-13T11:32:00Z',
    downloadCount: 2,
    country: 'Kenya'
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders.filter(order => order.status === 'completed').reduce((sum, order) => sum + order.amount, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, currency = '' }) => (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {currency}{typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </CardContent>
    </Card>
  );

  const OrderDetailsModal = ({ order, onClose }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Order Details - {order.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {order.customer.avatar}
                </div>
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-gray-600">{order.customer.email}</div>
                </div>
              </div>
              <div>Country: {order.country}</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
            <div className="space-y-2 text-sm">
              <div>Status: {getStatusBadge(order.status)}</div>
              <div>Payment Method: {order.paymentMethod}</div>
              <div>Amount: {order.currency}{order.amount.toLocaleString()}</div>
              <div>Downloads: {order.downloadCount}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Product</h4>
          <div className="text-sm text-gray-600">{order.product}</div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
          <div className="space-y-2 text-sm">
            <div>Order Date: {new Date(order.orderDate).toLocaleString()}</div>
            {order.completedDate && (
              <div>Completed: {new Date(order.completedDate).toLocaleString()}</div>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );

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
            className="mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Orders</h1>
              <p className="text-gray-600">Track and manage your product orders.</p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Orders"
              value={totalOrders}
              icon={ShoppingBag}
              color="from-orange-500 to-red-500"
            />
            <StatCard
              title="Completed Orders"
              value={completedOrders}
              icon={CheckCircle}
              color="from-green-500 to-emerald-500"
            />
            <StatCard
              title="Pending Orders"
              value={pendingOrders}
              icon={Clock}
              color="from-yellow-500 to-orange-500"
            />
            <StatCard
              title="Total Revenue"
              value={totalRevenue}
              icon={DollarSign}
              color="from-teal-500 to-cyan-500"
              currency="₦"
            />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-orange-500" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {order.customer.avatar}
                            </div>
                            <div>
                              <div className="font-medium">{order.customer.name}</div>
                              <div className="text-sm text-gray-600">{order.customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium truncate">{order.product}</div>
                            <div className="text-sm text-gray-600">{order.downloadCount} downloads</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold">{order.currency}{order.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{order.paymentMethod}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-600">
                            {new Date(order.orderDate).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600">
                      {searchQuery || filterStatus !== 'all'
                        ? 'Try adjusting your filters or search query.'
                        : 'Orders will appear here when customers purchase your products.'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
