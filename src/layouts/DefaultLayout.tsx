import { Outlet } from 'react-router-dom';
import { MenuLateral } from '../components/MenuLateral';
import { Header } from '../components/Header';
import { Box } from '@mui/material';

export function DefaultLayout() {
  return (
    <>
      <MenuLateral>
        <Header />
        <Box py={2} px={4}>
          <Outlet />
        </Box>
      </MenuLateral>
    </>
  )
}