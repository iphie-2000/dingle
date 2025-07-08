'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, Globe, Smartphone, Mail, MessageSquare, TrendingUp, Award, CheckCircle, Quote, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRef } from 'react';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const stats = [
    { number: "10K+", label: "Active Creators", icon: Users },
    { number: "50K+", label: "Digital Products", icon: Globe },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Expert Support", icon: Award },
  ];

  const features = [
    {
      icon: Globe,
      title: "Host Your Products",
      description: "Upload, showcase, and manage your digital products with our intuitive platform designed for African creators.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: MessageSquare,
      title: "SMS Marketing",
      description: "Reach your audience instantly with targeted SMS campaigns that convert browsers into buyers.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Build lasting relationships with automated email sequences and personalized campaigns.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Expert Marketers",
      description: "Connect with experienced marketing professionals who understand the African digital landscape.",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: Smartphone,
      title: "Mobile App Ads",
      description: "Exclusive sponsored advertising opportunities through our dedicated mobile application.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Growth",
      description: "Track your performance and optimize your strategy with comprehensive analytics and insights.",
      color: "from-indigo-500 to-blue-500"
    },
  ];

  const testimonials = [
    {
      name: "Amara Okafor",
      role: "Digital Artist",
      location: "Lagos, Nigeria",
      content: "Dingle transformed my art business! The SMS marketing feature helped me reach customers I never thought possible. My sales increased by 300% in just 3 months.",
      avatar: "AO",
      rating: 5
    },
    {
      name: "Kwame Asante",
      role: "Online Course Creator",
      location: "Accra, Ghana",
      content: "The expert marketer program connected me with professionals who understood my target audience. The strategies they provided were game-changing for my course sales.",
      avatar: "KA",
      rating: 5
    },
    {
      name: "Fatima Al-Rashid",
      role: "E-book Author",
      location: "Cairo, Egypt",
      content: "I love how easy it is to manage my digital products. The email marketing automation has saved me countless hours while boosting my revenue significantly.",
      avatar: "FA",
      rating: 5
    },
  ];

  const founders = [
    {
      name: "Chidi Okwuosa",
      role: "CEO & Co-Founder",
      bio: "Former tech executive with 15+ years in digital marketing across Africa. Passionate about empowering local entrepreneurs.",
      image: "CO",
      expertise: "Strategic Leadership"
    },
    {
      name: "Aisha Mustapha",
      role: "CTO & Co-Founder",
      bio: "Software engineer and digital innovation expert. Built scalable platforms serving millions across emerging markets.",
      image: "AM",
      expertise: "Technology & Innovation"
    },
    {
      name: "Kofi Mensah",
      role: "CMO & Co-Founder",
      bio: "Marketing strategist who has helped 1000+ African businesses grow their digital presence and increase revenue.",
      image: "KM",
      expertise: "Marketing & Growth"
    }
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Create Your Account",
      description: "Sign up for free and set up your creator profile in minutes. No hidden fees, no commitments.",
      icon: Users
    },
    {
      step: "02", 
      title: "Upload Your Products",
      description: "Add your digital products with rich descriptions, images, and pricing. Our platform supports all formats.",
      icon: Globe
    },
    {
      step: "03",
      title: "Connect with Marketers",
      description: "Get matched with expert marketers who specialize in your niche and understand African markets.",
      icon: MessageSquare
    },
    {
      step: "04",
      title: "Launch & Grow",
      description: "Use our SMS, email, and mobile ad tools to reach your audience and scale your business.",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-orange-600 via-purple-700 to-teal-800 opacity-90" />
          {/* Video would go here */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Animated Background Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-10"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Empower Your
              <span className="block bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent">
                Digital Dreams
              </span>
              Across Africa
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Host, sell, and market your digital products with expert guidance, 
              SMS campaigns, email automation, and exclusive mobile advertising.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  Start Creating
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </Link>
              
              <motion.button
                className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 text-orange-300 mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and begin growing your digital business with our proven 4-step process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="mt-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector Line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-purple-300 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Tools for African Creators
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to succeed in the digital economy, designed specifically for African entrepreneurs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from African creators who transformed their digital businesses with Dingle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <Quote className="w-8 h-8 text-purple-300 mb-4" />
                    
                    <p className="text-gray-700 leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About Dingle
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Dingle was born from a simple vision: to democratize digital entrepreneurship across Africa. 
                  We recognized that talented creators across the continent had incredible digital products but 
                  lacked the marketing tools and expertise to reach their full potential.
                </p>
                <p className="text-lg">
                  Our platform bridges this gap by providing not just hosting and selling capabilities, but a 
                  comprehensive ecosystem that includes expert marketing guidance, advanced SMS and email 
                  campaigns, and exclusive mobile advertising opportunities.
                </p>
                <p className="text-lg">
                  Today, we're proud to support over 10,000 African creators in building sustainable digital 
                  businesses that serve their communities and contribute to Africa's growing digital economy.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">2021</div>
                  <div className="text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">54</div>
                  <div className="text-gray-400">Countries Served</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Image placeholder */}
              <div className="aspect-square bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <Globe className="w-20 h-20 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Connecting Africa</h3>
                  <p className="text-orange-200">Through Digital Innovation</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white"
                animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Users className="w-8 h-8" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white"
                animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingUp className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section id="founders" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Meet the Founders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate African entrepreneurs dedicated to empowering the next generation of digital creators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                    {founder.image}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {founder.name}
                </h3>
                <p className="text-orange-600 font-semibold mb-2">
                  {founder.role}
                </p>
                <p className="text-purple-600 text-sm font-medium mb-4">
                  {founder.expertise}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-20 bg-gradient-to-br from-teal-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Digital Products
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Discover amazing digital products created by talented African entrepreneurs across various categories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Digital Art", count: "2.5K+", icon: "🎨" },
              { category: "Online Courses", count: "1.8K+", icon: "📚" },
              { category: "E-books", count: "3.2K+", icon: "📖" },
              { category: "Software Tools", count: "890+", icon: "⚡" },
              { category: "Music & Audio", count: "1.5K+", icon: "🎵" },
              { category: "Photography", count: "2.1K+", icon: "📸" },
              { category: "Templates", count: "4.3K+", icon: "🎯" },
              { category: "Mobile Apps", count: "650+", icon: "📱" },
            ].map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center cursor-pointer group hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.category}
                </h3>
                <p className="text-teal-200 text-lg font-medium">
                  {category.count} Products
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-white text-teal-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Browse All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of African creators who are already building successful digital businesses with Dingle.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-orange-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">
                Start Your Digital Journey Today
              </h3>
              <p className="text-xl text-orange-100 mb-8">
                No setup fees. No hidden costs. Just pure potential waiting to be unleashed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/signup" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105"
                >
                  Schedule Demo
                </Button>
              </div>
              
              <p className="text-orange-200 mt-6 text-sm">
                ✨ Get started in under 5 minutes • No credit card required
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}