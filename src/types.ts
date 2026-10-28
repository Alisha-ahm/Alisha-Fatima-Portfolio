export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: 'all' | 'ai' | 'realtime' | 'frontend' | 'systems' | 'smart-systems' | 'web-apps';
  highlights: string[];
  metrics?: string;
  demoType: 
    | 'cms' 
    | 'ride' 
    | 'fanta' 
    | 'compiler' 
    | 'gym' 
    | 'significo' 
    | 'general' 
    | 'parksense' 
    | 'smartdesk'
    | 'ams'
    | 'flight'
    | 'media'
    | 'quiz'
    | 'cart'
    | 'blog'
    | 'search';
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  videoPlatform?: 'direct' | 'jumpshare';
  featured: boolean;
  accentColor: string;
  problemSolved?: string;
  userRoles?: { role: string; description: string }[];
  coreModules?: string[];
  algorithms?: { name: string; complexity: string; description: string }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  skills: string[];
  iconName: string;
  deliverables: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  certificateAvailable: boolean;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; highlight?: boolean }[];
  icon: string;
}
