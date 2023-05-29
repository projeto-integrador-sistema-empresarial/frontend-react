import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Typography,
  Stack,
  useMediaQuery
} from '@mui/material';
import {
  Home,
  School,
  Work,
  LocalOffer,
  Assessment
} from '@mui/icons-material';
import { useDrawerContext } from '../contexts';

function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}`,
  };
}

interface MenuLateralProps {
  children: React.ReactNode;
}

export function MenuLateral({ children }: MenuLateralProps) {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box width="100%" height={theme.spacing(8)} display="flex" alignItems="center" mx={2}>
            <Avatar
              sx={{
                bgcolor: '#673ab7',
                height: theme.spacing(4),
                width: theme.spacing(4)
              }}
              {...stringAvatar('Gabriel')}
            />

            <Stack spacing={-0.4} ml={2} display="flex" flexDirection="column" justifyContent="center">
              <Typography variant='body1' >
                Bem vindo, Gabriel!
              </Typography>

              <Typography variant='caption' color='text.secondary'>
                Estudante
              </Typography>
            </Stack>

          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              <ListItemButton component="a" href="/home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
              </ListItemButton>

              <ListItemButton component="a" href="/treinamentos">
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Treinamentos" />
              </ListItemButton>

              <ListItemButton component="a" href="/cursos">
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Cursos" />
              </ListItemButton>

              <ListItemButton component="a" href="/vagas">
                <ListItemIcon>
                  <LocalOffer />
                </ListItemIcon>
                <ListItemText primary="Vagas" />
              </ListItemButton>

              <ListItemButton component="a" href="/testes">
                <ListItemIcon>
                  <Assessment />
                </ListItemIcon>
                <ListItemText primary="Meus Testes" />
              </ListItemButton>
            </List>
          </Box>

        </Box >
      </Drawer >
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}
