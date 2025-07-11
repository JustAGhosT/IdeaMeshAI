import { UserProfile, ProjectIdea, GenerationParams } from '../types';

const projectTemplates = {
  web: [
    {
      title: "Interactive Dashboard Builder",
      description: "Create a drag-and-drop dashboard builder where users can create custom analytics dashboards with real-time data visualization. Include widgets for charts, tables, and KPI metrics.",
      category: "web",
      features: [
        "Drag-and-drop interface for dashboard creation",
        "Real-time data visualization with charts and graphs",
        "Customizable widgets and layouts",
        "Data source integration (APIs, databases)",
        "Export and sharing capabilities",
        "User authentication and saved dashboards"
      ],
      tags: ["dashboard", "analytics", "visualization", "real-time"]
    },
    {
      title: "Recipe Recommendation Engine",
      description: "Build a smart recipe platform that learns user preferences and dietary restrictions to recommend personalized recipes. Include meal planning and grocery list generation.",
      category: "web",
      features: [
        "User preference learning algorithm",
        "Dietary restriction filtering",
        "Meal planning calendar",
        "Automated grocery list generation",
        "Recipe rating and review system",
        "Social sharing and recipe collections"
      ],
      tags: ["food", "recommendation", "ai", "social"]
    },
    {
      title: "Collaborative Code Review Platform",
      description: "Create a platform for teams to conduct code reviews with real-time collaboration, commenting, and approval workflows. Include integration with popular version control systems.",
      category: "web",
      features: [
        "Real-time collaborative code reviewing",
        "Inline commenting and suggestions",
        "Approval workflows and permissions",
        "Git integration and branch management",
        "Code quality metrics and analytics",
        "Team management and notifications"
      ],
      tags: ["collaboration", "code-review", "git", "team"]
    }
  ],
  mobile: [
    {
      title: "Habit Tracker with AI Insights",
      description: "Develop a mobile app that tracks daily habits and uses AI to provide personalized insights and recommendations for building better routines.",
      category: "mobile",
      features: [
        "Daily habit tracking with streaks",
        "AI-powered insights and recommendations",
        "Customizable habit categories",
        "Progress visualization and analytics",
        "Reminder notifications",
        "Social challenges and accountability"
      ],
      tags: ["habits", "ai", "productivity", "analytics"]
    },
    {
      title: "Local Business Discovery App",
      description: "Create a location-based app that helps users discover local businesses, events, and services with personalized recommendations and social features.",
      category: "mobile",
      features: [
        "Location-based business discovery",
        "Personalized recommendations",
        "Event and service listings",
        "User reviews and ratings",
        "Social check-ins and sharing",
        "Business owner dashboard"
      ],
      tags: ["location", "discovery", "social", "business"]
    }
  ],
  game: [
    {
      title: "Multiplayer Strategy Game",
      description: "Build a turn-based strategy game with real-time multiplayer capabilities, featuring resource management, tactical combat, and empire building.",
      category: "game",
      features: [
        "Turn-based strategy gameplay",
        "Real-time multiplayer sessions",
        "Resource management system",
        "Tactical combat mechanics",
        "Empire building and progression",
        "Leaderboards and achievements"
      ],
      tags: ["strategy", "multiplayer", "real-time", "combat"]
    }
  ],
  api: [
    {
      title: "Content Aggregation API",
      description: "Build a RESTful API that aggregates content from multiple sources, provides intelligent filtering, and offers real-time updates with webhook support.",
      category: "api",
      features: [
        "Multi-source content aggregation",
        "Intelligent filtering and categorization",
        "Real-time updates with webhooks",
        "Rate limiting and API key management",
        "Caching and performance optimization",
        "Comprehensive documentation and SDKs"
      ],
      tags: ["api", "aggregation", "webhooks", "performance"]
    }
  ],
  tool: [
    {
      title: "Code Quality Analyzer",
      description: "Create a developer tool that analyzes code quality, suggests improvements, and tracks technical debt across different programming languages.",
      category: "tool",
      features: [
        "Multi-language code analysis",
        "Quality metrics and scoring",
        "Technical debt tracking",
        "Improvement suggestions",
        "CI/CD pipeline integration",
        "Team collaboration features"
      ],
      tags: ["code-quality", "analysis", "developer-tools", "ci-cd"]
    }
  ]
};

const difficultyModifiers = {
  beginner: {
    timeEstimate: "1-2 weeks",
    features: (features: string[]) => features.slice(0, 3),
    complexityAdjustment: "Focus on core functionality with simple UI"
  },
  intermediate: {
    timeEstimate: "2-4 weeks",
    features: (features: string[]) => features.slice(0, 5),
    complexityAdjustment: "Include user authentication and data persistence"
  },
  advanced: {
    timeEstimate: "1-3 months",
    features: (features: string[]) => features,
    complexityAdjustment: "Implement advanced features like real-time updates and AI integration"
  }
};

const stackMappings: { [key: string]: string[] } = {
  "JavaScript": ["JavaScript", "HTML/CSS"],
  "TypeScript": ["TypeScript", "JavaScript", "HTML/CSS"],
  "React": ["React", "JavaScript", "HTML/CSS"],
  "Vue.js": ["Vue.js", "JavaScript", "HTML/CSS"],
  "Angular": ["Angular", "TypeScript", "HTML/CSS"],
  "Node.js": ["Node.js", "JavaScript"],
  "Python": ["Python", "Flask"],
  "Django": ["Django", "Python", "PostgreSQL"],
  "Java": ["Java", "Spring Boot"],
  "C#": ["C#", ".NET"],
  "PHP": ["PHP", "Laravel", "MySQL"],
  "React Native": ["React Native", "JavaScript"],
  "Flutter": ["Flutter", "Firebase"],
  "MongoDB": ["MongoDB", "Node.js"],
  "PostgreSQL": ["PostgreSQL", "Node.js"],
  "GraphQL": ["GraphQL", "Node.js"],
  "Tailwind CSS": ["Tailwind CSS", "HTML/CSS"]
};

export const generateProjectIdea = (
  userProfile: UserProfile,
  filters: GenerationParams['filters'] = {}
): ProjectIdea => {
  // Determine category based on user interests and filters
  const categories = Object.keys(projectTemplates);
  const preferredCategory = filters.category || 
    (userProfile.interests.includes('Web Development') ? 'web' :
     userProfile.interests.includes('Mobile Apps') ? 'mobile' :
     userProfile.interests.includes('Game Development') ? 'game' :
     categories[Math.floor(Math.random() * categories.length)]);

  const availableTemplates = projectTemplates[preferredCategory as keyof typeof projectTemplates] || projectTemplates.web;
  const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];

  // Get difficulty level
  const difficulty = filters.difficulty || userProfile.skillLevel;
  const difficultyMod = difficultyModifiers[difficulty];

  // Build tech stack based on user's preferred technologies
  const userStacks = userProfile.stacks.map(stack => stack.name);
  let recommendedStack: string[] = [];
  
  // Start with user's preferred technologies
  const primaryStack = userStacks[Math.floor(Math.random() * userStacks.length)];
  recommendedStack.push(primaryStack);
  
  // Add complementary technologies
  if (stackMappings[primaryStack]) {
    stackMappings[primaryStack].forEach(tech => {
      if (!recommendedStack.includes(tech)) {
        recommendedStack.push(tech);
      }
    });
  }
  
  // Add some additional relevant technologies
  const additionalTech = userStacks.filter(stack => !recommendedStack.includes(stack));
  if (additionalTech.length > 0) {
    recommendedStack.push(...additionalTech.slice(0, 2));
  }

  // Customize features based on difficulty
  const features = difficultyMod.features(template.features);
  
  // Add difficulty-specific feature
  if (difficulty === 'advanced') {
    features.push("Advanced analytics and reporting");
  } else if (difficulty === 'intermediate') {
    features.push("User authentication and profiles");
  }

  // Generate variations of the title and description
  const titleVariations = [
    template.title,
    template.title.replace(/Builder|Platform|Engine|Tracker|App/, () => {
      const alternatives = ['Hub', 'Studio', 'Manager', 'System', 'Tool'];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    })
  ];

  const selectedTitle = titleVariations[Math.floor(Math.random() * titleVariations.length)];
  
  return {
    id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: selectedTitle,
    description: `${template.description} ${difficultyMod.complexityAdjustment}`,
    stack: recommendedStack.slice(0, 6), // Limit to 6 technologies
    difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
    features,
    timeEstimate: filters.timeEstimate || difficultyMod.timeEstimate,
    category: template.category,
    tags: [
      ...template.tags,
      ...userProfile.interests.map(interest => interest.toLowerCase().replace(/\s+/g, '-')),
      difficulty
    ].slice(0, 8), // Limit to 8 tags
    createdAt: new Date()
  };
};