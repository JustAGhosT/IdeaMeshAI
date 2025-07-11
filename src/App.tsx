import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileSetup } from './components/ProfileSetup';
import { IdeaGenerator } from './components/IdeaGenerator';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { UserProfile, SavedIdea } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'profile' | 'generator' | 'dashboard'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);

  useEffect(() => {
    // Load saved data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedIdeasData = localStorage.getItem('savedIdeas');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    
    if (savedIdeasData) {
      setSavedIdeas(JSON.parse(savedIdeasData));
    }
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentView('generator');
  };

  const handleSaveIdea = (idea: SavedIdea) => {
    const newSavedIdeas = [...savedIdeas, idea];
    setSavedIdeas(newSavedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(newSavedIdeas));
  };

  const handleRemoveIdea = (id: string) => {
    const newSavedIdeas = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(newSavedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(newSavedIdeas));
  };

  const handleViewChange = (view: 'landing' | 'profile' | 'generator' | 'dashboard') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange}
        hasProfile={!!userProfile}
        savedIdeasCount={savedIdeas.length}
      />
      
      <main>
        {currentView === 'landing' && (
          <Hero onGetStarted={() => setCurrentView('profile')} />
        )}
        
        {currentView === 'profile' && (
          <ProfileSetup 
            onComplete={handleProfileComplete}
            existingProfile={userProfile}
          />
        )}
        
        {currentView === 'generator' && userProfile && (
          <IdeaGenerator 
            userProfile={userProfile}
            onSaveIdea={handleSaveIdea}
            savedIdeas={savedIdeas}
          />
        )}
        
        {currentView === 'dashboard' && (
          <Dashboard 
            savedIdeas={savedIdeas}
            onRemoveIdea={handleRemoveIdea}
            userProfile={userProfile}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;