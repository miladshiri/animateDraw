'use client';
import React from 'react';
import BlogFooter from '@/components/BlogFooter';
import BlogHeader from '@/components/BlogHeader';

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <BlogHeader />
      <main className="flex-grow">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
} 