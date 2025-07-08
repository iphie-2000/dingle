'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedLogo from '@/components/AnimatedLogo';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Signup attempt:', formData);
    }
    
    setIsLoading(false);
  };

  const benefits = [
    "Free access to expert marketers",
    "Advanced SMS & email marketing tools",
    "Mobile app sponsored advertisements",
    "Real-time analytics and insights",
    "24/7 dedicated support",
    "Community of African creators"
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <Link href="/">
              <AnimatedLogo />
            </Link>
          </motion.div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold gradient-text mb-2">
                  Join Dingle Today
                </CardTitle>
                <p className="text-gray-600">
                  Start your digital business journey in minutes
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`pl-12 h-12 border-2 transition-all duration-300 ${
                        errors.fullName 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`pl-12 h-12 border-2 transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`pl-12 pr-12 h-12 border-2 transition-all duration-300 ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-orange-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`pl-12 pr-12 h-12 border-2 transition-all duration-300 ${
                        errors.confirmPassword 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-orange-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>

                {/* Terms Checkbox */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-start space-x-3"
                >
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeToTerms: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="text-gray-700 cursor-pointer">
                      I agree to the{' '}
                      <Link href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                        Privacy Policy
                      </Link>
                    </Label>
                    {errors.agreeToTerms && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.agreeToTerms}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Create Account
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </motion.div>

                {/* Login Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="text-center"
                >
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 font-semibold text-lg transition-all duration-300 hover:scale-105"
                    >
                      Sign In Instead
                      <Sparkles className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right Side - Benefits & Animated Background */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-600 to-orange-500" />
        
        {/* Animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, -80, -30],
                x: [-15, 15, -15],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-md"
          >
            <motion.div
              animate={{ 
                rotate: [0, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6 text-center">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-teal-100 leading-relaxed text-center mb-10">
              Join thousands of African creators building profitable digital businesses
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-200 mb-1">Free</div>
                <div className="text-sm text-white/80">Forever Plan</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-200 mb-1">5min</div>
                <div className="text-sm text-white/80">Setup Time</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}