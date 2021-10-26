import { ThemeProvider } from '@mui/material';
import { ReferralList } from './pages/ReferralList';
import { BrighteTheme } from './theme';
import { DefaultLayout } from './layouts';
import { AppContextProvider } from './contexts';
/* 
  Have used a few existing packages instead
  of implementing from scratch to save time
 */
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

export const App = () => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={BrighteTheme}>
        <SnackbarProvider maxSnack={3}>
          <ConfirmProvider>
            <DefaultLayout>
              <ReferralList />
            </DefaultLayout>
          </ConfirmProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
