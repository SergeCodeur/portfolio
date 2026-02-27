export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  link: string;
  color: string;
  textColor: string;
  order: number;
  visible: boolean;
}

export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
  icon: string;
  color: string;
  examples: string[];
  order: number;
  visible: boolean;
}

export interface TestimonialData {
  id: string;
  quote: string;
  name: string;
  role: string;
  order: number;
  visible: boolean;
}

export interface ProcessStepData {
  id: string;
  number: number;
  icon: string;
  title: string;
  duration: string;
  detail: string | null;
  description: string;
  order: number;
  visible: boolean;
}

export interface ExpertiseCategoryData {
  id: string;
  category: string;
  description: string;
  items: string[];
  order: number;
  visible: boolean;
}
