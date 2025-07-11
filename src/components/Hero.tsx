import React from 'react';
import { Sparkles, Zap, Target, Code, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Project Inspiration
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Never Run Out of
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Project Ideas
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Eliminate "blank page" anxiety with AI-generated, personalized project ideas 
            tailored to your skills, interests, and career goals.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          {/* Social Proof */}
          <div className="mt-12 text-sm text-slate-500">
            Join 10,000+ developers who've launched amazing projects
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Zap,
              title: "Instant Generation",
              description: "Get tailored project ideas in under 300ms. No more staring at blank screens."
            },
            {
              icon: Target,
              title: "Personalized Ideas",
              description: "Ideas matched to your stack, skill level, and career goals. Every suggestion is relevant."
            },
            {
              icon: Code,
              title: "Ready to Build",
              description: "Complete project briefs with features, tech stack, and time estimates included."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};