export const theme = {
  colors: {
    primary: '#ED145B',
    primaryHover: '#C40E48',
    primaryDark: '#880831',

    secondary: '#121214',
    secondaryHover: '#1C1C21',

    background: '#09090B',
    surface: '#18181B',
    surfaceAlt: '#27272A',

    textPrimary: '#FFFFFF',
    textMuted: '#A1A1AA',

    border: '#27272A',
    borderLight: '#3F3F46',

    danger: '#EF4444',
    dangerHover: '#DC2626',
    success: '#10B981',
    warning: '#F59E0B',
  },

  radii: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%'
  },
};

export type AppTheme = typeof theme;