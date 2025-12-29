
import React from 'react';

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  // Fix: Added React import to resolve the React namespace
  content: React.ReactNode;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
}
