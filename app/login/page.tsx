'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedLogo from '@/components/AnimatedLogo';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login attempt:', formData);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
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
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600">
                  Sign in to continue your digital journey
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
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
                  transition={{ duration: 0.6, delay: 0.5 }}
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
                      placeholder="Enter your password"
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

                {/* Forgot Password */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-right"
                >
                  <Link
                    href="#"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Sign In
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">New to Dingle?</span>
                  </div>
                </motion.div>

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-center"
                >
                  <Link href="/signup">
                    <Button
                      variant="outline"
                      className="w-full h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 font-semibold text-lg transition-all duration-300 hover:scale-105"
                    >
                      Create Account
                      <Sparkles className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </form>
            </CardContent>
          </Card>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            By signing in, you agree to our{' '}
            <Link href="#" className="text-orange-600 hover:text-orange-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-orange-600 hover:text-orange-700">
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Animated Background */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-purple-600 to-teal-600" />
        
        {/* Animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-md"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6">
              Welcome Back to Your Digital Empire
            </h2>
            <p className="text-xl text-orange-100 leading-relaxed">
              Continue building your digital business with powerful marketing tools, 
              expert guidance, and a community of successful African creators.
            </p>
            
            {/* Floating stats */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-200 mb-1">98%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-200 mb-1">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}