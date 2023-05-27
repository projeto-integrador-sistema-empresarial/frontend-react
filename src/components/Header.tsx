import {
  Container,
  Toolbar,
  AppBar,
  Typography,
  useTheme,
  IconButton
} from '@mui/material';
import LogoIntegrador from '/Logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../contexts';

export function Header() {
  const theme = useTheme()

  const { toggleDrawerOpen } = useDrawerContext()

  return (
    <AppBar position="static" color='inherit' sx={{ boxShadow: 0, borderBottom: 1, borderBottomColor: theme.palette.divider }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'none' },
            }}
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <img src={LogoIntegrador} width={55} alt="" />
          <Typography
            variant="h5"
            noWrap
            sx={{
              ml: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Projeto Integrador
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              ml: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Projeto Integrador
          </Typography>
        </Toolbar>
      </Container>
    </AppBar >
  );
}