'use client';

import { motion } from 'framer-motion';

const ButterflyLogo = () => {
  return (
    <div className="relative">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Butterfly */}
        <motion.div
          className="relative w-12 h-12 cursor-pointer"
          animate={{
            y: [-2, -8, -2],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            rotate: 15,
            transition: { duration: 0.3 }
          }}
        >
          {/* Butterfly Body */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-1 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Left Wing */}
          <motion.div
            className="absolute top-2 left-1 w-4 h-6 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-full transform origin-bottom-right"
            animate={{
              rotate: [-15, -25, -15],
              scaleX: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              clipPath: 'ellipse(100% 100% at 80% 100%)'
            }}
          />
          
          {/* Right Wing */}
          <motion.div
            className="absolute top-2 right-1 w-4 h-6 bg-gradient-to-bl from-purple-400 via-pink-400 to-orange-400 rounded-full transform origin-bottom-left"
            animate={{
              rotate: [15, 25, 15],
              scaleX: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              clipPath: 'ellipse(100% 100% at 20% 100%)'
            }}
          />
          
          {/* Left Lower Wing */}
          <motion.div
            className="absolute top-5 left-0 w-3 h-4 bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 rounded-full transform origin-top-right"
            animate={{
              rotate: [-10, -20, -10],
              scaleY: [1, 0.9, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
            style={{
              clipPath: 'ellipse(100% 100% at 80% 0%)'
            }}
          />
          
          {/* Right Lower Wing */}
          <motion.div
            className="absolute top-5 right-0 w-3 h-4 bg-gradient-to-bl from-teal-400 via-emerald-400 to-green-400 rounded-full transform origin-top-left"
            animate={{
              rotate: [10, 20, 10],
              scaleY: [1, 0.9, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
            style={{
              clipPath: 'ellipse(100% 100% at 20% 0%)'
            }}
          />
          
          {/* Sparkle Effects */}
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full opacity-70"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-70"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1
            }}
          />
        </motion.div>
        
        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">
            Dingle
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ButterflyLogo;