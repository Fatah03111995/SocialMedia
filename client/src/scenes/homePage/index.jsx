import { Box, useMediaQuery } from '@mui/material';
import UserWidget from 'scenes/widgets/UserWidget';
import NavBar from 'scenes/NavBar';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="1rem 0"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="1.5rem"
        justifyContent="spaceBetween"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        ></Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
