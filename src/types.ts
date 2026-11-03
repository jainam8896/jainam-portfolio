import type { LucideIcon } from 'lucide-react';

export interface SiteMeta {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  pitch: string;
  location: string;
  availability: string;
  openToWork: boolean;
  url: string;
  resumePath: string;
  ogImage: string;
}

export interface Contact {
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
}

export interface ApiResponse {
  role: string;
  experience: string;
  stack: string[];
  location: string;
  open_to_work: boolean;
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  bullets: string[];
  tech: string[];
  current?: boolean;
}

export interface FlowNode {
  label: string;
  kind?: 'source' | 'process' | 'store' | 'output';
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  endpoint: string;
  problem: string;
  built: string;
  impact: { value: string; label: string }[];
  tech: string[];
  flow: FlowNode[];
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  items: string[];
}

export interface Degree {
  degree: string;
  short: string;
  institution: string;
  start: string;
  end: string;
}

export interface NavLink {
  id: string;
  label: string;
}
