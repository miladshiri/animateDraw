'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CreateButton() {
  return (
    <div className="w-full flex justify-center py-4">
      <Link href="/">
        <motion.button
          className="px-6 py-3 rounded-full text-lg font-semibold relative overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)',
            backgroundSize: '200% 200%',
            color: 'white',
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
          Create Animation Free
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </Link>
    </div>
  );
} 