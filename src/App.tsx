import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { Theme as theme } from './assets/theme/theme';
import { Router } from './router/Router';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};
