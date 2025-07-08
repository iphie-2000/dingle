'use client';

import { useState } from 'react';

// Required for static export - generates all possible username paths at build time
export async function generateStaticParams() {
  // In a real app, this would fetch from your API/database
  // For now, we'll return the mock usernames that exist in the app
  return [
    { username: 'adaora-marketing' },
    { username: 'kwame-digital' },
    { username: 'fatima-social' },
    { username: 'chidi-growth' },
    { username: 'amina-content' },
    { username: 'tunde-ads' },
    { username: 'zara-email' },
    { username: 'omar-analytics' }
  ];
}
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Calendar, TrendingUp, Users, Award, MessageSquare, 
  ArrowLeft, CheckCircle, Target, BarChart, Globe, Mail, Phone, Plus
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock marketer data (in real app, this would come from API based on username)
const marketerData = {
  id: '1',
  username: 'adaora-marketing',
  name: 'Adaora Okonkwo',
  bio: 'Digital marketing specialist with 8+ years experience helping African creators scale their businesses. Expert in SMS and email marketing campaigns with a proven track record of increasing conversion rates by 200-400%.',
  country: 'Nigeria',
  city: 'Lagos',
  rating: 4.9,
  reviewCount: 127,
  campaignsCompleted: 89,
  conversionRate: 23.5,
  focusAreas: ['courses', 'ebooks', 'software'],
  avatar: 'AO',
  verified: true,
  joinedDate: '2023-01-15',
  successStories: 45,
  totalRevenue: 2450000,
  languages: ['English', 'Igbo', 'Yoruba'],
  socialLinks: {
    website: 'https://adoramarketing.com',
    linkedin: 'https://linkedin.com/in/adoraokonkwo',
    twitter: '@adoramarketing'
  },
  portfolio: [
    {
      title: 'Digital Course Launch Campaign',
      description: 'Helped a creator launch their digital marketing course, achieving 300% ROI in 30 days',
      results: '₦1.2M revenue generated',
      category: 'courses'
    },
    {
      title: 'eBook Marketing Strategy',
      description: 'Developed comprehensive marketing strategy for African entrepreneurship eBook',
      results: '5,000+ copies sold',
      category: 'ebooks'
    },
    {
      title: 'Software Tool Promotion',
      description: 'SMS and email campaign for productivity software targeting African professionals',
      results: '45% conversion rate',
      category: 'software'
    }
  ],
  testimonials: [
    {
      name: 'Chidi Okoro',
      role: 'Course Creator',
      content: 'Adaora transformed my business! Her SMS marketing strategy helped me reach customers I never thought possible. Revenue increased by 400% in just 2 months.',
      rating: 5,
      avatar: 'CO'
    },
    {
      name: 'Fatima Hassan',
      role: 'eBook Author',
      content: 'Professional, knowledgeable, and results-driven. Adaora understands the African market like no one else. Highly recommended!',
      rating: 5,
      avatar: 'FH'
    },
    {
      name: 'Kwame Asante',
      role: 'Software Developer',
      content: 'Working with Adaora was a game-changer. Her email campaigns had incredible open rates and conversions. Will definitely work with her again.',
      rating: 5,
      avatar: 'KA'
    }
  ]
};

const categories = [
  { value: 'courses', label: 'Online Courses', icon: '📚' },
  { value: 'ebooks', label: 'eBooks', icon: '📖' },
  { value: 'music', label: 'Music & Audio', icon: '🎵' },
  { value: 'templates', label: 'Templates', icon: '🎯' },
  { value: 'art', label: 'Digital Art', icon: '🎨' },
  { value: 'software', label: 'Software Tools', icon: '⚡' },
  { value: 'photography', label: 'Photography', icon: '📸' },
  { value: 'videos', label: 'Video Content', icon: '🎬' }
];

export default function MarketerProfile() {
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [hireFormData, setHireFormData] = useState({
    products: [{ title: '', commission: '15' }],
    message: '',
    budget: '',
    timeline: ''
  });

  // Mock user products
  const userProducts = [
    { id: '1', title: 'Digital Marketing Masterclass', price: 25000 },
    { id: '2', title: 'African Art Collection', price: 18000 },
    { id: '3', title: 'Business Templates Pack', price: 12000 },
    { id: '4', title: 'Afrobeat Production Kit', price: 15000 },
    { id: '5', title: 'Photography Course', price: 22000 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400 fill-current opacity-50' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleHireSubmit = (e) => {
    e.preventDefault();
    console.log('Hire request:', {
      marketer: marketerData,
      ...hireFormData
    });
    setIsHireDialogOpen(false);
    
    // Reset form
    setHireFormData({
      products: [{ title: '', commission: '15' }],
      message: '',
      budget: '',
      timeline: ''
    });
    
    // Show success alert
    alert(`🎉 Hire request sent successfully to ${marketerData.name}! They will review your request and get back to you soon.`);
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
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/marketers">
              <Button variant="outline" size="sm" className="border-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketers
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto">
                        {marketerData.avatar}
                      </div>
                      {marketerData.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {marketerData.name}
                    </h1>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{marketerData.city}, {marketerData.country}</span>
                    </div>

                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {renderStars(marketerData.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {marketerData.rating} ({marketerData.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {marketerData.focusAreas.map((area) => (
                        <Badge key={area} variant="secondary">
                          {categories.find(c => c.value === area)?.label || area}
                        </Badge>
                      ))}
                    </div>

                    <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Hire This Marketer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Hire {marketerData.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleHireSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label>Products to Market</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setHireFormData({
                                  ...hireFormData,
                                  products: [...hireFormData.products, { title: '', commission: '15' }]
                                })}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                              </Button>
                            </div>
                            
                            {hireFormData.products.map((product, index) => (
                              <div key={index} className="p-4 border rounded-lg space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label>Product {index + 1}</Label>
                                  {hireFormData.products.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setHireFormData({
                                        ...hireFormData,
                                        products: hireFormData.products.filter((_, i) => i !== index)
                                      })}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor={`product-${index}`}>Select Product</Label>
                                  <Select 
                                    value={product.title} 
                                    onValueChange={(value) => {
                                      const updatedProducts = [...hireFormData.products];
                                      updatedProducts[index].title = value;
                                      setHireFormData({...hireFormData, products: updatedProducts});
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose a product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {userProducts.map((prod) => (
                                        <SelectItem key={prod.id} value={prod.title}>
                                          {prod.title} - ₦{prod.price.toLocaleString()}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor={`commission-${index}`}>Commission Percentage</Label>
                                  <Select 
                                    value={product.commission} 
                                    onValueChange={(value) => {
                                      const updatedProducts = [...hireFormData.products];
                                      updatedProducts[index].commission = value;
                                      setHireFormData({...hireFormData, products: updatedProducts});
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">5%</SelectItem>
                                      <SelectItem value="10">10%</SelectItem>
                                      <SelectItem value="15">15%</SelectItem>
                                      <SelectItem value="20">20%</SelectItem>
                                      <SelectItem value="25">25%</SelectItem>
                                      <SelectItem value="30">30%</SelectItem>
                                      <SelectItem value="35">35%</SelectItem>
                                      <SelectItem value="40">40%</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget Range</Label>
                            <Input
                              id="budget"
                              placeholder="e.g., ₦50,000 - ₦100,000"
                              value={hireFormData.budget}
                              onChange={(e) => setHireFormData({...hireFormData, budget: e.target.value})}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="timeline">Timeline</Label>
                            <Input
                              id="timeline"
                              placeholder="e.g., 2 weeks, 1 month"
                              value={hireFormData.timeline}
                              onChange={(e) => setHireFormData({...hireFormData, timeline: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                              id="message"
                              placeholder="Tell the marketer about your project..."
                              value={hireFormData.message}
                              onChange={(e) => setHireFormData({...hireFormData, message: e.target.value})}
                              className="min-h-20"
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                            disabled={!hireFormData.products.some(p => p.title)}
                          >
                            Send Hire Request
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">Campaigns</span>
                      </div>
                      <span className="font-semibold">{marketerData.campaignsCompleted}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">Conversion Rate</span>
                      </div>
                      <span className="font-semibold text-green-600">{marketerData.conversionRate}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">Success Stories</span>
                      </div>
                      <span className="font-semibold">{marketerData.successStories}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Revenue Generated</span>
                      </div>
                      <span className="font-semibold">₦{marketerData.totalRevenue.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-teal-500" />
                        <span className="text-sm text-gray-600">Member Since</span>
                      </div>
                      <span className="font-semibold">
                        {new Date(marketerData.joinedDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact & Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <a 
                        href={marketerData.socialLinks.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Website
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <a 
                        href={marketerData.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-teal-500" />
                      <a 
                        href={`https://twitter.com/${marketerData.socialLinks.twitter.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:text-teal-700"
                      >
                        {marketerData.socialLinks.twitter}
                      </a>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-600 mb-2">Languages:</div>
                      <div className="flex flex-wrap gap-1">
                        {marketerData.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="mt-6">
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>About {marketerData.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Bio</h3>
                          <p className="text-gray-700 leading-relaxed">
                            {marketerData.bio}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise Areas</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {marketerData.focusAreas.map((area) => {
                              const category = categories.find(c => c.value === area);
                              return (
                                <div key={area} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <span className="text-2xl">{category?.icon}</span>
                                  <span className="font-medium text-gray-900">{category?.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Choose Me?</h3>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span className="text-gray-700">8+ years of digital marketing experience in African markets</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span className="text-gray-700">Proven track record of 200-400% conversion rate improvements</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span className="text-gray-700">Expert in SMS and email marketing campaigns</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span className="text-gray-700">Deep understanding of African consumer behavior</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="portfolio" className="mt-6">
                    <div className="space-y-6">
                      {marketerData.portfolio.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {project.title}
                                </h3>
                                <Badge variant="secondary">
                                  {categories.find(c => c.value === project.category)?.label}
                                </Badge>
                              </div>
                              <p className="text-gray-700 mb-4">
                                {project.description}
                              </p>
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-green-600">
                                  Results: {project.results}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-6">
                      {marketerData.testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-6">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                  {testimonial.avatar}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                                <div className="ml-auto flex items-center">
                                  {renderStars(testimonial.rating)}
                                </div>
                              </div>
                              <p className="text-gray-700 italic">
                                "{testimonial.content}"
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}