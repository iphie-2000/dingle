'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Megaphone, 
  Settings, 
  Package, 
  ShoppingBag, 
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Users,
  BriefcaseBusiness,
  Target,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const CreatorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMarketingDropdownOpen, setIsMarketingDropdownOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
      color: 'text-blue-600'
    },
    {
      icon: Megaphone,
      label: 'Marketing',
      href: '/marketing',
      color: 'text-purple-600',
      hasDropdown: true,
      subItems: [
        {
          icon: Target,
          label: 'Campaigns',
          href: '/dashboard/campaigns',
          color: 'text-purple-500'
        },
        {
          icon: UserCheck,
          label: 'Experts',
          href: '/marketing/hire',
          color: 'text-blue-500'
        }
      ]
    },
    {
      icon: Package,
      label: 'Products',
      href: '/dashboard/products',
      color: 'text-green-600'
    },
    {
      icon: ShoppingBag,
      label: 'Orders',
      href: '/dashboard/orders',
      color: 'text-orange-600'
    },
    {
      icon: ClipboardList,
      label: 'Order Management',
      href: '/dashboard/order-management',
      color: 'text-teal-600'
    },
    {
      icon: Users,
      label: 'Marketing Orders',
      href: '/dashboard/marketing-orders',
      color: 'text-indigo-600'
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
      color: 'text-gray-600'
    }
  ];

  const isActiveRoute = (href: string, subItems?: any[]) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/dashboard/create';
    }
    if (subItems) {
      return pathname.startsWith(href) || subItems.some(subItem => pathname.startsWith(subItem.href));
    }
    return pathname.startsWith(href);
  };

  return (
    <TooltipProvider>
      <motion.div
        className={`fixed left-0 top-0 h-full z-40 bg-white border-r border-gray-200 shadow-sm ${
          isCollapsed ? 'w-16' : 'w-64'
        } transition-all duration-300`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 h-20 flex items-center">
          <div className="flex items-center justify-between w-full">
            {!isCollapsed && (
              <motion.h2
                className="text-lg font-bold gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Creator Hub
              </motion.h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 pt-6">
          {sidebarItems.map((item, index) => {
            const isActive = isActiveRoute(item.href, item.subItems);
            const hasDropdown = item.hasDropdown && !isCollapsed;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-3"
              >
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <motion.div
                          className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : hasDropdown ? (
                  <div>
                    <motion.div
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMarketingDropdownOpen(!isMarketingDropdownOpen)}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isMarketingDropdownOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.div>
                    
                    <AnimatePresence>
                      {isMarketingDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-2 space-y-2"
                        >
                          {item.subItems?.map((subItem) => {
                            const isSubActive = pathname.startsWith(subItem.href);
                            return (
                              <Link key={subItem.href} href={subItem.href}>
                                <motion.div
                                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                                    isSubActive
                                      ? 'bg-orange-100 text-orange-600 border-l-2 border-orange-500'
                                      : 'hover:bg-gray-50 text-gray-600'
                                  }`}
                                  whileHover={{ x: 2 }}
                                >
                                  <subItem.icon className="w-4 h-4" />
                                  <span className="text-sm font-medium">{subItem.label}</span>
                                </motion.div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.href}>
                    <motion.div
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-xs text-gray-500 text-center">
              Creator Module v2.0
            </div>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default CreatorSidebar;