'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogHeader() {
  return (
    <header className="w-full bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/mainLogo.png"
            alt="flowyBoard Logo"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </Link>
        
        <Link href="/">
          <motion.button
            className="px-6 py-3 rounded-full text-lg font-semibold relative overflow-hidden flex flex-col items-center"
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)',
              backgroundSize: '200% 200%',
              color: '#f3f4f6',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              <span className="text-xl">Start Free Now</span>
            </div>
            <span className="text-sm opacity-90">Create Animations Fast</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </Link>
      </div>
    </header>
  );
} 