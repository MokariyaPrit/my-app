import { useThemeToggle } from '../theme/ThemeContext';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSwitcher = () => {
  const { toggleColorMode, mode } = useThemeToggle();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
