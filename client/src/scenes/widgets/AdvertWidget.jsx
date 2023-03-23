import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography>Create Ad +</Typography>
      </FlexBetween>
      <img
        width="100%"
        alt="advert"
        src="http://localhost:5000/assets/info4.jpeg"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Mika Cosmetics</Typography>
        <Typography color={medium} variant="h6">
          mikacosmetics.com
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0" textAlign="justify">
        Your pathway to stunning and innaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
