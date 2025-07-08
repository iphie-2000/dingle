'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Users, Megaphone, TrendingUp, Target, BarChart, Zap } from 'lucide-react';
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
    description: 'Create powerful email campaigns to reach your customers directly in their inbox with personalized messages.',
    icon: Mail,
    color: 'from-blue-500 to-cyan-500',
    features: ['Campaign Builder', 'Email Templates', 'Analytics & Reports', 'Automation'],
    stats: { reach: '95%', conversion: '18%', cost: 'Low' },
    href: '/marketing/email'
  },
  {
    id: 'sms',
    title: 'SMS Marketing',
    description: 'Reach customers instantly with SMS campaigns. Perfect for African markets with high mobile penetration.',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-500',
    features: ['Instant Delivery', 'High Open Rates', 'Local Numbers', 'Bulk Messaging'],
    stats: { reach: '98%', conversion: '25%', cost: 'Medium' },
    href: '/marketing/sms'
  },
  {
    id: 'marketers',
    title: 'Hire Expert Marketers',
    description: 'Connect with professional marketers who understand African markets and can scale your business.',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    features: ['Verified Experts', 'Performance Tracking', 'Custom Commissions', 'Dedicated Support'],
    stats: { reach: '300%', conversion: '45%', cost: 'Variable' },
    href: '/marketing/hire'
  },
  {
    id: 'sponsored',
    title: 'Sponsored Ads',
    description: 'Promote your products with targeted ads across the Dingle platform and mobile app.',
    icon: Megaphone,
    color: 'from-orange-500 to-red-500',
    features: ['Platform Integration', 'Audience Targeting', 'Real-time Analytics', 'Budget Control'],
    stats: { reach: '500%', conversion: '35%', cost: 'High' },
    href: '/marketing/sponsored-ads'
  }
];

const successStories = [
  {
    name: 'Adaora Okonkwo',
    product: 'Digital Marketing Course',
    strategy: 'Email + SMS',
    result: '400% increase in sales',
    avatar: 'AO'
  },
  {
    name: 'Kwame Asante',
    product: 'African Art Collection',
    strategy: 'Expert Marketer',
    result: '250% revenue growth',
    avatar: 'KA'
  },
  {
    name: 'Fatima Hassan',
    product: 'Business Templates',
    strategy: 'Sponsored Ads',
    result: '180% more visibility',
    avatar: 'FH'
  }
];

const marketingStats = [
  { label: 'Active Campaigns', value: '2,450+', icon: TrendingUp },
  { label: 'Messages Sent', value: '1.2M+', icon: MessageSquare },
  { label: 'Conversion Rate', value: '28%', icon: Target },
  { label: 'Revenue Generated', value: '₦45M+', icon: BarChart }
];

export default function MarketingOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CreatorNavbar />
      <CreatorSidebar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 ml-20 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Marketing Strategies
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Powerful tools to grow your digital business across Africa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marketingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Choose Your Marketing Strategy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect marketing tool for your digital products and start growing your business today
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketingTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Avg. Conversion</div>
                        <div className="text-2xl font-bold text-green-600">{tool.stats.conversion}</div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{tool.stats.reach}</div>
                        <div className="text-xs text-gray-500">Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{tool.stats.conversion}</div>
                        <div className="text-xs text-gray-500">Conversion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{tool.stats.cost}</div>
                        <div className="text-xs text-gray-500">Cost</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={tool.href}>
                      <Button className={`w-full bg-gradient-to-r ${tool.color} hover:shadow-lg transition-all duration-300 hover:scale-105 text-white font-semibold`}>
                        <Zap className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how African creators are growing their businesses with our marketing tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {story.avatar}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {story.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-3">
                      {story.product}
                    </p>
                    
                    <Badge variant="secondary" className="mb-4">
                      {story.strategy}
                    </Badge>
                    
                    <div className="text-2xl font-bold text-green-600">
                      {story.result}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Scale Your Business?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of African creators who are already using our marketing tools to grow their digital businesses
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/dashboard/create">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Create Your First Product
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}