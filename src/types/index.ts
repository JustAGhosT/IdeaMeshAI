export interface UserProfile {
  id: string;
  developerType: 'self-taught' | 'bootcamp' | 'professional' | 'student';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  stacks: TechStack[];
  interests: string[];
  goals: string[];
  createdAt: Date;
  socialConnections?: SocialConnection[];
  externalProjects?: ExternalProject[];
}

export interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'devops' | 'ai-ml' | 'other';
  proficiency: 'learning' | 'familiar' | 'proficient' | 'expert';
  popularity?: number; // 0-100 percentage
}

export interface SocialConnection {
  provider: 'github' | 'gmail' | 'linkedin' | 'discord';
  connected: boolean;
  username?: string;
}

export interface ExternalProject {
  id: string;
  name: string;
  apiUrl: string;
  technologies: string[];
  lastFetched?: Date;
}

export interface TechPopularity {
  [techName: string]: number; // percentage 0-100
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  stack: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
  timeEstimate: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

export interface SavedIdea extends ProjectIdea {
  savedAt: Date;
  isFavorite: boolean;
  notes?: string;
}

export interface GenerationParams {
  userProfile: UserProfile;
  filters?: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
    timeEstimate?: string;
  };
}