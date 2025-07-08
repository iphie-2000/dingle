
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Building, Mail, Lock, ShoppingCart, Star, Eye, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  category: string;
  rating: number;
  reviewCount: number;
  downloads: number;
}

// Mock product data
const mockProduct: Product = {
  id: '1',
  title: 'Complete Digital Marketing Course',
  description: 'Master digital marketing with practical strategies for African businesses. Includes SMS, email, and social media marketing.',
  price: 15000,
  currency: '₦',
  creator: {
    name: 'Adaora Okonkwo',
    avatar: 'AO',
    verified: true
  },
  thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
  category: 'Courses',
  rating: 4.8,
  reviewCount: 234,
  downloads: 1250
};

const upsellProducts: Product[] = [
  {
    id: '2',
    title: 'Advanced Marketing Analytics',
    description: 'Deep dive into marketing analytics and data-driven decision making for African markets.',
    price: 8500,
    currency: '₦',
    creator: {
      name: 'Adaora Okonkwo',
      avatar: 'AO',
      verified: true
    },
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Courses',
    rating: 4.7,
    reviewCount: 156,
    downloads: 890
  },
  {
    id: '3',
    title: 'Email Marketing Mastery',
    description: 'Complete guide to email marketing with templates and automation strategies.',
    price: 5500,
    currency: '₦',
    creator: {
      name: 'Adaora Okonkwo',
      avatar: 'AO',
      verified: true
    },
    thumbnail: 'https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Courses',
    rating: 4.6,
    reviewCount: 98,
    downloads: 567
  }
];

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { items: cartItems, clearCart } = useCart();

  const toggleUpsell = (productId: string) => {
    setSelectedUpsells(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    let total = mockProduct.price;
    
    // Add cart items total
    if (cartItems.length > 0) {
      total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    // Add upsells
    selectedUpsells.forEach(id => {
      const product = upsellProducts.find(p => p.id === id);
      if (product) total += product.price;
    });
    return total;
  };

  const handleCheckout = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart after successful payment
    if (cartItems.length > 0) {
      clearCart();
    }
    
    alert('Payment successful! Check your email for the download links.');
    setLoading(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/marketplace">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Product Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <img
                        src={mockProduct.thumbnail}
                        alt={mockProduct.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{mockProduct.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{mockProduct.description}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {renderStars(mockProduct.rating)}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Badge className="bg-blue-100 text-blue-800">{mockProduct.category}</Badge>
                          <span className="text-2xl font-bold text-orange-600">
                            {mockProduct.currency}{mockProduct.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Information */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-900">Digital Delivery</h4>
                        <p className="text-sm text-blue-700">
                          Your purchase will be delivered to your email address immediately after successful payment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upsells */}
                <Card>
                  <CardHeader>
                    <CardTitle>More from {mockProduct.creator.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      Add these related products to your order and save!
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upsellProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          selectedUpsells.includes(product.id)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleUpsell(product.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            {selectedUpsells.includes(product.id) && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{product.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                {renderStars(product.rating)}
                                <span className="text-sm text-gray-600 ml-1">
                                  ({product.reviewCount})
                                </span>
                              </div>
                              <span className="font-bold text-orange-600">
                                {product.currency}{product.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="paystack" id="paystack" />
                          <Label htmlFor="paystack" className="flex items-center cursor-pointer">
                            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                            Paystack (Card, Bank Transfer, USSD)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="stripe" id="stripe" />
                          <Label htmlFor="stripe" className="flex items-center cursor-pointer">
                            <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                            Stripe (International Cards)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                            <CreditCard className="w-5 h-5 mr-2 text-blue-700" />
                            PayPal
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center cursor-pointer">
                            <Building className="w-5 h-5 mr-2 text-purple-600" />
                            Direct Bank Transfer
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Complete Your Purchase</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        We'll send your purchase to this email
                      </p>
                    </div>

                    <Separator />

                    {/* Order Total */}
                    <div className="space-y-3">
                      {cartItems.length > 0 ? (
                        cartItems.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.title} {item.quantity > 1 && `(×${item.quantity})`}</span>
                            <span>{item.currency}{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-between">
                          <span>{mockProduct.title}</span>
                          <span>{mockProduct.currency}{mockProduct.price.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {selectedUpsells.map(id => {
                        const product = upsellProducts.find(p => p.id === id);
                        return product ? (
                          <div key={id} className="flex justify-between text-sm">
                            <span>{product.title}</span>
                            <span>{product.currency}{product.price.toLocaleString()}</span>
                          </div>
                        ) : null;
                      })}

                      <Separator />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-orange-600">
                          {mockProduct.currency}{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <Lock className="w-4 h-4" />
                      <span>Secure checkout powered by industry-leading encryption</span>
                    </div>

                    {/* Checkout Button */}
                    <Button
                      onClick={handleCheckout}
                      disabled={loading || !email}
                      className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        `Complete Purchase - ${mockProduct.currency}${calculateTotal().toLocaleString()}`
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
