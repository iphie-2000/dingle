'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, Image, Video, FileText, Music, Archive, DollarSign, 
  Tag, Save, Eye, ArrowLeft, Plus, X, AlertCircle
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

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

const currencies = [
  { value: 'ngn', label: 'Nigerian Naira (₦)', symbol: '₦' },
  { value: 'ghs', label: 'Ghanaian Cedi (GH₵)', symbol: 'GH₵' },
  { value: 'kes', label: 'Kenyan Shilling (KSh)', symbol: 'KSh' },
  { value: 'zar', label: 'South African Rand (R)', symbol: 'R' }
];

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    currency: 'ngn',
    tags: [],
    limitStock: false,
    stockLimit: '',
    bonuses: [],
    buyerInstructions: '',
    seoKeywords: ''
  });

  const [files, setFiles] = useState({
    productFile: null,
    previewImage: null,
    previewVideo: null
  });

  const [currentTag, setCurrentTag] = useState('');
  const [currentBonus, setCurrentBonus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (type, file) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addBonus = () => {
    if (currentBonus.trim() && !formData.bonuses.includes(currentBonus.trim())) {
      setFormData(prev => ({
        ...prev,
        bonuses: [...prev.bonuses, currentBonus.trim()]
      }));
      setCurrentBonus('');
    }
  };

  const removeBonus = (bonusToRemove) => {
    setFormData(prev => ({
      ...prev,
      bonuses: prev.bonuses.filter(bonus => bonus !== bonusToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.description.trim()) newErrors.description = 'Product description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Please enter a valid price';
    if (!files.productFile) newErrors.productFile = 'Please upload your digital product file';
    if (!files.previewImage) newErrors.previewImage = 'Please upload a preview image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Product Data:', formData);
    console.log('Files:', files);
    
    setIsLoading(false);
    
    // Show success message or redirect
    alert('Product created successfully!');
  };

  const FileUploadArea = ({ type, accept, title, description, icon: Icon, file }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors duration-200">
      <input
        type="file"
        accept={accept}
        onChange={(e) => handleFileUpload(type, e.target.files[0])}
        className="hidden"
        id={`upload-${type}`}
      />
      <label htmlFor={`upload-${type}`} className="cursor-pointer">
        <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {file ? (
          <Badge className="bg-green-100 text-green-800">
            {file.name}
          </Badge>
        ) : (
          <Button type="button" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        )}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CreatorNavbar />
      <CreatorSidebar />
      
      <div className="pt-24 pb-12 ml-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-3xl font-bold gradient-text">Create New Product</h1>
                <p className="text-gray-600">Add your digital product to the marketplace</p>
              </div>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="files">Files & Media</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-orange-500" />
                        Product Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Product Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Product Title *
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter your product title"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className={`h-12 ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.title}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                          Product Description *
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your product in detail..."
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.description}
                          </p>
                        )}
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className={`h-12 ${errors.category ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center">
                                  <span className="mr-2">{category.icon}</span>
                                  {category.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.category}
                          </p>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Tags</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add a tag"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            className="flex-1"
                          />
                          <Button type="button" onClick={addTag} variant="outline">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="ml-2 hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Files & Media */}
              <TabsContent value="files" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Upload className="w-5 h-5 mr-2 text-purple-500" />
                        Upload Files
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Product File */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Digital Product File *</Label>
                        <FileUploadArea
                          type="productFile"
                          accept=".pdf,.mp3,.mp4,.zip,.rar,.doc,.docx,.ppt,.pptx"
                          title="Upload Your Product"
                          description="PDF, MP3, MP4, ZIP, DOC, PPT files supported"
                          icon={Archive}
                          file={files.productFile}
                        />
                        {errors.productFile && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.productFile}
                          </p>
                        )}
                      </div>

                      {/* Preview Image */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Preview Image *</Label>
                        <FileUploadArea
                          type="previewImage"
                          accept="image/*"
                          title="Upload Preview Image"
                          description="JPG, PNG, GIF files supported (Max 5MB)"
                          icon={Image}
                          file={files.previewImage}
                        />
                        {errors.previewImage && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.previewImage}
                          </p>
                        )}
                      </div>

                      {/* Preview Video (Optional) */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Preview Video (Optional)</Label>
                        <FileUploadArea
                          type="previewVideo"
                          accept="video/*"
                          title="Upload Preview Video"
                          description="MP4, MOV, AVI files supported (Max 50MB)"
                          icon={Video}
                          file={files.previewVideo}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Pricing & Stock */}
              <TabsContent value="pricing" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                        Pricing & Inventory
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Currency & Price */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Currency</Label>
                          <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                  {currency.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price" className="text-sm font-medium">Price *</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className={`h-12 ${errors.price ? 'border-red-500' : ''}`}
                          />
                          {errors.price && (
                            <p className="text-red-500 text-sm flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.price}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stock Limit */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="limitStock"
                            checked={formData.limitStock}
                            onCheckedChange={(checked) => handleInputChange('limitStock', checked)}
                          />
                          <Label htmlFor="limitStock" className="text-sm font-medium">
                            Limit stock quantity
                          </Label>
                        </div>
                        {formData.limitStock && (
                          <div className="space-y-2">
                            <Label htmlFor="stockLimit" className="text-sm font-medium">Stock Limit</Label>
                            <Input
                              id="stockLimit"
                              type="number"
                              placeholder="Enter stock limit"
                              value={formData.stockLimit}
                              onChange={(e) => handleInputChange('stockLimit', e.target.value)}
                              className="h-12"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Advanced Settings */}
              <TabsContent value="advanced" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Tag className="w-5 h-5 mr-2 text-teal-500" />
                        Advanced Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Bonuses */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Bonuses (Optional)</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add a bonus item"
                            value={currentBonus}
                            onChange={(e) => setCurrentBonus(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBonus())}
                            className="flex-1"
                          />
                          <Button type="button" onClick={addBonus} variant="outline">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        {formData.bonuses.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {formData.bonuses.map((bonus, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">{bonus}</span>
                                <button
                                  type="button"
                                  onClick={() => removeBonus(bonus)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* SEO Keywords */}
                      <div className="space-y-2">
                        <Label htmlFor="seoKeywords" className="text-sm font-medium">SEO Keywords</Label>
                        <Input
                          id="seoKeywords"
                          placeholder="Enter keywords separated by commas"
                          value={formData.seoKeywords}
                          onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                          className="h-12"
                        />
                        <p className="text-sm text-gray-500">
                          Help customers find your product with relevant keywords
                        </p>
                      </div>

                      {/* Buyer Instructions */}
                      <div className="space-y-2">
                        <Label htmlFor="buyerInstructions" className="text-sm font-medium">Buyer Instructions</Label>
                        <Textarea
                          id="buyerInstructions"
                          placeholder="Special instructions for buyers after purchase..."
                          value={formData.buyerInstructions}
                          onChange={(e) => handleInputChange('buyerInstructions', e.target.value)}
                          className="min-h-24"
                        />
                        <p className="text-sm text-gray-500">
                          Instructions that will be shown to buyers after purchase
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-end"
            >
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating Product...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Create Product
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}