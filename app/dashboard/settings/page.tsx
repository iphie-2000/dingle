
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Bell, Shield, CreditCard, Globe, Palette, 
  Save, Eye, EyeOff, Camera, Download, Trash2, Key,
  Building, MapPin, Phone, Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import CreatorNavbar from '@/components/CreatorNavbar';
import CreatorSidebar from '@/components/CreatorSidebar';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Adaora Okonkwo',
    email: 'adaora@example.com',
    phone: '+234 801 234 5678',
    bio: 'Digital marketing expert helping African businesses grow online.',
    location: 'Lagos, Nigeria',
    website: 'https://adaora.com',
    company: 'Marketing Pro Africa',
    avatar: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    orderNotifications: true,
    campaignUpdates: true,
    systemUpdates: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    passwordExpiry: '90days'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    defaultCurrency: 'NGN',
    taxRate: '7.5',
    payoutMethod: 'bank',
    bankAccount: '**** **** **** 1234',
    paypalEmail: '',
    autoWithdraw: false,
    minimumPayout: '10000'
  });

  const [platformSettings, setPlatformSettings] = useState({
    language: 'en',
    timezone: 'Africa/Lagos',
    theme: 'light',
    emailFrequency: 'weekly'
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    // API call to save profile
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notificationSettings);
    // API call to save notification settings
  };

  const handleSaveSecurity = () => {
    console.log('Saving security:', securitySettings);
    // API call to save security settings
  };

  const handleSavePayment = () => {
    console.log('Saving payment:', paymentSettings);
    // API call to save payment settings
  };

  const handleSavePlatform = () => {
    console.log('Saving platform:', platformSettings);
    // API call to save platform settings
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CreatorNavbar />
      <CreatorSidebar />

      <div className="ml-64 pt-20 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </motion.div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="platform">Platform</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        AO
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Change Avatar
                        </Button>
                        <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        placeholder="Tell us about yourself..."
                        className="min-h-24"
                      />
                    </div>

                    <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive important updates via SMS</p>
                        </div>
                        <Switch
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-500">Receive browser push notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Notifications</p>
                          <p className="text-sm text-gray-500">Get notified about new orders</p>
                        </div>
                        <Switch
                          checked={notificationSettings.orderNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderNotifications: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Campaign Updates</p>
                          <p className="text-sm text-gray-500">Marketing campaign performance updates</p>
                        </div>
                        <Switch
                          checked={notificationSettings.campaignUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, campaignUpdates: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-gray-500">Platform updates and maintenance notices</p>
                        </div>
                        <Switch
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Promotional emails and newsletters</p>
                        </div>
                        <Switch
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {securitySettings.twoFactorAuth && (
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          )}
                          <Switch
                            checked={securitySettings.twoFactorAuth}
                            onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Alerts</p>
                          <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                        </div>
                        <Switch
                          checked={securitySettings.loginAlerts}
                          onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginAlerts: checked})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Password Expiry</Label>
                        <Select 
                          value={securitySettings.passwordExpiry} 
                          onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: value})}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30days">30 Days</SelectItem>
                            <SelectItem value="90days">90 Days</SelectItem>
                            <SelectItem value="180days">180 Days</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Change Password</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label>Current Password</Label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>New Password</Label>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Confirm New Password</Label>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSaveSecurity} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Update Security
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      API Keys
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Production API Key</p>
                        <p className="text-sm text-gray-500 font-mono">dk_prod_**********************abcd</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Test API Key</p>
                        <p className="text-sm text-gray-500 font-mono">dk_test_**********************efgh</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Payment Settings */}
            <TabsContent value="payment">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment & Billing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Default Currency</Label>
                        <Select 
                          value={paymentSettings.defaultCurrency} 
                          onValueChange={(value) => setPaymentSettings({...paymentSettings, defaultCurrency: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                            <SelectItem value="GHS">Ghanaian Cedi (GH₵)</SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Tax Rate (%)</Label>
                        <Input
                          value={paymentSettings.taxRate}
                          onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: e.target.value})}
                          placeholder="7.5"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Payout Method</Label>
                        <Select 
                          value={paymentSettings.payoutMethod} 
                          onValueChange={(value) => setPaymentSettings({...paymentSettings, payoutMethod: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="paystack">Paystack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Minimum Payout (₦)</Label>
                        <Input
                          value={paymentSettings.minimumPayout}
                          onChange={(e) => setPaymentSettings({...paymentSettings, minimumPayout: e.target.value})}
                          placeholder="10000"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Bank Account Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Bank Name</Label>
                          <Input placeholder="First Bank of Nigeria" />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Number</Label>
                          <Input placeholder="1234567890" />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Name</Label>
                          <Input placeholder="Adaora Okonkwo" />
                        </div>
                        <div className="space-y-2">
                          <Label>Routing/Sort Code</Label>
                          <Input placeholder="011151003" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic Withdrawals</p>
                        <p className="text-sm text-gray-500">Automatically withdraw earnings when minimum is reached</p>
                      </div>
                      <Switch
                        checked={paymentSettings.autoWithdraw}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, autoWithdraw: checked})}
                      />
                    </div>

                    <Button onClick={handleSavePayment} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Payment Settings
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Platform Settings */}
            <TabsContent value="platform">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Platform Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select 
                          value={platformSettings.language} 
                          onValueChange={(value) => setPlatformSettings({...platformSettings, language: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ha">Hausa</SelectItem>
                            <SelectItem value="ig">Igbo</SelectItem>
                            <SelectItem value="yo">Yoruba</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select 
                          value={platformSettings.timezone} 
                          onValueChange={(value) => setPlatformSettings({...platformSettings, timezone: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Africa/Lagos">Lagos (WAT)</SelectItem>
                            <SelectItem value="Africa/Accra">Accra (GMT)</SelectItem>
                            <SelectItem value="Africa/Cairo">Cairo (EET)</SelectItem>
                            <SelectItem value="Africa/Johannesburg">Johannesburg (SAST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select 
                          value={platformSettings.theme} 
                          onValueChange={(value) => setPlatformSettings({...platformSettings, theme: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Email Summary Frequency</Label>
                        <Select 
                          value={platformSettings.emailFrequency} 
                          onValueChange={(value) => setPlatformSettings({...platformSettings, emailFrequency: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data & Privacy</h3>
                      
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Download Your Data
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>

                    <Button onClick={handleSavePlatform} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
