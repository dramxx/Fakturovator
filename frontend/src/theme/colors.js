// Centralized color definitions for Fakturovator
export const colors = {
  // Primary Colors
  primary: {
    blue: '#0066CC',
    red: '#FF0000',
  },

  // Secondary Colors
  secondary: {
    yellow: '#ffaa00',
    blue: '#1f46ba',
  },

  // Background Colors
  background: {
    light: '#fafafa',
    white: '#ffffff',
  },

  // Text Colors
  text: {
    primary: '#0066CC',
    dark: '#333333',
  },

  // Grid Colors
  grid: {
    line: 'rgba(0, 0, 0, 0.15)',
  },
};

// Helper function to get color values
export const getColor = (path) => {
  const keys = path.split('.');
  let value = colors;

  for (const key of keys) {
    value = value?.[key];
  }

  return value;
};
