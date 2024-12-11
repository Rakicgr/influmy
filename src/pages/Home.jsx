import { Box, AppBar, Toolbar, IconButton, Typography, Avatar, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home as HomeIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '64px',
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: 'calc(100% - 64px)', ml: '64px' }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search users..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1" sx={{ mr: 2 }}>
            Balance: {user?.tokens || 0} tokens
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Sidebar>
        <IconButton color="primary" sx={{ mb: 2 }}>
          <HomeIcon />
        </IconButton>
        <IconButton color="primary" sx={{ mb: 2 }}>
          <ChatIcon />
        </IconButton>
        <IconButton color="primary" sx={{ mb: 2 }}>
          <SettingsIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="primary" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Sidebar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '64px', mt: '64px' }}>
        {/* Main content will go here */}
      </Box>
    </Box>
  );
}

export default Home;
