import React, { useState } from 'react';
import { BookOpen, Heart, Trash2, Share2, Download, Search, Filter, Clock, Code, Star } from 'lucide-react';
import { SavedIdea, UserProfile } from '../types';

interface DashboardProps {
  savedIdeas: SavedIdea[];
  onRemoveIdea: (id: string) => void;
  userProfile: UserProfile | null;
}

export const Dashboard: React.FC<DashboardProps> = ({
  savedIdeas,
  onRemoveIdea,
  userProfile
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredIdeas = savedIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !filterDifficulty || idea.difficulty === filterDifficulty;
    const matchesCategory = !filterCategory || idea.category === filterCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleShare = async (idea: SavedIdea) => {
    try {
      await navigator.share({
        title: idea.title,
        text: `Check out this project idea: ${idea.description}`,
        url: window.location.href
      });
    } catch (error) {
      navigator.clipboard.writeText(
        `${idea.title}\n\n${idea.description}\n\nTech Stack: ${idea.stack.join(', ')}`
      );
    }
  };

  const handleExport = (idea: SavedIdea) => {
    const exportData = {
      title: idea.title,
      description: idea.description,
      stack: idea.stack,
      features: idea.features,
      timeEstimate: idea.timeEstimate,
      difficulty: idea.difficulty,
      category: idea.category
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Your Saved Ideas
        </h1>
        <p className="text-slate-600">
          {savedIdeas.length} project ideas saved and ready to build
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Apps</option>
              <option value="game">Game Development</option>
              <option value="api">API/Backend</option>
              <option value="tool">Developer Tools</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 border-b border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                    {idea.title}
                  </h3>
                  <button
                    onClick={() => onRemoveIdea(idea.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3 text-xs text-slate-600">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {idea.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {idea.timeEstimate}
                  </div>
                  <div className="flex items-center">
                    <Code className="w-3 h-3 mr-1" />
                    {idea.category}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <p className="text-slate-700 text-sm line-clamp-3 mb-4">
                  {idea.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {idea.stack.slice(0, 3).map((tech, index) => {
                      const userTech = userProfile?.stacks.find(stack => stack.name === tech);
                      const proficiencyColor = userTech ? 
                        (userTech.proficiency === 'expert' ? 'bg-purple-100 text-purple-800' :
                         userTech.proficiency === 'proficient' ? 'bg-green-100 text-green-800' :
                         userTech.proficiency === 'familiar' ? 'bg-blue-100 text-blue-800' :
                         'bg-yellow-100 text-yellow-800') : 'bg-slate-100 text-slate-800';
                      
                      return (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-medium ${proficiencyColor}`}
                      >
                        {tech}
                      </span>
                    )})}
                    {idea.stack.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                        +{idea.stack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {idea.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start text-xs text-slate-600">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {idea.features.length > 2 && (
                      <li className="text-xs text-slate-500">
                        +{idea.features.length - 2} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Saved {new Date(idea.savedAt).toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleShare(idea)}
                      className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
                      title="Share idea"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleExport(idea)}
                      className="p-1.5 text-slate-400 hover:text-green-500 transition-colors"
                      title="Export idea"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {searchTerm || filterDifficulty || filterCategory
              ? 'No ideas match your filters'
              : 'No saved ideas yet'
            }
          </h3>
          <p className="text-slate-600">
            {searchTerm || filterDifficulty || filterCategory
              ? 'Try adjusting your search or filters to find more ideas.'
              : 'Generate and save project ideas to see them here.'
            }
          </p>
        </div>
      )}
    </div>
  );
};