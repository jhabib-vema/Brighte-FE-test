import { createTheme } from '@mui/material/styles';

/*
	Sample values have been added to theme object.
	In an ordinary project, I'd ensure all of these values are accurate 
	and consistent with the brand's design tokens (spacing/colours/breakpoints etc.)
*/
export const BrighteTheme = createTheme({
  palette: {
    primary: {
      main: '#00d280',
    },
    secondary: {
      main: '#00d280',
      light: '#fff',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#042f45',
      secondary: '#042f45',
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  spacing: [0, 4, 8, 16, 32, 64],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // Provide component overrides here
  components: {},
});
