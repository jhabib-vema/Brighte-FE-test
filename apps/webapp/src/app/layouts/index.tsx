import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { ReactComponent as BrandLogo } from '../../assets/logo.svg';

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          p: '44px 0',
          width: '100%',
          display: 'block',
          textAlign: 'center',
        }}
      >
        <Box sx={{ color: 'primary.main' }}>
          <BrandLogo style={{ fill: 'currentcolor' }} />
        </Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
