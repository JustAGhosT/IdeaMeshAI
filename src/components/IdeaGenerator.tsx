import React, { useState } from 'react';
import { Sparkles, RefreshCw, Heart, Share2, Download, Clock, Code, Star, Filter } from 'lucide-react';
import { UserProfile, ProjectIdea, SavedIdea } from '../types';
import { generateProjectIdea } from '../utils/ideaGenerator';

interface IdeaGeneratorProps {
  userProfile: UserProfile;
  onSaveIdea: (idea: SavedIdea) => void;
  savedIdeas: SavedIdea[];
}

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({
  userProfile,
  onSaveIdea,
  savedIdeas
}) => {
  const [currentIdea, setCurrentIdea] = useState<ProjectIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: userProfile.skillLevel,
    category: '',
    timeEstimate: ''
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const idea = generateProjectIdea(userProfile, filters);
    setCurrentIdea(idea);
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (currentIdea) {
      const savedIdea: SavedIdea = {
        ...currentIdea,
        savedAt: new Date(),
        isFavorite: false
      };
      onSaveIdea(savedIdea);
    }
  };

  const handleShare = async () => {
    if (currentIdea) {
      try {
        await navigator.share({
          title: currentIdea.title,
          text: `Check out this project idea: ${currentIdea.description}`,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(
          `${currentIdea.title}\n\n${currentIdea.description}\n\nTech Stack: ${currentIdea.stack.join(', ')}`
        );
      }
    }
  };

  const handleExport = () => {
    if (currentIdea) {
      const exportData = {
        title: currentIdea.title,
        description: currentIdea.description,
        stack: currentIdea.stack,
        features: currentIdea.features,
        timeEstimate: currentIdea.timeEstimate,
        difficulty: currentIdea.difficulty,
        category: currentIdea.category
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentIdea.title.replace(/\s+/g, '-').toLowerCase()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const isIdeaSaved = currentIdea && savedIdeas.some(idea => idea.id === currentIdea.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Your AI Project Inspiration
        </h1>
        <p className="text-slate-600 mb-6">
          Personalized project ideas based on your profile. Get inspired and start building!
        </p>
        
        {/* Generate Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate New Idea
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Category</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Apps</option>
                  <option value="game">Game Development</option>
                  <option value="api">API/Backend</option>
                  <option value="tool">Developer Tools</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Time Estimate
                </label>
                <select
                  value={filters.timeEstimate}
                  onChange={(e) => setFilters({ ...filters, timeEstimate: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Duration</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2-3 weeks">2-3 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2+ months">2+ months</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Idea Card */}
      {currentIdea && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 border-b border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {currentIdea.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {currentIdea.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentIdea.timeEstimate}
                  </div>
                  <div className="flex items-center">
                    <Code className="w-4 h-4 mr-1" />
                    {currentIdea.category}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isIdeaSaved}
                  className={`p-2 rounded-lg transition-colors ${
                    isIdeaSaved
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-red-600'
                  }`}
                  title={isIdeaSaved ? 'Already saved' : 'Save idea'}
                >
                  <Heart className={`w-5 h-5 ${isIdeaSaved ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  title="Share idea"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleExport}
                  className="p-2 rounded-lg bg-white text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors"
                  title="Export idea"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Project Description
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {currentIdea.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Recommended Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentIdea.stack.map((tech, index) => {
                  const userTech = userProfile.stacks.find(stack => stack.name === tech);
                  const proficiencyColor = userTech ? 
                    (userTech.proficiency === 'expert' ? 'bg-purple-100 text-purple-800' :
                     userTech.proficiency === 'proficient' ? 'bg-green-100 text-green-800' :
                     userTech.proficiency === 'familiar' ? 'bg-blue-100 text-blue-800' :
                     'bg-yellow-100 text-yellow-800') : 'bg-slate-100 text-slate-800';
                  
                  return (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${proficiencyColor}`}
                      title={userTech ? `Your level: ${userTech.proficiency}` : 'Recommended'}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Key Features to Implement
              </h3>
              <ul className="space-y-2">
                {currentIdea.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentIdea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentIdea && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Ready to get inspired?
          </h3>
          <p className="text-slate-600 mb-6">
            Click "Generate New Idea" to receive a personalized project suggestion based on your profile.
          </p>
        </div>
      )}
    </div>
  );
};