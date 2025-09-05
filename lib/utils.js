// Utility function for merging CSS classes
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Helper function to create variants using class-variance-authority
export { cva } from 'class-variance-authority';
