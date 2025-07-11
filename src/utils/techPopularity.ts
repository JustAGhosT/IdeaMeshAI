// Tech popularity data based on usage in starter projects
export const techPopularityData: { [key: string]: number } = {
  // Frontend - High popularity
  'JavaScript': 95,
  'TypeScript': 78,
  'React': 85,
  'HTML/CSS': 92,
  'Tailwind CSS': 68,
  'Vue.js': 45,
  'Angular': 35,
  'Svelte': 25,
  'Bootstrap': 42,
  'Sass/SCSS': 38,

  // Backend - Varied popularity
  'Node.js': 82,
  'Python': 75,
  'Express.js': 65,
  'Django': 35,
  'Flask': 28,
  'Java': 45,
  'Spring Boot': 32,
  'C#': 38,
  '.NET': 35,
  'PHP': 48,
  'Laravel': 25,
  'Ruby': 18,
  'Rails': 15,
  'Go': 22,
  'Rust': 12,

  // Database - Essential tools
  'MongoDB': 58,
  'PostgreSQL': 52,
  'MySQL': 48,
  'Redis': 35,
  'SQLite': 42,
  'Firebase': 55,
  'Supabase': 38,
  'DynamoDB': 18,

  // Mobile - Growing segment
  'React Native': 45,
  'Flutter': 38,
  'Swift': 25,
  'Kotlin': 22,
  'Expo': 35,
  'Ionic': 15,
  'Xamarin': 8,

  // DevOps & Cloud - Professional tools
  'Docker': 55,
  'Kubernetes': 25,
  'AWS': 48,
  'Azure': 28,
  'Google Cloud': 32,
  'Vercel': 62,
  'Netlify': 58,
  'GitHub Actions': 45,
  'Jenkins': 22,

  // AI & ML - Emerging field
  'TensorFlow': 28,
  'PyTorch': 25,
  'Scikit-learn': 32,
  'OpenAI API': 42,
  'Hugging Face': 18,
  'Pandas': 38,
  'NumPy': 35,

  // Other - Specialized tools
  'GraphQL': 35,
  'REST APIs': 88,
  'WebSockets': 25,
  'Electron': 18,
  'Unity': 15,
  'Blockchain': 12,
  'Web3': 8
};

export const fetchExternalProjectData = async (apiUrl: string): Promise<string[]> => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Try to extract technologies from common API response formats
    let technologies: string[] = [];
    
    // GitHub API format
    if (data.language) {
      technologies.push(data.language);
    }
    if (data.languages_url) {
      // This would require another API call in a real implementation
      // For now, we'll extract from the main response
    }
    
    // Package.json format
    if (data.dependencies) {
      const deps = Object.keys(data.dependencies);
      technologies = technologies.concat(extractTechFromDependencies(deps));
    }
    if (data.devDependencies) {
      const devDeps = Object.keys(data.devDependencies);
      technologies = technologies.concat(extractTechFromDependencies(devDeps));
    }
    
    // Custom format - array of technologies
    if (Array.isArray(data.technologies)) {
      technologies = technologies.concat(data.technologies);
    }
    
    // Custom format - tech stack array
    if (Array.isArray(data.techStack)) {
      technologies = technologies.concat(data.techStack);
    }
    
    return [...new Set(technologies)]; // Remove duplicates
  } catch (error) {
    console.error('Failed to fetch external project data:', error);
    return [];
  }
};

const extractTechFromDependencies = (dependencies: string[]): string[] => {
  const techMapping: { [key: string]: string } = {
    'react': 'React',
    'vue': 'Vue.js',
    'angular': 'Angular',
    'svelte': 'Svelte',
    'express': 'Express.js',
    'django': 'Django',
    'flask': 'Flask',
    'mongodb': 'MongoDB',
    'mongoose': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'pg': 'PostgreSQL',
    'mysql': 'MySQL',
    'redis': 'Redis',
    'firebase': 'Firebase',
    'supabase': 'Supabase',
    'tailwindcss': 'Tailwind CSS',
    'bootstrap': 'Bootstrap',
    'sass': 'Sass/SCSS',
    'typescript': 'TypeScript',
    'graphql': 'GraphQL',
    'apollo': 'GraphQL',
    'docker': 'Docker',
    'aws-sdk': 'AWS',
    'azure': 'Azure',
    'gcp': 'Google Cloud',
    'tensorflow': 'TensorFlow',
    'pytorch': 'PyTorch',
    'pandas': 'Pandas',
    'numpy': 'NumPy',
    'electron': 'Electron',
    'react-native': 'React Native',
    'flutter': 'Flutter',
    'expo': 'Expo'
  };

  return dependencies
    .map(dep => {
      const cleanDep = dep.toLowerCase().replace(/[@^~]/g, '');
      return techMapping[cleanDep];
    })
    .filter(Boolean);
};

export const updateTechPopularityFromProjects = (
  externalProjects: string[][],
  baseTechData: { [key: string]: number } = techPopularityData
): { [key: string]: number } => {
  const updatedPopularity = { ...baseTechData };
  
  if (externalProjects.length === 0) {
    return updatedPopularity;
  }
  
  // Count technology occurrences in external projects
  const techCounts: { [key: string]: number } = {};
  const totalProjects = externalProjects.length;
  
  externalProjects.forEach(projectTechs => {
    projectTechs.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });
  
  // Update popularity based on external project usage
  Object.keys(techCounts).forEach(tech => {
    const projectUsagePercentage = (techCounts[tech] / totalProjects) * 100;
    // Blend external data with base data (70% external, 30% base)
    if (updatedPopularity[tech] !== undefined) {
      updatedPopularity[tech] = Math.round(
        (projectUsagePercentage * 0.7) + (updatedPopularity[tech] * 0.3)
      );
    } else {
      updatedPopularity[tech] = Math.round(projectUsagePercentage);
    }
  });
  
  return updatedPopularity;
};