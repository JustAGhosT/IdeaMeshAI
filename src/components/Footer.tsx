import React from 'react';
import { Heart, Code, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                MeshAI
              </span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              Eliminate "blank page" anxiety with AI-powered project ideas tailored to your skills and interests. 
              Join thousands of developers who've launched amazing projects.
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                Made with love for developers
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            © 2025 MeshAI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};