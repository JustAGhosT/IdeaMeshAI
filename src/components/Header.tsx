import React from 'react';
import { Sparkles, User, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentView: 'landing' | 'profile' | 'generator' | 'dashboard';
  onViewChange: (view: 'landing' | 'profile' | 'generator' | 'dashboard') => void;
  hasProfile: boolean;
  savedIdeasCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  hasProfile,
  savedIdeasCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      id: 'generator', 
      label: 'Generate Ideas', 
      icon: Sparkles,
      disabled: !hasProfile
    },
    { 
      id: 'dashboard', 
      label: `Saved Ideas${savedIdeasCount > 0 ? ` (${savedIdeasCount})` : ''}`, 
      icon: BookOpen,
      disabled: !hasProfile
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User,
      disabled: false
    }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onViewChange('landing')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              MeshAI
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                disabled={item.disabled}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${currentView === item.id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : item.disabled
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={item.disabled}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${currentView === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : item.disabled
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};