import Link from 'next/link';
import Image from 'next/image';

export default function BlogFooter() {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/mainLogo.png"
              alt="flowyBoard Logo"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </Link>
          <div className="flex space-x-6 text-sm text-gray-300">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <a 
              href="mailto:flowyboard@gmail.com" 
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} flowyBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 