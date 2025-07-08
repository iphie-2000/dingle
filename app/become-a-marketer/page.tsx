'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Globe, MapPin, Star, TrendingUp, Target, 
  CheckCircle, ArrowLeft, Send, Award, Users, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 'Tunisia', 
  'Algeria', 'Uganda', 'Tanzania', 'Rwanda', 'Senegal', 'Ivory Coast', 
  'Cameroon', 'Ethiopia', 'Zimbabwe', 'Zambia', 'Botswana', 'Namibia', 'Mali'
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Earn Commission',
    description: 'Get paid for every successful campaign with competitive commission rates'
  },
  {
    icon: Users,
    title: 'Build Your Network',
    description: 'Connect with talented African creators and expand your professional network'
  },
  {
    icon: Award,
    title: 'Showcase Expertise',
    description: 'Build your reputation and showcase your marketing skills to potential clients'
  },
  {
    icon: Target,
    title: 'Flexible Work',
    description: 'Work on your own schedule and choose campaigns that match your expertise'
  }
];

export default function BecomeMarketer() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    experience: '',
    focusAreas: [],
    website: '',
    socialHandles: {
      twitter: '',
      linkedin: '',
      instagram: '',
      facebook: ''
    },
    country: '',
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleFocusArea = (category) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(category)
        ? prev.focusAreas.filter(area => area !== category)
        : [...prev.focusAreas, category]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience description is required';
    if (formData.focusAreas.length === 0) newErrors.focusAreas = 'Please select at least one focus area';
    if (!formData.country) newErrors.country = 'Please select your country';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Marketer Application:', formData);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        
        <div className="pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl p-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-3xl font-bold gradient-text mb-4"
              >
                Application Submitted!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-gray-600 text-lg mb-8"
              >
                Thank you for applying to become a Dingle marketer. Our team will review your application 
                and get back to you within 2-3 business days.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-4"
              >
                <p className="text-sm text-gray-500">
                  In the meantime, you can:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/marketplace">
                    <Button variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50">
                      Explore Marketplace
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Become a Dingle Marketer
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Join our network of expert marketers and help African creators grow their digital businesses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Why Join Our Network?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock opportunities to work with talented creators across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Apply to Join Our Network
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your marketing expertise and experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text text-center">
                  Marketer Application Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-purple-600" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country *
                      </Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className={`h-12 ${errors.country ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-red-500 text-sm">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                      Professional Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Professional Bio *
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself and your marketing background..."
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className={`min-h-32 ${errors.bio ? 'border-red-500' : ''}`}
                      />
                      {errors.bio && (
                        <p className="text-red-500 text-sm">{errors.bio}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium">
                        Marketing Experience *
                      </Label>
                      <Textarea
                        id="experience"
                        placeholder="Describe your marketing experience, campaigns you've run, results achieved..."
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className={`min-h-32 ${errors.experience ? 'border-red-500' : ''}`}
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm">{errors.experience}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Areas of Focus * (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {categories.map((category) => (
                          <motion.div
                            key={category.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              formData.focusAreas.includes(category.value)
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                            onClick={() => toggleFocusArea(category.value)}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-1">{category.icon}</div>
                              <div className="text-sm font-medium">{category.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {errors.focusAreas && (
                        <p className="text-red-500 text-sm">{errors.focusAreas}</p>
                      )}
                    </div>
                  </div>

                  {/* Online Presence */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-purple-600" />
                      Online Presence
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-sm font-medium">
                        Website/Portfolio (Optional)
                      </Label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="text-sm font-medium">
                          Twitter Handle
                        </Label>
                        <Input
                          id="twitter"
                          placeholder="@yourusername"
                          value={formData.socialHandles.twitter}
                          onChange={(e) => handleInputChange('socialHandles.twitter', e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-medium">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          placeholder="linkedin.com/in/yourprofile"
                          value={formData.socialHandles.linkedin}
                          onChange={(e) => handleInputChange('socialHandles.linkedin', e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram" className="text-sm font-medium">
                          Instagram Handle
                        </Label>
                        <Input
                          id="instagram"
                          placeholder="@yourusername"
                          value={formData.socialHandles.instagram}
                          onChange={(e) => handleInputChange('socialHandles.instagram', e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facebook" className="text-sm font-medium">
                          Facebook Page
                        </Label>
                        <Input
                          id="facebook"
                          placeholder="facebook.com/yourpage"
                          value={formData.socialHandles.facebook}
                          onChange={(e) => handleInputChange('socialHandles.facebook', e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <Label htmlFor="terms" className="text-gray-700 cursor-pointer">
                        I agree to the{' '}
                        <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                          Marketer Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                          Code of Conduct
                        </Link>
                      </Label>
                      {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Link href="/">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Submitting Application...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-4 h-4 mr-2" />
                          Submit Application
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}