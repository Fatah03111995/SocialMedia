import { Box } from '@mui/material';

const ProfileImage = ({ picturePath, size = '60px' }) => {
  <Box borderRadius="50%">
    <image
      width={size}
      height={size}
      src={`public/assets/${picturePath}`}
    ></image>
  </Box>;
};

export default ProfileImage;
