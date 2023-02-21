import FlexBetween from 'components/FlexBetween';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMode, setLogout } from 'state';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Notifications,
  Message,
  Help,
  LightMode,
  DarkMode,
  Menu,
  Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [toggle, setToogle] = useState(false);
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nonMobile = useMediaQuery('(min-width: 1000px)');
  // const fullName = `${user.firstName} ${user.lastName}`;
  const fullName = 'abdul fatah';
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const bg = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primary = theme.palette.primary.main;
  const mode = theme.palette.mode;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={primary}
          onClick={() => {
            console.log(theme);
          }}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          SocioPedia
        </Typography>
        {nonMobile && (
          <FlexBetween backgroundColor={neutralLight}>
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop Nav */}
      {nonMobile ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
          <FormControl
            variant="standard"
            sx={{ fontSize: '25px' }}
            value={fullName}
          >
            <Select
              value={fullName}
              sx={{
                background: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-Root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton></IconButton>
      )}
    </FlexBetween>
  );
};

export default NavBar;
