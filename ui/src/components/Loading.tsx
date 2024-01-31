import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
