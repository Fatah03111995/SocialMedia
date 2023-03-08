import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Form from './Form.jsx';

const LoginPage = () => {
  const theme = useTheme();
  const nonMobileScreen = useMediaQuery('(min-width: 600px)');
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        alignItems="center"
        p="1rem 6%"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          textAlign="center"
        >
          SocioPedia
        </Typography>
      </Box>
      <Box
        width={nonMobileScreen ? '50%' : '93%'}
        p="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="bold" fontSize="0.9rem" mb="1.5rem">
          Welcome to Sociopedia, Social Media for Sociopath
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
