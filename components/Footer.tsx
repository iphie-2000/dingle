'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import AnimatedLogo from './AnimatedLogo';

const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/marketers', label: 'Marketers' },
    { href: '/marketing', label: 'Marketing' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#about', label: 'About Us' },
    { href: '#founders', label: 'Meet the Founders' },
    { href: '#explore', label: 'Explore' },
  ];

  const services = [
    'Digital Product Hosting',
    'SMS Marketing',
    'Email Marketing',
    'Expert Marketer Access',
    'Sponsored Ads',
    'Analytics & Insights',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-orange-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatedLogo />
            <p className="text-gray-300 leading-relaxed">
              Empowering African entrepreneurs to showcase, sell, and market their digital products 
              with cutting-edge tools and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/login" 
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Login
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/signup" 
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/become-a-marketer" 
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Become a Marketer
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-default"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-orange-400" />
                <span>hello@dingle.africa</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-purple-400" />
                <span>+234 800 DINGLE</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>Lagos, Nigeria</span>
              </motion.div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-3">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-purple-700 transition-all duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-white/10 bg-black/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Dingle. All rights reserved. Built for African entrepreneurs.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;