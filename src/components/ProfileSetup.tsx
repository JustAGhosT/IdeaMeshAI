import React, { useState, useEffect } from 'react';
import { User, Code, Target, Sparkles, ArrowRight, Check, Github, Mail, Linkedin, MessageCircle, Link, Plus, X } from 'lucide-react';
import { UserProfile, TechStack, ExternalProject } from '../types';
import { techPopularityData, fetchExternalProjectData, updateTechPopularityFromProjects } from '../utils/techPopularity';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  existingProfile?: UserProfile | null;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete, existingProfile }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    developerType: existingProfile?.developerType || '',
    skillLevel: existingProfile?.skillLevel || '',
    stacks: existingProfile?.stacks || [],
    interests: existingProfile?.interests || [],
    goals: existingProfile?.goals || [],
    socialConnections: existingProfile?.socialConnections || [],
    externalProjects: existingProfile?.externalProjects || []
  });
  const [techPopularity, setTechPopularity] = useState(techPopularityData);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [newApiUrl, setNewApiUrl] = useState('');

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Update tech popularity when external projects change
  useEffect(() => {
    if (formData.externalProjects.length > 0) {
      const projectTechs = formData.externalProjects.map(project => project.technologies);
      const updatedPopularity = updateTechPopularityFromProjects(projectTechs, techPopularityData);
      setTechPopularity(updatedPopularity);
    }
  }, [formData.externalProjects]);

  const developerTypes = [
    { id: 'self-taught', label: 'Self-Taught Developer', desc: 'Learning on your own, building skills independently' },
    { id: 'bootcamp', label: 'Bootcamp Student', desc: 'Enrolled in a coding bootcamp or course' },
    { id: 'professional', label: 'Professional Developer', desc: 'Working in the tech industry' },
    { id: 'student', label: 'Computer Science Student', desc: 'Studying CS or related field' }
  ];

  const skillLevels = [
    { id: 'beginner', label: 'Beginner', desc: 'Just starting out, learning fundamentals' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Comfortable with basics, building projects' },
    { id: 'advanced', label: 'Advanced', desc: 'Experienced, tackling complex challenges' }
  ];

  const techCategories = {
    frontend: {
      label: 'Frontend',
      icon: '🎨',
      techs: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Svelte', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'Sass/SCSS']
    },
    backend: {
      label: 'Backend',
      icon: '⚙️',
      techs: ['Node.js', 'Python', 'Express.js', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Rails', 'Go', 'Rust']
    },
    database: {
      label: 'Database',
      icon: '🗄️',
      techs: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase', 'Supabase', 'DynamoDB']
    },
    mobile: {
      label: 'Mobile',
      icon: '📱',
      techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Ionic', 'Xamarin']
    },
    devops: {
      label: 'DevOps & Cloud',
      icon: '☁️',
      techs: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Vercel', 'Netlify', 'GitHub Actions', 'Jenkins']
    },
    'ai-ml': {
      label: 'AI & ML',
      icon: '🤖',
      techs: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'Hugging Face', 'Pandas', 'NumPy']
    },
    other: {
      label: 'Other',
      icon: '🔧',
      techs: ['GraphQL', 'REST APIs', 'WebSockets', 'Electron', 'Unity', 'Blockchain', 'Web3']
    }
  };

  const proficiencyLevels = [
    { id: 'learning', label: 'Learning', color: 'bg-yellow-100 text-yellow-800', desc: 'Just started' },
    { id: 'familiar', label: 'Familiar', color: 'bg-blue-100 text-blue-800', desc: 'Basic understanding' },
    { id: 'proficient', label: 'Proficient', color: 'bg-green-100 text-green-800', desc: 'Can build projects' },
    { id: 'expert', label: 'Expert', color: 'bg-purple-100 text-purple-800', desc: 'Advanced knowledge' }
  ];

  const socialProviders = [
    { id: 'github', label: 'GitHub', icon: Github, color: 'bg-gray-900 hover:bg-gray-800' },
    { id: 'gmail', label: 'Gmail', icon: Mail, color: 'bg-red-600 hover:bg-red-700' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'discord', label: 'Discord', icon: MessageCircle, color: 'bg-indigo-600 hover:bg-indigo-700' }
  ];

  const interestOptions = [
    'Web Development', 'Mobile Apps', 'Game Development', 'AI/ML',
    'Data Science', 'DevOps', 'Cybersecurity', 'Blockchain',
    'IoT', 'AR/VR', 'Desktop Apps', 'E-commerce',
    'Social Media', 'Productivity Tools', 'Education',
    'Healthcare', 'Finance', 'Environment'
  ];

  const goalOptions = [
    'Build Portfolio', 'Learn New Skills', 'Get First Job',
    'Change Career', 'Freelance Projects', 'Startup Ideas',
    'Open Source', 'Hackathons', 'Side Income',
    'Personal Projects', 'Team Collaboration', 'Leadership'
  ];

  const handleAddExternalProject = async () => {
    if (!newApiUrl.trim()) return;
    
    setIsLoadingProjects(true);
    try {
      const technologies = await fetchExternalProjectData(newApiUrl);
      const newProject: ExternalProject = {
        id: Date.now().toString(),
        name: `Project ${formData.externalProjects.length + 1}`,
        apiUrl: newApiUrl,
        technologies,
        lastFetched: new Date()
      };
      
      setFormData({
        ...formData,
        externalProjects: [...formData.externalProjects, newProject]
      });
      setNewApiUrl('');
    } catch (error) {
      console.error('Failed to add external project:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleRemoveExternalProject = (projectId: string) => {
    setFormData({
      ...formData,
      externalProjects: formData.externalProjects.filter(project => project.id !== projectId)
    });
  };

  const handleTechToggle = (techName: string, category: keyof typeof techCategories) => {
    const existingTech = formData.stacks.find(stack => stack.name === techName);
    
    if (existingTech) {
      // Remove the tech
      setFormData({
        ...formData,
        stacks: formData.stacks.filter(stack => stack.name !== techName)
      });
    } else {
      // Add the tech with default proficiency and popularity
      const newTech: TechStack = {
        name: techName,
        category,
        proficiency: 'familiar',
        popularity: techPopularity[techName] || 0
      };
      setFormData({
        ...formData,
        stacks: [...formData.stacks, newTech]
      });
    }
  };

  const handleProficiencyChange = (techName: string, proficiency: TechStack['proficiency']) => {
    setFormData({
      ...formData,
      stacks: formData.stacks.map(stack =>
        stack.name === techName ? { ...stack, proficiency } : stack
      )
    });
  };

  const handleArrayToggle = (array: string[], value: string, setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleSocialConnect = (provider: string) => {
    // Simulate social connection - in real app, this would trigger OAuth flow
    const isConnected = formData.socialConnections.some(conn => conn.provider === provider);
    
    if (isConnected) {
      setFormData({
        ...formData,
        socialConnections: formData.socialConnections.filter(conn => conn.provider !== provider)
      });
    } else {
      setFormData({
        ...formData,
        socialConnections: [
          ...formData.socialConnections,
          { provider: provider as any, connected: true, username: `user_${provider}` }
        ]
      });
    }
  };

  const handleSubmit = () => {
    if (formData.developerType && formData.skillLevel && formData.stacks.length > 0) {
      const profile: UserProfile = {
        id: existingProfile?.id || Date.now().toString(),
        developerType: formData.developerType as any,
        skillLevel: formData.skillLevel as any,
        stacks: formData.stacks,
        interests: formData.interests,
        goals: formData.goals,
        socialConnections: formData.socialConnections,
        externalProjects: formData.externalProjects,
        createdAt: existingProfile?.createdAt || new Date()
      };
      onComplete(profile);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.developerType !== '';
      case 2: return formData.skillLevel !== '';
      case 3: return true; // External projects are optional
      case 4: return formData.stacks.length > 0;
      case 5: return formData.interests.length > 0;
      case 6: return formData.goals.length > 0;
      case 7: return true; // Social connections are optional
      default: return false;
    }
  };

  const getTechProficiency = (techName: string) => {
    const tech = formData.stacks.find(stack => stack.name === techName);
    return tech?.proficiency || 'familiar';
  };

  const isTechSelected = (techName: string) => {
    return formData.stacks.some(stack => stack.name === techName);
  };

  const getTechPopularity = (techName: string) => {
    return techPopularity[techName] || 0;
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-slate-600">
            Step {step} of 7
          </span>
          <span className="text-sm text-slate-500">
            {Math.round((step / 7) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Developer Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What describes you best?
            </h2>
            <p className="text-slate-600">
              Help us understand your background so we can tailor ideas perfectly for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFormData({ ...formData, developerType: type.id })}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg
                  ${formData.developerType === type.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 hover:border-blue-300'
                  }`}
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {type.label}
                </h3>
                <p className="text-sm text-slate-600">
                  {type.desc}
                </p>
                {formData.developerType === type.id && (
                  <Check className="w-5 h-5 text-blue-600 mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Skill Level */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What's your skill level?
            </h2>
            <p className="text-slate-600">
              We'll match project complexity to your current abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setFormData({ ...formData, skillLevel: level.id })}
                className={`p-6 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg
                  ${formData.skillLevel === level.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 hover:border-blue-300'
                  }`}
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {level.label}
                </h3>
                <p className="text-sm text-slate-600">
                  {level.desc}
                </p>
                {formData.skillLevel === level.id && (
                  <Check className="w-5 h-5 text-blue-600 mt-2 mx-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: External Projects */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Import from your projects (Optional)
            </h2>
            <p className="text-slate-600">
              Add API URLs from your existing projects to get more personalized tech recommendations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex gap-3 mb-4">
              <input
                type="url"
                placeholder="Enter API URL (e.g., GitHub API, package.json URL)"
                value={newApiUrl}
                onChange={(e) => setNewApiUrl(e.target.value)}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleAddExternalProject}
                disabled={!newApiUrl.trim() || isLoadingProjects}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isLoadingProjects ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>

            {formData.externalProjects.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-slate-900">Connected Projects:</h3>
                {formData.externalProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">{project.name}</h4>
                      <p className="text-sm text-slate-600">
                        {project.technologies.length} technologies detected
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.slice(0, 5).map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-1 bg-slate-200 text-slate-600 text-xs rounded">
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveExternalProject(project.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Supported formats:</strong> GitHub API, package.json URLs, or custom APIs returning technology arrays.
                This data will be used to adjust technology popularity indicators.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Tech Stack with Popularity Indicators */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What technologies do you use?
            </h2>
            <p className="text-slate-600">
              Select technologies and set your proficiency level. Popularity bars show usage in starter projects.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(techCategories).map(([categoryKey, category]) => (
              <div key={categoryKey} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-lg font-semibold text-slate-900">{category.label}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.techs.map((tech) => {
                    const popularity = getTechPopularity(tech);
                    const isSelected = isTechSelected(tech);
                    
                    return (
                      <div key={tech} className="space-y-2">
                        <button
                          onClick={() => handleTechToggle(tech, categoryKey as keyof typeof techCategories)}
                          className={`w-full p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 hover:shadow-md relative overflow-hidden
                            ${isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-slate-200 text-slate-700 hover:border-blue-300'
                            }`}
                        >
                          {/* Popularity indicator background */}
                          <div 
                            className="absolute inset-0 bg-gradient-to-r from-green-100 to-transparent opacity-30 transition-all duration-300"
                            style={{ width: `${popularity}%` }}
                          />
                          
                          <div className="relative flex items-center justify-between">
                            <span>{tech}</span>
                            <span className="text-xs text-slate-500">
                              {popularity}%
                            </span>
                          </div>
                        </button>
                        
                        {isSelected && (
                          <div className="flex gap-1">
                            {proficiencyLevels.map((level) => (
                              <button
                                key={level.id}
                                onClick={() => handleProficiencyChange(tech, level.id as TechStack['proficiency'])}
                                className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-all
                                  ${getTechProficiency(tech) === level.id
                                    ? level.color
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                title={level.desc}
                              >
                                {level.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center text-sm text-slate-500">
            Selected: {formData.stacks.length} technologies
          </div>
        </div>
      )}

      {/* Step 5: Interests */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What interests you?
            </h2>
            <p className="text-slate-600">
              Choose areas that excite you. We'll suggest projects in these domains.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => handleArrayToggle(formData.interests, interest, (interests) => setFormData({ ...formData, interests }))}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 hover:shadow-md
                  ${formData.interests.includes(interest)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
              >
                {interest}
              </button>
            ))}
          </div>
          
          <div className="text-center text-sm text-slate-500">
            Selected: {formData.interests.length} interests
          </div>
        </div>
      )}

      {/* Step 6: Goals */}
      {step === 6 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What are your goals?
            </h2>
            <p className="text-slate-600">
              Tell us what you want to achieve, and we'll suggest projects that help you get there.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                onClick={() => handleArrayToggle(formData.goals, goal, (goals) => setFormData({ ...formData, goals }))}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 hover:shadow-md
                  ${formData.goals.includes(goal)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
              >
                {goal}
              </button>
            ))}
          </div>
          
          <div className="text-center text-sm text-slate-500">
            Selected: {formData.goals.length} goals
          </div>
        </div>
      )}

      {/* Step 7: Social Connections */}
      {step === 7 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Connect your accounts (Optional)
            </h2>
            <p className="text-slate-600">
              Connect your social accounts to get more personalized project suggestions and share your ideas easily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialProviders.map((provider) => {
              const isConnected = formData.socialConnections.some(conn => conn.provider === provider.id);
              const Icon = provider.icon;
              
              return (
                <button
                  key={provider.id}
                  onClick={() => handleSocialConnect(provider.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg
                    ${isConnected
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 ${provider.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-900">
                        {provider.label}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {isConnected ? 'Connected' : 'Connect account'}
                      </p>
                    </div>
                  </div>
                  
                  {isConnected && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-slate-500">
            Connected: {formData.socialConnections.length} accounts
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12">
        <button
          onClick={handlePrevious}
          disabled={step === 1}
          className="px-6 py-3 text-slate-600 hover:text-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div
              key={num}
              className={`w-2 h-2 rounded-full transition-all duration-200
                ${num <= step ? 'bg-blue-500' : 'bg-slate-300'}
              `}
            />
          ))}
        </div>

        {step < 7 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all"
          >
            Complete Setup
            <Sparkles className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};